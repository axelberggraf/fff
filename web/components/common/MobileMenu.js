import { useState } from "react";
import Link from "next/link";

export default function MobileMenu({ config, activePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="menu-backrdop"
          style={{ position: "fixed", inset: 0 }}
        ></div>
      )}
      <button
        className={`mobile-menu-button ${menuOpen ? "checked" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        Meny
      </button>
      {menuOpen && (
        <div className="mobile-menu">
          <div>
            <div className="menu-item">
              <Link href={"/"}>
                <div
                  className={`menu-title ${
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
            {config.map((item) => (
              <div
                key={item.id}
                className="menu-item"
                style={{ ...item.style }}
              >
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
            <Link
              className="link-button"
              href="http://minside.fffotografer.no/"
              target="blank"
              rel="noreferrer"
              style={{ marginTop: "1rem" }}
            >
              <div>Min Side</div>
              <div>↗</div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
