import React from "react";
import Link from "next/link";
export default function NewsModule({ news }) {
  return (
    <div className="news-module">
      {news?.map((item) => (
        <Link key={item._id} href={`/nyheter/${item.slug.current}`}>
          <article>
            <h4>{item.title}</h4>
            <div className="news-date">{item.date}</div>
          </article>
        </Link>
      ))}
    </div>
  );
}
