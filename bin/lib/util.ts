import { PageItemProps } from ".";

export const cleanHTML = (html: string = '') => {
  return (html
    .replace(/&nbsp;/gm, '\n')
    .replace(/(id|dir|rel|title|style|class)\s*=\s*["'][^'"]+["']/gm, '')
    .replace(/<br\s*\/?>/gm, '')
    .replace(/\s*(<|<\/)(em|span|h\d+|strong)\s*>\s*/gm, '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/<a (target=['"]_blank['"])?\s*href=\s*["'][^\s'"]+["']\s*(target=['"]_blank['"])?\s*>(\s*)<\/a>/gm, '')
    .replace(/allowfullscreen(=['"]true['"])?/, 'allowFullScreen')
  );
}

export const mapTextToUrl = (text: string = '') => {
  return (text
    .replace(/[\/()]+/g, '')
    .replace(/\s/g, '-')
    .replace(/--+/g, '-')
    .replace(/-$/, '')
    .replace(/(c\d{4}-[a-z][0-9])-(\S+)/ig, '$1')
    .replace(/^(\d+[a-z])([-a-z]+)*$/ig, '$1')
    .replace(/(\d+)-\S{2,}/, '$1')
    .replace(/\+\d+$/, '')
    .replace(/^([-A-Z]+)$/g, ($0, $1) => {
      if ($1) {
        return $1.toLowerCase();
      }

      return $0;
    })
  );
};

export const mapMDX = (el: PageItemProps) => {
  switch (el.type) {
    case 'text': {
      return el.text;
    }
    case 'header': {
      return `# ${el.text}`;
    }
    case 'image': {
      return [
        `<img src="${el.src}" />`,
        cleanHTML(el.text)
      ].filter(v => v).join('\n\n');
    }
  }
}