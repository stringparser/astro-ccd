import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import fetch from 'node-fetch';
import matter from 'gray-matter';

type SourceMDXFile = {
  path: string;
  content: string;
};

type ImageRequest = {
  src: string;
  files: SourceMDXFile[];
};

const mapImageDestination = (el: ImageRequest) =>
  path.join('public', 'imagenes', path.basename(el.src))
;

new Promise<string[]>((resolve, reject) => {
  glob('src/**/*.mdx', (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  })
}).then(results => {

  return Promise.all(
    results.map(el =>
      Promise.all([el, fs.readFile(el, 'utf8')])
    )
  );
})
.then((results) => {
  return results.map(([file, content]) => {
    try {
      const result = matter(content);

      return {
        file,
        content,
        ...result.data,
        images: Object.entries(result.data)
          .reduce((acc, [key, value]: [string, { src: string; }]) => {
            if (!/^imagen_/.test(key) || !/http/.test(value.src)) {
              return acc;
            }

            return acc.concat({
              src: value.src.replace(/\?[^\s]+$/, ''),
              files: [{ path: file, content }]
            });
          }, [] as ImageRequest[])
      };
    } catch (error) {
      console.warn('error in', file);
      console.log(error);
    }
  });
})
.then(async (results) => {

  fs.writeFileSync('results.json', JSON.stringify(results, null, 2));

  const progress = {
    count: 0,
    total: 0,
    started: false,
  };

  await Promise.all(results
    .flatMap(el => el.images)
    .reduce((acc, el) => {
      const found = acc.find(it => it.src === el.src);

      return acc.concat(found
        ? {
          ...found,
          files: found.files.concat(...el.files)
        }
        : el
      );
    }, [] as ImageRequest[])
    .map(async (el, index, items) => {
      progress.count += 1;

      if (!progress.started) {
        console.time('download starting');
        progress.total = items.length;
        progress.started = true;
      }

      const fileDest = mapImageDestination(el);
      const isDownloaded = await fs.pathExists(fileDest);

      if (isDownloaded) {
        console.log('file donwloaded already', fileDest);
        return el;
      }

      const res = await fetch(el.src);

      const fileStream = fs.createWriteStream(fileDest, { flags: 'w' });

      return new Promise<ImageRequest>((resolve, reject) => {
        console.log('writting', fileDest);

        res.body.on('error', error => {
          console.log('request threw error for', el);
          console.log('error', error);
          reject(error);
        });

        fileStream.on('error', error => {
          console.log('file write error for', el);
          console.log('error', error);
          reject(error);
        });

        fileStream.on('finish', () => {
          resolve(el);
          console.log('done with', fileDest);
        });

        res.body.pipe(fileStream);
      })
    })
  );

  return results;
}).then(results => {

  console.log('updating file contents with new images');

  return Promise.all(results
    .map(el => {
      const updatedContent = el.images
        .map(el => {
          return {
            src: el.src,
            srcUpdate: path.basename(el.src),
          }
        })
        .reduce((acc, el) =>
          acc.replace(el.src, el.srcUpdate),
          el.content
        )
      ;

      return fs.writeFile(
        el.file,
        updatedContent,
        {
          flag: 'w'
        }
      );
    })
  );
})