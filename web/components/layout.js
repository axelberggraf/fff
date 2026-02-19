import Header from "@/components/common/Header";
import SubMenu from "./common/SubMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DesktopMenu from "./common/DesktopMenu";
import useWindowSize from "@/hooks/useWindowSize";
import Logo from "./common/Logo.js";
import { menuConfig, subMenuConfig, mobileMenuConfig } from "@/lib/menuConfig";
import MobileMenu from "./common/MobileMenu";
export default function Layout({ children }) {
  const router = useRouter();
  const [activePage, setActivePage] = useState({
    firstSlug: "FFF",
    secondSlug: null,
  });
  const windowSize = useWindowSize();

  const resolveActivePage = () => {
    const pathSegments = router.asPath.split("/").filter(Boolean);
    const firstSlug = pathSegments[0];
    const secondSlug = pathSegments[1];

    return {
      firstSlug: firstSlug || null,
      secondSlug: secondSlug || null,
    };
  };

  useEffect(() => {
    setActivePage(resolveActivePage());
  }, [router.asPath]);
  return (
    <>
      <main>
        <Header />
        <Logo activePage={activePage} />
        {!windowSize.isMobile && (
          <SubMenu config={subMenuConfig} activePage={activePage} />
        )}
        <div
          style={{
            minHeight: "calc(100vh - 10rem)",
          }}
        >
          {!windowSize.isMobile && (
            <DesktopMenu config={menuConfig} activePage={activePage} />
          )}
          {windowSize.isMobile && (
            <MobileMenu config={mobileMenuConfig} activePage={activePage} />
          )}
          {children}
        </div>
        {/* <Footer settings={settings} /> */}
      </main>
    </>
  );
}
