import JSON5 from 'json5';
import { RegistroItem } from './registro';

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
  |
  {
    type: 'meta',
    data: Record<string, string>;
  }
;

const mapData = (el: RemarkNode): ParsedRemarkResult | undefined => {
  const { type, value = '' } = el;

  switch (type) {
    case 'text': {
      const meta = /export\s+const\s+meta\s+=[^{]+(\{[^}]+\})/gm.exec(value);

      if (meta) {
        try {
          const data = JSON5.parse(meta[1]);
          return {
            type: 'meta',
            data,
          };
        } catch (err) {
          console.log('warning: failed to parse meta', el);
        }
      }

      return {
        type,
        text: value,
      };
    }
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
          ($0, $1: string, $2: string) => {
            data.type = 'image';

            if ($1 === 'fecha' || $1 === 'date') {
              data.date = $2;
            } else if ($1 === 'src') {
              data.src = $2.replace(/^\//, '');
            } else {
              data[$1] = $2;
            }

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
  const fs = await import('fs-extra');
  const mdx = (await import('remark-mdx')).default;
  const remark = (await import('remark')).default;
  const {read} = (await import('to-vfile')).default;

  const vFile = await read(filename);

  return new Promise((resolve) => {
    remark()
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

        const meta = results.reduce((acc, el) => {
          if (el.type === 'meta') {
            return el.data;
          }

          return acc;
        }, {} as ParsedMDXResult['meta']);

        if (!meta.titulo) {
          meta.titulo = results.reduce((acc, el) => {
            if (acc !== '') {
              return acc;
            }

            return el.type === 'heading' && el.text
              ? el.text
              : acc
            ;
          }, '');
        }

        resolve({
          meta: {
            titulo: '',
            objeto: '',
            etiquetas: '',
            ...meta,
          },
          items: results,
          content: vFile.content,
        });
      })
      .process(vFile)
    ;
  });
}