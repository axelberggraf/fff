import React from "react";
import Link from "next/link";
export default function Logo({ activePage }) {
  return (
    <>
      {activePage?.firstSlug != "varutstillingen" &&
        activePage?.firstSlug != "fotobokfestivalen" && (
          <Link href="/">
            <div className="logo-container">
              <span>Forbundet</span>
              <span>Frie</span>
              <span>Fotografer</span>
            </div>
          </Link>
        )}
      {activePage?.firstSlug == "varutstillingen" && (
        <div className="logo-container">
          <span>Vårutstillingen</span>
          {/* <span>&nbsp;</span>
          <span></span> */}
        </div>
      )}
      {activePage?.firstSlug == "fotobokfestivalen" && (
        <div className="logo-container">
          <span>Fotobokfestivalen</span>
          {/* <span>&nbsp;</span>
          <span></span> */}
        </div>
      )}
    </>
  );
}
