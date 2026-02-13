import React from "react";
import Link from "next/link";
import SanityImage from "../utility/sanityImage";
import { useEffect, useState } from "react";
export default function NewsModule({ news, memberNews }) {
  const [newsType, setNewsType] = useState("fff");
  return (
    <div className="news-module">
      <div className="filters">
        <button
          className={`filter-button ${newsType == "fff" && "checked"}`}
          onClick={() => setNewsType("fff")}
        >
          Nyheter
        </button>
        <button
          className={`filter-button ${newsType == "members" && "checked"}`}
          onClick={() => setNewsType("members")}
        >
          Medlemsaktivitet
        </button>
      </div>
      <div className="news-grid">
        {newsType === "fff" && (
          <>
            {news?.map((item) => (
              <Link key={item._id} href={`/nyheter/${item.slug.current}`}>
                <article>
                  <h4>{item.title}</h4>
                  <div className="news-date">{item.date}</div>
                </article>
              </Link>
            ))}
          </>
        )}

        {newsType === "members" && (
          <>
            {memberNews?.map((item, i) => (
              <a key={i} href={item.url} target="_blank">
                <article className="member-article">
                  <SanityImage image={item.thumbnail} aspect={{ w: 6, h: 4 }} />
                  <h4>{item.title}</h4>
                  <div className="news-date">{item.date}</div>
                </article>
              </a>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
