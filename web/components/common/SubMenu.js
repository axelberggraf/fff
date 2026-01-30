import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Configuration for menu structure

export default function SubMenu({ config, activePage }) {
  const router = useRouter();
  // const [activePage, setActivePage] = useState({
  //   firstSlug: "FFF",
  //   secondSlug: null,
  // });

  // const resolveActivePage = () => {
  //   const pathSegments = router.asPath.split("/").filter(Boolean);
  //   const firstSlug = pathSegments[0];
  //   const secondSlug = pathSegments[1];

  //   // Find matching menu item
  //   const menuItem = menuConfig.find((item) => item.slug === firstSlug);

  //   return {
  //     firstSlug: menuItem ? menuItem.id : "FFF",
  //     secondSlug: secondSlug || null,
  //   };
  // };

  // useEffect(() => {
  //   setActivePage(resolveActivePage());
  // }, [router.asPath]);

  return (
    <div className="sub-menu">
      {config.map((item) => (
        <div key={item.id} className="sub-menu-item">
          <Link href={item.href}>
            <div
              className={`sub-menu-title ${
                activePage.firstSlug === item.id ? "checked" : ""
              }`}
            >
              {item.label}
            </div>
          </Link>

          {/* Render sub-items if they exist and this section is active */}
          {item.subItems && activePage.firstSlug === item.id && (
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
