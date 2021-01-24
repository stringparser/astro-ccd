import { NextImageProps } from 'next/image'

declare module 'next/image' {
  export declare type ImageProps = NextImageProps & {
    layout: 'fill';
    objectFit: NextImageProps['objectFit'];
  }
}