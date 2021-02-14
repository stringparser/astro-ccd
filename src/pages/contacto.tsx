import Alert from "@material-ui/lab/Alert/Alert";
import { Box, makeStyles, Input, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    margin: '2rem auto',

    '&, & form': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },

    [theme.breakpoints.up('sm')]: {
      maxWidth: '50%',
    },
  },
  form: {
    '& > :not(:first-child)': {
      marginTop: '1rem',
    }
  }
}));

const Contacto = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <form
        className={classes.form}
        noValidate
        autoCorrect="off"
        autoComplete="off"
      >
        <Alert
          icon={false}
          severity="info"
        >
          Escriba un mensage
        </Alert>

        <TextField
          required
          type="email"
          label="Email"
          variant="outlined"
        />

        <TextField
          required
          multiline
          lang="es"
          rows={5}
          label="Mensage"
          variant="outlined"
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
        >
          Enviar
        </Button>
      </form>
    </Box>
  );
}

export default Contacto;