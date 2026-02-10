import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/client";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function SanityImage({
  image,
  alt = "",
  sizes = "100vw", // default fallback
  quality = 75,
  priority = false,
  maxWidth = 2000,
  ...props
}) {
  if (!image?.asset) return null;

  const dims = image.asset?.metadata?.dimensions;
  const width = dims?.width;
  const height = dims?.height;

  if (!width || !height) return null;

  const src = urlFor(image)
    .width(Math.min(width, maxWidth))
    .quality(quality)
    .auto("format")
    .fit("max")
    .url();

  return (
    <Image
      src={src}
      alt={image.alt || alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      placeholder={image.asset?.metadata?.lqip ? "blur" : "empty"}
      blurDataURL={image.asset?.metadata?.lqip}
      style={{ width: "100%", height: "auto" }}
      {...props}
    />
  );
}
