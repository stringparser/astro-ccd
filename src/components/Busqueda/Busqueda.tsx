import safeRegex from "safe-regex";
import { useCallback, useState } from "react";
import { SearchOutlined } from "@material-ui/icons";
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { InputAdornment, makeStyles, TextField, TextFieldProps } from "@material-ui/core";

import { RegistroItem } from "types";

import { BUSQUEDA_ID } from "src/components/Busqueda/constants";
import registroMetadata from "cache/registro-metadata.json";
import { FilterOptionsState } from "@material-ui/lab/useAutocomplete";

export type SearchItem = Pick<RegistroItem, 'urlId' | 'tipo' | 'titulo' | 'objeto'> & {
  tag: string;
};

const searchItems = registroMetadata
  .map(el => {
    return {
      ...el,
      tag: el.tipo.replace(/[-_]+/g, ' ')
    };
  })
;

const filterOptions = (options: SearchItem[], state: FilterOptionsState<SearchItem>): SearchItem[] => {
  const { inputValue } = state;

  if (!inputValue) {
    return searchItems.slice(0, 10);
  }

  const testSource = inputValue
    .trim()
    .replace(/(\s+)/g, '\\s*')
  ;

  const searchRE = safeRegex(testSource)
    ? new RegExp(testSource, 'gi')
    : null
  ;

  const result = options
    .filter(searchRE
      ? ({ tag, objeto, titulo }: SearchItem) => (
        tag && searchRE.test(tag)
        || objeto && searchRE.test(objeto)
        || titulo && searchRE.test(titulo)
      )
      : ({ tag, objeto, titulo }: SearchItem) => (
        tag && tag.includes(inputValue)
        || objeto && objeto.includes(inputValue)
        || titulo && titulo.includes(inputValue)
      )
    )
  ;

  if (result.length === 1) {
    const [object] = result;
    const objectType = object.tipo;
    const objetUrlId = object.urlId;

    return result.concat(
      searchItems.filter(el =>
        el.urlId !== objetUrlId
        && el.tipo === objectType
      )
    );
  }

  return result;
};

const getOptionLabel = (item: SearchItem) => (
  item.titulo
  || item.objeto
);

const useStyles = makeStyles(theme => ({
  root: {
    width: '250px',
    margin: '0',
  },
  inputRoot: {
    '&.MuiInputBase-root.MuiOutlinedInput-root.MuiOutlinedInput-adornedEnd': {
      margin: 0,
      paddingRight: theme.spacing(1.5),
    }
  }
}));

type DefaultAutocompleteProps = AutocompleteProps<
  SearchItem,
  false,
  true,
  false
>;

export type BusquedaProps = {
  onChange?: (value: SearchItem) => void;
};

const Busqueda: React.FC<BusquedaProps> = ({ onChange }) => {
  const classes = useStyles();

  const [value, setValue] = useState<SearchItem>(null);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (onChange && ev.key === 'Enter' && value) {
        onChange(value);
      }
    },
    [value, onChange]
  );

  const handleInputChange: TextFieldProps['onChange'] = useCallback(
    (ev) => setInputValue(ev.target.value),
    [setInputValue]
  );

  const handleAutoCompleteChange: DefaultAutocompleteProps['onChange'] = useCallback(
    (ev, selectedValue) => {
      setValue(selectedValue);

      if (selectedValue && onChange) {
        onChange(selectedValue);
      }
    },
    [setValue, onChange]
  );

  const renderInput = (params: Parameters<DefaultAutocompleteProps['renderInput']>[0]) => (
      <TextField
        {...params}
        label="Búsqueda"
        variant="outlined"
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
    )
  ;

  return (
    <Autocomplete
      id={BUSQUEDA_ID}
      value={value}
      options={searchItems}
      autoSelect
      autoComplete
      autoHighlight
      classes={classes}
      renderInput={renderInput}
      filterOptions={filterOptions}
      getOptionLabel={getOptionLabel}
      onChange={handleAutoCompleteChange}
    />
  );
};

export default Busqueda;