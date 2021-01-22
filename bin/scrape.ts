import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';

(async () => {
  await fs.readFile(path.join('src', 'pages', 'index.mdx'), 'utf8')
    .then(content => matter(content))
    .then(result => console.log(result))
  ;
})();