import { Link, makeStyles } from "@material-ui/core";
import Image from "src/components/Image/Image";

const useStyles = makeStyles(() => ({
  root: {},
  image: {
    margin: '1rem 0',
    maxWidth: 'unset',
  },
}));

const ObservadoresSupernovas = () => {
  const classes = useStyles();

  return (
    <Link
      href="https://sites.google.com/view/sn2017eaw/observadores"
      target="_blank"
    >
      <Image
        sinBorde
        src={require('@public/registro/abell-2151_20140200_logodef.png').default}
        link={false}
        width={105}
        height={94.5}
        className={classes.image}
      />
    </Link>
  );
};

export default ObservadoresSupernovas;