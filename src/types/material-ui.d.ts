import {MuiPickersOverrides} from '@material-ui/pickers/typings/overrides';
import { maxWidthMixin, opacityMixin } from 'src/components/styles';

// see: https://material-ui.com/guides/typescript/#customization-of-theme

type ThemeMixins = MixinsOptions & {
  opacity: CSSProperties,
  maxWidth: CSSProperties,
};


declare module '@material-ui/core/styles/createMuiTheme' {
  export interface ThemeOptions {
    mixins: ThemeMixins;
    maxWidth: string;
  }

  export interface Theme {
    mixins: ThemeMixins;
    maxWidth: string;
  }
}

// ref: https://material-ui-pickers.dev/guides/css-overrides
type OverridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends OverridesNameToClassKey {}
}
