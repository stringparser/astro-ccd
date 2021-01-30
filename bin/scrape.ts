import fs from 'fs-extra';
import path from 'path';

import { parseMDX } from '../src/lib/parseMDX';

(async () => {
  const filename = path.join(__dirname, '..', 'src', 'registro', '2I.mdx');
  const fileContents = await fs.readFile(filename, 'utf8');

  await parseMDX(filename, fileContents)
    .then(result => console.log('result', result))
  ;
})();