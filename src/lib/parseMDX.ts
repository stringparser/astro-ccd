import fs from 'fs-extra';
import matter from 'gray-matter';
import toVFile from 'to-vfile';

import mdx from 'remark-mdx';
import remark from 'remark';
import frontmatter from 'remark-frontmatter';
import { RegistroItem } from './staticProps';

type RemarkNode = {
  type: 'root' | 'text' | 'html' | 'yaml' | 'heading' | 'paragraph';
  value: string;
  children?: RemarkNode[];
};

export type ParsedRemarkResult =
  {
    type: 'labels';
    text: string;
  }
  |
  {
    type: 'object';
    text: string;
  }
  |
  {
    type: 'image';
    src: string;
    date?: string;
    fecha?: string;
  }
  |
  {
    type: 'text' | 'heading' | 'paragraph';
    text: string;
  }
;

const mapData = (el: RemarkNode): ParsedRemarkResult | undefined => {
  const { type, value = '' } = el;

  switch (type) {
    case 'text':
    case 'heading':
    case 'paragraph': {
      return {
        type,
        text: value,
      };
    }
    case 'yaml': {
      if (/^\s*objeto/.test(value)) {
        return {
          type: 'object',
          text: value.replace(/^\s*objeto[\s:]+/, ''),
        };
      }

      if (/^\s*etiquetas/.test(value)) {
        return {
          type: 'labels',
          text: value.replace(/^\s*etiquetas[\s:]+/, ''),
        };
      }
    }
    case 'html': {
      if (/<(img|Imagen)/.test(value)) {
        const data: ParsedRemarkResult = {
          type: 'image',
          src: '',
          date: '',
        };

        value.replace(
          /([a-z]+)=\\?['"]([^\s\\'"]+)\\?['"]/gi,
          ($0, key: string, value: string) => {
            const name = key === 'fecha' || key === 'date'
              ? 'date'
              : key
            ;
            data[name] = value;
            data.type = 'image';
            return $0;
          }
        );

        return data;
      }
    }
  }

  return undefined;
};

export type ParsedMDXResult = {
  meta: Pick<RegistroItem, 'titulo' | 'objeto' | 'etiquetas'>;
  items: ParsedRemarkResult[];
  content: string;
};

export const parseMDX = async (filename: string): Promise<ParsedMDXResult> => {
  const fileContents = await fs.readFile(filename, 'utf8');

  const {
    data,
    content
  } = matter(fileContents);

  const vfile = new toVFile({
    path: filename,
    contents: content,
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

        const results = values
          .map(mapData)
          .filter(v => v != null)
        ;

        const titulo = results.reduce((acc = '', el) => {
          if (acc !== '') {
            return acc;
          }

          return el.type === 'heading' && el.text
            ? el.text
            : acc
          ;
        }, data.titulo);

        resolve({
          meta: {
            titulo,
            objeto: (data.objeto || ''),
            etiquetas: (data.etiquetas || ''),
          },
          items: results,
          content,
        });
      })
      .process(vfile)
    ;
  });
}