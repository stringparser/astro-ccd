import {MuiPickersOverrides} from '@material-ui/pickers/typings/overrides';

// see: https://material-ui.com/guides/typescript/#customization-of-theme
declare module '@material-ui/core/styles/createMuiTheme' {
  export interface ThemeOptions {
    maxWidth: string;
  }

  export interface Theme {
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
