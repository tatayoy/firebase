import { ImageInterface } from "../interface/Image";
import Image from "next/image";

const ImageNext = ({ onClick, className, src, alt, width, height }: ImageInterface) => {
  return (
    <Image
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      src={src}
      alt={alt}
    />
  );
};

export default ImageNext;
