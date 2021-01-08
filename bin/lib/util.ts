export function cleanHTML(html: string = '') {
  return (html
    .replace(/&nbsp;/gm, '\n')
    .replace(/(id|dir|rel|title|style|class)\s*=\s*["'][^'"]+["']/gm, '')
    .replace(/<br\s*\/?>/gm, '')
    .replace(/\s*(<|<\/)(em|span|h\d+|strong)\s*>\s*/gm, '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/<a (target=['"]_blank['"])?\s*href=\s*["'][^\s'"]+["']\s*(target=['"]_blank['"])?\s*>(\s*)<\/a>/gm, '')
    .replace('allowfullscreen', 'allowFullScreen')
  );
}