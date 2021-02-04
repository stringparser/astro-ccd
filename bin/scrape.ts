import path from 'path';

import { parseMDX } from './parseMDX';

(async () => {
  const filename = path.join(__dirname, '..', 'src', 'pages', 'registro', 'c2017-k2.mdx');

  await parseMDX(filename)
    .then(result => console.log('result', result))
  ;
})();