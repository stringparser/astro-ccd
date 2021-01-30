import path from 'path';

import { parseMDX } from '../src/lib/parseMDX';

(async () => {
  const filename = path.join(__dirname, '..', 'src', 'pages', 'objeto', 'c2017-k2.mdx');

  await parseMDX(filename)
    .then(result => console.log('result', result))
  ;
})();