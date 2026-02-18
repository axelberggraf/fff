import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SubMenu({ config, activePage }) {
  return (
    <div className="sub-menu">
      <div className="sub-menu-row">
        <div className="sub-menu-item">
          <Link href={"/"}>
            <div
              className={`sub-menu-title ${
                activePage.firstSlug != "varutstillingen" &&
                activePage.firstSlug != "fotobokfestival"
                  ? "checked"
                  : ""
              }`}
            >
              FFF
            </div>
          </Link>
        </div>
        <Link
          className="link-button"
          href="http://minside.fffotografer.no/"
          target="blank"
          rel="noreferrer"
        >
          <div>Min Side / Søknadsportal</div>
          <div>↗</div>
        </Link>
      </div>
      <div className="sub-menu-row">
        {config.map((item) => (
          <div key={item.slug} className="sub-menu-item">
            <Link href={item.href}>
              <div
                className={`sub-menu-title ${
                  activePage.firstSlug === item.slug ? "checked" : ""
                }`}
              >
                {item.label}
              </div>
            </Link>

            {/* Render sub-items if they exist and this section is active */}
            {item.subItems && activePage.firstSlug === item.slug && (
              <ul>
                {item.subItems.map((subItem) => (
                  <li key={subItem.slug}>
                    <Link href={`${item.href}/${subItem.slug}`}>
                      <div
                        className={`sub-menu-title ${
                          activePage.secondSlug === subItem.slug
                            ? "checked"
                            : ""
                        }`}
                      >
                        {subItem.label}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
