import React from "react";
import SanityImage from "../utility/sanityImage";
import { useState } from "react";
export default function Carousel({ props, slides }) {
  const [index, setIndex] = useState(0);
  return (
    <div className="carousel">
      {/* {props.slides.map((slide, i) => (
        <div key={i}>
          <SanityImage
            image={slide}
            sizes="(max-width: 720px) calc(100vw - var(--padding)), 50vw"
          />
          {slide.caption && <div className="f-hook">{slide.caption}</div>}
        </div>
      ))} */}
      <button
        className="prev-button"
        disabled={index == 0}
        onClick={() => setIndex((prev) => prev - 1)}
      >
        {index}
      </button>{" "}
      <div>
        <SanityImage
          image={slides[index]}
          sizes="(max-width: 720px) calc(100vw - var(--padding)), 50vw"
        />
        {slides[index].caption && (
          <div className="caption f-hook">{slides[index].caption}</div>
        )}
      </div>
      <button
        className="next-button"
        disabled={index == slides.length - 1}
        onClick={() => setIndex((prev) => prev + 1)}
      >
        {slides.length - index - 1}
      </button>
    </div>
  );
}
