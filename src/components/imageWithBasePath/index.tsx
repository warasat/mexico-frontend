import { image_path } from "../../environment";




interface Image {
  className?: string;
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  id?: string;
  style?: React.CSSProperties;
}

const ImageWithBasePath = (props: Image) => {
  // If src is absolute (http/https/protocol-relative) or data URI, use as-is; otherwise prefix with base path
  const isAbsolute = /^(https?:)?\/\//i.test(props.src) || /^data:/i.test(props.src);
  const fullSrc = isAbsolute ? props.src : `${image_path}${props.src}`;
  return (
    <img
      className={props.className}
      src={fullSrc}
      height={props.height}
      alt={props.alt}
      width={props.width}
      id={props.id}
      style={props.style}
    />
  );
};

export default ImageWithBasePath;
