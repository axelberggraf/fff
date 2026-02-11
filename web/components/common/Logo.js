import React from "react";
import Link from "next/link";
import { useState } from "react";
export default function Logo({ activePage }) {
  const [showFFF, setShowFFF] = useState(false);
  return (
    <>
      {activePage?.firstSlug != "varutstillingen" &&
        activePage?.firstSlug != "fotobokfestivalen" && (
          <Link href="/">
            <div className="logo-container">
              <span className="f">Forbundet</span>
              <span className="f">Frie</span>
              <span className="f">Fotografer</span>
            </div>
          </Link>
        )}
      {activePage?.firstSlug == "varutstillingen" && (
        <div
          className="logo-container"
          onMouseEnter={() => setShowFFF(true)}
          onMouseLeave={() => setShowFFF(false)}
        >
          {showFFF ? (
            <>
              <Link href="/">
                <span className="f">Forbundet</span>
                <span className="f">Frie</span>
                <span className="f">Fotografer</span>
              </Link>
            </>
          ) : (
            <>
              <span className="f">Vårutstillingen</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
            </>
          )}
        </div>
      )}
      {activePage?.firstSlug == "fotobokfestivalen" && (
        <div
          className="logo-container"
          onMouseEnter={() => setShowFFF(true)}
          onMouseLeave={() => setTimeout(() => setShowFFF(false), 200)}
        >
          {showFFF ? (
            <>
              <Link href="/">
                <span className="f">Forbundet</span>
                <span className="f">Frie</span>
                <span className="f">Fotografer</span>
              </Link>
            </>
          ) : (
            <>
              <span className="f">Fotobokfestivalen</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
            </>
          )}
        </div>
      )}
    </>
  );
}
