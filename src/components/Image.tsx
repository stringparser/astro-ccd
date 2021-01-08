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
      style={{border: '1px solid rgba(0,0,0,0.15)'}}
      {...props}
    />
  </Box>
);

export default Image;