import clsx from "clsx";
import { ChevronRight } from "@material-ui/icons";
import { Box, BoxProps, makeStyles, Typography } from "@material-ui/core";

import H1 from "src/components/Typography/H1";
import NavigationLink from "src/components/Navigation/NavigationLink";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  },
  link: {
    display: 'flex',
    marginTop: '0.5rem',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
    },
  }
}))

export type AllImagesTitleProps = BoxProps;

const AllImagesTitle: React.FC<AllImagesTitleProps> = ({
  component = H1,
  title,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Box
      {...props}
      className={clsx(classes.root, className)}
    >
      {title}

      <Box className={classes.link}>
        <NavigationLink href="/fotografia/registro">
          <Box
            display="flex"
            alignItems="center"
          >
            <Typography>
              Listado de imágenes
            </Typography>
            <span> </span>
            <ChevronRight />
          </Box>
        </NavigationLink>
      </Box>
    </Box>
  );
};

export default AllImagesTitle;