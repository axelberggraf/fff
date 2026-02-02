import React from "react";

export default function Logo({ activePage }) {
  return (
    <>
      {activePage?.firstSlug != "varutstillingen" &&
        activePage?.firstSlug != "fotobokfestivalen" && (
          <div className="logo-container">
            <span>Forbundet</span>
            <span>Frie</span>
            <span>Fotografer</span>
          </div>
        )}
      {activePage?.firstSlug == "varutstillingen" && (
        <div className="logo-container">
          <span>Vårutstillingen</span>
          <span>&nbsp;</span>
          <span></span>
        </div>
      )}
      {activePage?.firstSlug == "fotobokfestivalen" && (
        <div className="logo-container">
          <span>Fotobokfestivalen</span>
          <span>&nbsp;</span>
          <span></span>
        </div>
      )}
    </>
  );
}
