const linkResolver = (props) => {
  if (props.type == "event") {
    if (props.eventType == "fff") {
      return `/arrangement/${props.slug}`;
    }
    if (props.eventType == "ffo") {
      if (props.parentSlug) {
        return `/fotobokfestivalen/${props.parentSlug}/${props.slug}`;
      }
      return `//${props.slug}`;
    }
  }
  return "";
};

export default linkResolver;
