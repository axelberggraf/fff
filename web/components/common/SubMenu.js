import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SubMenu({ config, activePage }) {
  return (
    <div className="sub-menu">
      {config.map((item) => (
        <div key={item.id} className="sub-menu-item">
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
                        activePage.secondSlug === subItem.slug ? "checked" : ""
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
  );
}
