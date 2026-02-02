import Header from "@/components/common/Header";
import SubMenu from "./common/SubMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DesktopMenu from "./common/DesktopMenu";
import useWindowSize from "@/hooks/useWindowSize";
import Logo from "./common/Logo.js";
const menuConfig = [
  {
    id: "om",
    label: "Om",
    href: "/om",
    slug: "om",
  },
  {
    label: "Medlemmer",
    href: "/medlemmer",
    slug: "medlemmer",
  },
  {
    id: "bli-medlem",
    label: "Bli Medlem",
    href: "/bli-medlem",
    slug: "bli-medlem",
  },
  {
    label: "Fagpolitikk",
    href: "/fagpolitikk",
    slug: "fagpolitikk",
  },
  {
    label: "Bibliotek",
    href: "/bibliotek",
    slug: "bibliotek",
  },
  {
    label: "Leilighet",
    href: "/leilighet",
    slug: "leilighet",
  },
  {
    label: "Stipender",
    href: "/stipender",
    slug: "stipender",
  },
  {
    label: "Vårutstillingen",
    href: "/varutstillingen",
    slug: "varutstillingen",
    subItems: [
      { slug: "om", label: "Om" },
      { slug: "historikk", label: "Historikk" },
      { slug: "soknadsinfo", label: "Søknadsinformasjon" },
      { slug: "arkiv", label: "Arkiv" },
    ],
  },
  {
    label: "Fotobokfestivalen",
    href: "/fotobokfestivalen",
    slug: "fotobokfestivalen",
    subItems: [
      { slug: "om", label: "Om" },
      { slug: "historikk", label: "Historikk" },
      { slug: "program", label: "Program" },
    ],
  },
];
const subMenuConfig = [
  {
    label: "FFF",
    href: "/",
    slug: null,
  },
  {
    label: "Vårutstillingen",
    href: "/varutstillingen",
    slug: "varutstillingen",
    subItems: [
      { slug: "om", label: "Om" },
      { slug: "historikk", label: "Historikk" },
      { slug: "soknadsinfo", label: "Søknadsinformasjon" },
      { slug: "arkiv", label: "Arkiv" },
    ],
  },
  {
    label: "Fotobokfestivalen",
    href: "/fotobokfestivalen",
    slug: "fotobokfestivalen",
    subItems: [
      { slug: "om", label: "Om" },
      { slug: "historikk", label: "Historikk" },
      { slug: "program", label: "Program" },
    ],
  },
];

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
          <DesktopMenu config={menuConfig} activePage={activePage} />
          {children}
        </div>
        {/* <Footer settings={settings} /> */}
      </main>
    </>
  );
}
