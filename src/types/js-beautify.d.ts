
type Options = Partial<{
  indent_char: string;
  indent_size: number;
}>;

declare module 'js-beautify' {

  export = js_beautify;

  declare function js_beautify(src: string, config?: object): string;

  declare namespace js_beautify {
    function css(source_text: string, options?: Options): string;

    function css_beautify(source_text: string, options?: Options): string;

    function html(html_source: string, options?: Options, js?: any, css?: any): string;

    function html_beautify(html_source: string, options?: Options, js?: any, css?: any): string;

    function js(js_source_text: string, options?: Options): string;

    function js_beautify(js_source_text: any, options?: Options): string;

    namespace css {
      function defaultOptions(): object;
    }

    namespace css_beautify {
      function defaultOptions(): object;
    }

    namespace html {
      function defaultOptions(): object;
    }

    namespace html_beautify {
      function defaultOptions(): object;
    }

    namespace js {
      function defaultOptions(): object;
    }

    namespace js_beautify {
      function defaultOptions(): object;
    }

  }
}
