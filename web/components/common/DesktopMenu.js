import { useState } from "react";
import Link from "next/link";

export default function DesktopMenu({ config, activePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("active", activePage);
  return (
    <>
      <button
        className={`menu-button ${menuOpen ? "checked" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        Meny
      </button>
      {menuOpen && (
        <div className="menu">
          <div>
            {config.map((item) => (
              <div key={item.id} className="menu-item">
                <Link href={item.href}>
                  <div
                    className={`menu-title ${
                      activePage.firstSlug === item.slug ? "checked" : ""
                    }`}
                  >
                    {item.label}
                  </div>
                </Link>

                {/* Render sub-items if they exist and this section is active */}
                {item.subItems && activePage.firstSlug === item.slug && (
                  <ul style={{ marginLeft: "1em" }}>
                    {item.subItems.map((subItem) => (
                      <li key={subItem.slug}>
                        <Link href={`${item.href}/${subItem.slug}`}>
                          <div
                            className={`menu-title ${
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
      )}
    </>
  );
}
