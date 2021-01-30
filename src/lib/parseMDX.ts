import toVFile from 'to-vfile';

import mdx from 'remark-mdx';
import remark from 'remark';
import frontmatter from 'remark-frontmatter';

type RemarkNode = {
  type: 'root' | 'html' | 'yaml' | 'heading' | 'paragraph';
  value: string;
  children?: RemarkNode[];
};

export type ParsedRemarkImage = {
  type: 'image';
  src: string;
  date?: string;
  fecha?: string;
};

export type ParsedRemarkResult =
  {
    type: 'labels';
    text?: string;
  }
  |
  {
    type: 'object';
    text?: string;
  }
  |
  ParsedRemarkImage
  |
  {
    type: 'heading';
    text: string;
  }
;

const mapData = (el: RemarkNode): ParsedRemarkResult | undefined => {
  const { type, value } = el;

  if (type === 'yaml' && /^\s*etiquetas/.test(value)) {
    return {
      type: 'labels',
      text: value.replace(/^\s*etiquetas[\s:]+/, ''),
    };
  }

  if (type === 'yaml' && /^\s*objeto/.test(value)) {
    return {
      type: 'object',
      text: value.replace(/^\s*objeto[\s:]+/, ''),
    };
  }

  if (type === 'html' && /<(img|Imagen)/.test(value)) {
    const data: ParsedRemarkResult = {
      type: 'image',
      src: '',
      date: '',
    };

    value.replace(
      /([a-z]+)=\\?['"]([^\s\\'"]+)\\?['"]/gi,
      ($0, key: string, value: string) => {
        data[key] = value;
        data.type = 'image';
        return $0;
      }
    );

    return data;
  }

  if (type === 'heading') {
    return {
      type,
      text: value,
    };
  }

  return undefined;
};

export const parseMDX = async (filename: string, contents: string): Promise<ParsedRemarkResult[]> => {
  const vfile = new toVFile({
    contents,
    path: filename,
  });

  return new Promise((resolve) => {
    remark()
      .use(frontmatter)
      .use(mdx)
      .use(() => (tree: RemarkNode) => {
        const values = (tree.children || [])
          .flatMap<RemarkNode>(function mapChildren(el) {
            if (el.type === 'heading') {
              return {
                type: el.type,
                value: el.children.flatMap(mapChildren)
                  .map(el => el.value)
                  .join('\n')
                ,
              };
            }

            if (el.children) {
              return el.children.map(mapChildren);
            }

            return {
              type: el.type,
              value: el.value,
            };
          })
        ;

        resolve(values
          .map(mapData)
          .filter(v => v != null)
        );
      })
      .process(vfile)
    ;
  });
}