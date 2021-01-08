export function cleanHTML(html: string = '') {
  return (html
    .replace(/&nbsp;/gm, '\n')
    .replace(/(id|dir|rel|title|style|class)\s*=\s*["'][^'"]+["']/gm, '')
    .replace(/<br\s*\/?>/, '')
    .replace(/\s*(<|<\/)(em|span|h\d+|strong)\s*>\s*/gm, '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/<a \s*href=\s*["'][^\s'"]+["']\s*>(\s*|<br\s*\/?>)<\/a>/gm, '')
    .replace('allowfullscreen', 'allowFullScreen')
  );
}