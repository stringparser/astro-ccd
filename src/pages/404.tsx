import { useRouter } from "next/router";
import { useCallback } from "react";
import { Box, Chip, makeStyles } from "@material-ui/core";

import H1 from "src/components/Typography/H1";
import BaseLink from "src/components/Navigation/BaseLink";
import { ArrowBack } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  enlaceVolver: {
    cursor: 'pointer',
    display: 'inline-flex',

    '&:hover': {
      textDecoration: 'none',
    }
  }
}));

export default function Custom404() {
  const router = useRouter();
  const classes = useStyles();

  const handleOnClick = useCallback(
    () => router.back(),
    [router]
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box mt="2rem" />
      <H1>
        No se ha encontrado esta página
      </H1>
     <Chip
        icon={<ArrowBack />}
        label="Volver atrás"
        onClick={handleOnClick}
        component="button"
      />
    </Box>
  );
}