import { Box, Link, LinkProps, Typography } from "@material-ui/core";

import Image, { ImageProps } from './Image';

type ImagenLinkProps = {
  link: LinkProps
  imagen: ImageProps
};

const ImagenLink: React.FC<ImagenLinkProps> = ({ link, imagen, children, ...rest}) => {
  return (
    <Box
      mt="3rem"
      width="100%"
      height="200px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      {...rest}
    >
      <Link {...link} style={{userSelect: 'none', color: 'currentColor'}}>
        <Typography component="h2" style={{fontWeight: 'bold', color: 'currentColor'}}>
          {children}
        </Typography>
        <Image {...imagen} />
      </Link>
    </Box>
  )
}

export default ImagenLink;