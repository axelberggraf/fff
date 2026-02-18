const linkResolver = (props) => {
  console.log("linkProps", props);
  if (props.type == "event") {
    if (props.eventType == "fff") {
      return `/arrangement/${props.slug}`;
    }
    if (props.eventType == "ffo") {
      if (props.parentSlug) {
        return `/fotobokfestival/${props.parentSlug}/${props.slug}`;
      }
      return `//${props.slug}`;
    }
  } else if (props.type == "singletonPage") {
    return props.slug;
  }
  return "#";
};

export default linkResolver;
