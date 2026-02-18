import Carousel from "@/components/modules/carousel";
import Link from "next/link";
import LinkList from "@/components/modules/linkList";
export const serializer = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2 className="text-editor-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-editor-h3 f-hook">{children}</h3>,
    h4: ({ children }) => <h4 className="text-editor-h4">{children}</h4>,
    center: ({ children }) => <p className="text-editor-center">{children}</p>,
    small: ({ children }) => <p className="text-editor-small">{children}</p>,
    medium: ({ children }) => <p className="text-editor-medium">{children}</p>,
  },
  marks: {
    left: ({ children, value }) => {
      return <span style={{ textAlign: "left" }}>{children}</span>;
    },
    center: ({ children, value }) => {
      return <span className="text-block-center">{children}</span>;
    },
    right: ({ children, value }) => {
      return <span style={{ textAlign: "right" }}>{children}</span>;
    },

    link: ({ children, value }) => {
      const { type, href, blank, internalLink } = value;
      if (type === "internal" && internalLink) {
        // Render internal link
        // const internalHref = resolveInternalLink(internalLink); // Custom resolver for internal links
        return <Link href={"/" + internalLink.slug}>{children}</Link>;
      } else {
        return (
          <a
            href={href}
            target={blank ? "_blank" : "_self"}
            rel={blank ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        );
      }

      return children;
    },
  },
  types: {
    button: (props) => <TextButton content={props.value} />,
    carousel: (props) => (
      <Carousel props={props.value} slides={props.value.slides} />
    ),
    linkList: (props) => <LinkList links={props.value.links} />,
    // image: (props) => {
    //   return <TextImage image={props.value} />;
    // },
  },
};
