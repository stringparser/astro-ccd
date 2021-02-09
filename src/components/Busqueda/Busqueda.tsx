import safeRegex from "safe-regex";
import { useState } from "react";
import { SearchOutlined } from "@material-ui/icons";
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { InputAdornment, makeStyles, TextField, TextFieldProps } from "@material-ui/core";

import { RegistroItem } from "types";

import { BUSQUEDA_ID } from "src/components/Busqueda/constants";
import registroObservaciones from "cache/registro-metadata.json";

export type SearchItem = Pick<RegistroItem, 'urlId' | 'titulo' | 'objeto'>;

const mapOptions = (inputValue: string): SearchItem[] => {
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

  return registroObservaciones
    .filter(searchRE
      ? ({ objeto, titulo }: SearchItem) => (
        objeto && searchRE.test(objeto)
        || titulo && searchRE.test(titulo)
      )
      : ({ objeto, titulo }: SearchItem) => (
        objeto && objeto.includes(inputValue)
        || titulo && titulo.includes(inputValue)
      )
    )
  ;
};

const getOptionLabel = (item: SearchItem) => (
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
  onChange?: (value: SearchItem) => void;
};

const Busqueda: React.FC<BusquedaProps> = ({ onChange }) => {
  const classes = useStyles();

  const [value, setValue] = useState<SearchItem>(null);
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
      variant="outlined"
      className={classes.textField}
      InputProps={{
        ...params.InputProps,
        type: 'search',
        value: inputValue,
        onChange: handleInputChange,
        onKeyDown: handleKeyDown,
        endAdornment: (
          <InputAdornment position="end">
            <SearchOutlined />
          </InputAdornment>
        ),
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