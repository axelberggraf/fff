import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/client";
// Image URL builder
const builder = imageUrlBuilder(client);

// Helper to build image URLs
const urlFor = (source) => builder.image(source);

const SanityImage = ({
  image,
  alt,
  width = null,
  height = null,
  quality = 100,
  layout = "responsive",
}) => {
  if (!image || !image.asset) {
    console.error("Invalid image object passed to SanityImage:", image);
    return null;
  }

  // Build the image URL
  let imageUrlBuilder;
  if (height) {
    imageUrlBuilder = urlFor(image.asset._id)
      .height(height)
      .quality(quality)
      .auto("format");
  } else {
    imageUrlBuilder = urlFor(image.asset._id)
      .width(width)
      .quality(quality)
      .auto("format");
  }

  const imageUrl = imageUrlBuilder.url();

  return (
    <Image
      src={imageUrl}
      alt={image.alt || alt || "Smuss Typekiosk"}
      width={image.asset.metadata.dimensions.width}
      height={image.asset.metadata.dimensions.height} // If height is not provided, it's undefined for auto height
      placeholder="blur"
      blurDataURL={image.asset.metadata.lqip} // Low-res version for blur placeholder
    />
  );
};

export default SanityImage;
