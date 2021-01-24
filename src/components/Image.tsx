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
      width={/obras\S*\.gif/.test(props.src)
          ? '150px'
          : '75%'
      }
      loading="lazy"
      style={{border: '1px solid rgba(255,255,255,0.15)', margin: '1rem'}}
      {...props}
    />
  </Box>
);

export default Image;