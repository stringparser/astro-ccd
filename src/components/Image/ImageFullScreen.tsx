import Image from "next/image";
import { createPortal } from "react-dom";
import { Box, makeStyles } from "@material-ui/core";

import { getPortalRoot } from 'src/lib/portal';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.modal,

    userSelect: 'none',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'fixed',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  }
}));

export type ImageFullScrenProps = {
  src: string;
};

const ImageFullScreen: React.FC<ImageFullScrenProps> = ({ src }) => {
  const classes = useStyles();

  return createPortal(
    <Box className={classes.root}>
      <Box
        width="80vw"
        height="80vh"
        position="relative"
      >
        <iframe src={src} />
      </Box>
    </Box>,
    getPortalRoot()
  );
}

export default ImageFullScreen;