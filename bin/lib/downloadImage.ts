import fs from 'fs-extra';
import path from 'path';
import fetch from 'node-fetch';
import { PageItemProps } from 'types';

type DownloadImageResult = PageItemProps & { dest: string; };

const downloadImage = async (el: PageItemProps, dest: string): Promise<DownloadImageResult> => {
  const isDownloaded = await fs.pathExists(dest);

  if (isDownloaded) {
    return { ...el, dest };
  }

  // escribir
  await fs.mkdirp(path.dirname(dest));

  const res = await fetch(el.src);
  const fileStream = fs.createWriteStream(dest, { flags: 'w' });

  return new Promise<PageItemProps & { dest: string; }>((resolve, reject) => {
    console.log('writting', dest);

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
      resolve({ ...el, dest });
      console.log('done with', el.src);
    });

    res.body.pipe(fileStream);
  })
}

export default downloadImage;