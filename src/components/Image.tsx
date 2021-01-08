import { Box } from '@material-ui/core';
import { ImageProps as NextImageProps } from 'next/image'

export type ImageProps = Partial<NextImageProps>;

const Image: React.FC<ImageProps> = props => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <img
      width="75%"
      loading="lazy"
      {...props}
    />
  </Box>
);

export default Image;