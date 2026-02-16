import React from "react";
import Link from "next/link";
import SanityImage from "../utility/sanityImage";
import linkResolver from "@/lib/linkResolver";
import { useEffect, useState } from "react";
export default function EventsModule({ events }) {
  const [filter, setFilter] = useState("events");
  return (
    <div className="events-module">
      <div className="filters">
        <button
          className={`filter-button ${filter == "events" && "checked"}`}
          onClick={() => setFilter("events")}
        >
          Arrangementer
        </button>
        <button
          className={`filter-button ${filter == "calendar" && "checked"}`}
          onClick={() => setFilter("calendar")}
        >
          Kalender
        </button>
      </div>
      <div className="events-grid">
        {filter === "events" && (
          <>
            {events?.map((item, i) => (
              <Link
                key={i}
                href={linkResolver({
                  slug: item.slug.current,
                  type: "event",
                  eventType: item.eventType,
                  parentSlug: item.parent?.slug?.current || null,
                })}
              >
                <article className="event-article">
                  {item.thumbnail ? (
                    <SanityImage
                      image={item.thumbnail}
                      aspect={{ w: 6, h: 4 }}
                    />
                  ) : (
                    <div className="thumbnail-placeholder"></div>
                  )}
                  <div className="event-info">
                    <h4>{item.title}</h4>
                    <div className="events-date">{item.date}</div>
                  </div>
                </article>
              </Link>
            ))}
          </>
        )}

        {/* {filter === "calendar" && (
          <>
            {memberevents?.map((item, i) => (
              <a key={i} href={item.url} target="_blank">
                <article className="member-article">
                  <SanityImage image={item.thumbnail} aspect={{ w: 6, h: 4 }} />
                  <h4>{item.title}</h4>
                  <div className="events-date">{item.date}</div>
                </article>
              </a>
            ))}
          </>
        )} */}
      </div>
    </div>
  );
}
