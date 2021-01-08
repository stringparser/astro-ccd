import { ImageProps as NextImageProps } from 'next/image'

export type ImageProps = Partial<NextImageProps>;

const Image: React.FC<ImageProps> = props => (
  <img
    loading="lazy"
    {...props}
  />
);

export default Image;