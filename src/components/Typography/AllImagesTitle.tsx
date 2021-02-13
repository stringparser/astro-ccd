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

    marginBottom: '2rem',

    '& h1': {
      margin: 'unset',
      padding: 'unset',
    },

    '& a,p,svg': {
      color: 'royalblue',
    },

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  link: {
    marginTop: '0.5rem',

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',

    [theme.breakpoints.up('sm')]: {
      alignItems: 'start',
      justifyContent: 'flex-end',
    },
  },
  linkContent: {
    color: theme.palette.common.white,

    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end',
    },

    '& .MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
    }
  }
}))

export type AllImagesTitleProps = BoxProps;

const AllImagesTitle: React.FC<AllImagesTitleProps> = ({
  component: TitleComponent = H1,
  title,
  children,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Box
      {...props}
      className={clsx(classes.root, className)}
    >
      <Box className={classes.link}>
        <TitleComponent>
          {title}
        </TitleComponent>

        <NavigationLink href="/fotografia/registro">
          <Box className={classes.linkContent}>
            <Typography>
              Listado completo <ChevronRight />
            </Typography>
          </Box>
        </NavigationLink>
      </Box>


      {children}
    </Box>
  );
};

export default AllImagesTitle;