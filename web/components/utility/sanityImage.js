import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/client";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

function cropDimsFromAspect(naturalW, naturalH, aspect) {
  const r = aspect.w / aspect.h;
  const naturalR = naturalW / naturalH;

  // Largest rectangle with ratio r that fits inside original:
  if (naturalR > r) {
    const h = naturalH;
    const w = Math.round(h * r);
    return { w, h };
  } else {
    const w = naturalW;
    const h = Math.round(w / r);
    return { w, h };
  }
}

function scaleDownToMaxWidth(w, h, maxWidth) {
  if (!maxWidth || w <= maxWidth) return { w, h };
  const s = maxWidth / w;
  return { w: Math.round(w * s), h: Math.round(h * s) };
}

export default function SanityImage({
  image,
  alt = "",
  sizes = "100vw",
  quality = 75,
  priority = false,
  maxWidth = 2000,

  // pass like { w: 4, h: 5 }
  aspect = null,

  ...props
}) {
  if (!image?.asset) return null;

  const dims = image.asset?.metadata?.dimensions;
  const naturalW = dims?.width;
  const naturalH = dims?.height;
  if (!naturalW || !naturalH) return null;

  const hasHotspot =
    typeof image?.hotspot?.x === "number" &&
    typeof image?.hotspot?.y === "number";

  let outW = naturalW;
  let outH = naturalH;

  let u = urlFor(image).quality(quality).auto("format");

  if (aspect?.w && aspect?.h) {
    // Compute crop output dimensions from original image ratio
    const base = cropDimsFromAspect(naturalW, naturalH, aspect);
    const out = scaleDownToMaxWidth(base.w, base.h, maxWidth);

    outW = out.w;
    outH = out.h;

    // Crop to aspect ratio. If hotspot exists, use it; otherwise center crop.
    u = u.width(outW).height(outH).fit("crop");

    if (hasHotspot) {
      // Use hotspot as focal point
      u = u.crop("focalpoint").focalPoint(image.hotspot.x, image.hotspot.y);
    } else {
      // Center crop explicitly (optional, but makes intent clear)
      u = u.crop("center");
    }
  } else {
    // Normal: preserve proportions, cap width
    const cappedW = Math.min(naturalW, maxWidth);
    u = u.width(cappedW).fit("max");

    // Keep intrinsic ratio from original
    outW = naturalW;
    outH = naturalH;
  }

  const src = u.url();

  return (
    <Image
      src={src}
      alt={image.alt || alt}
      width={outW}
      height={outH}
      sizes={sizes}
      priority={priority}
      placeholder={image.asset?.metadata?.lqip ? "blur" : "empty"}
      blurDataURL={image.asset?.metadata?.lqip}
      style={{ width: "100%", height: "auto" }}
      {...props}
    />
  );
}
