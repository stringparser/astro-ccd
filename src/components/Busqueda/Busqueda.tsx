import safeRegex from "safe-regex";
import { useState } from "react";
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { makeStyles, TextField, TextFieldProps } from "@material-ui/core";

import { RegistroItem } from "types";

import { BUSQUEDA_ID } from "src/components/Busqueda/constants";
import { getRegistro } from "src/lib/staticProps";

const mapOptions = (inputValue: string): RegistroItem[] => {
  if (!inputValue) {
    return [];
  }

  const testSource = inputValue
    .trim()
    .replace(/(\s+)/g, '\\s*')
  ;

  const searchRE = safeRegex(testSource)
    ? new RegExp(testSource, 'i')
    : null
  ;

  return getRegistro()
    .filter(searchRE
      ? ({ objeto, titulo }: RegistroItem) => (
        objeto && searchRE.test(objeto)
        || titulo && searchRE.test(titulo)
      )
      : ({ objeto, titulo }: RegistroItem) => (
        objeto && objeto.includes(inputValue)
        || titulo && titulo.includes(inputValue)
      )
    )
  ;
};

const getOptionLabel = (item: RegistroItem) => (
  item.titulo
  || item.objeto
);

const useStyles = makeStyles(() => ({
  root: {
    width: '250px',
    margin: '0',
  },
  textField: {
    margin: '0',
  }
}));

type DefaultAutocompleteProps = AutocompleteProps<
  RegistroItem,
  false,
  true,
  true
>;

export type BusquedaProps = {
  onChange?: (value: RegistroItem) => void;
};

const Busqueda: React.FC<BusquedaProps> = ({ onChange }) => {
  const classes = useStyles();

  const [value, setValue] = useState<RegistroItem>(null);
  const [inputValue, setInputValue] = useState('');

  const options = mapOptions(inputValue);

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    const selectedValue = value || options[0];

    if (onChange && ev.key === 'Enter' && selectedValue) {
      onChange(selectedValue);
    }
  }

  const handleInputChange: TextFieldProps['onChange'] = (ev) => {
    setInputValue(ev.target.value);
  };

  const handleAutoCompleteChange: DefaultAutocompleteProps['onChange'] = (ev, value) => {
    if (typeof value === 'string') {
      return;
    }

    setValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  const renderInput = (params: Parameters<DefaultAutocompleteProps['renderInput']>[0]) => (
    <TextField
      {...params}
      label="Búsqueda"
      margin="normal"
      variant="outlined"
      className={classes.textField}
      InputProps={{
        ...params.InputProps,
        type: 'search',
        value: inputValue,
        onChange: handleInputChange,
        onKeyDown: handleKeyDown,
      }}
    />
  );

  return (
    <Autocomplete
      id={BUSQUEDA_ID}
      value={value}
      options={options}
      freeSolo
      autoSelect
      disableClearable
      className={classes.root}
      renderInput={renderInput}
      getOptionLabel={getOptionLabel}
      onChange={handleAutoCompleteChange}
    />
  );
};

export default Busqueda;