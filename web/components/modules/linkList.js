import Link from "next/link";
import linkResolver from "@/lib/linkResolver";

export default function LinkList({ links }) {
  console.log(links);
  return (
    <ul className="link-list">
      {links.map((link, i) => (
        <div key={i}>
          {link.type == "external" && (
            <li>
              <a
                className="link-button"
                href={link.url}
                target={link.blank ? "_blank" : ""}
              >
                <div>{link.linkText}</div>
                <div>↗</div>
              </a>
            </li>
          )}
          {link.type == "internal" && (
            <li>
              <Link
                className="link-button"
                href={linkResolver({
                  slug: link.internalLink.slug,
                  type: link.internalLink._type,
                  eventType: link.internalLink.eventType,
                  parentSlug: link.internalLink.parent?.slug || null,
                })}
              >
                <div>{link.linkText}</div>
                <div>↗</div>
              </Link>
            </li>
          )}
        </div>
      ))}
    </ul>
  );
}
