import Header from "@/components/common/Header";
import SubMenu from "./common/SubMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DesktopMenu from "./common/DesktopMenu";

const menuConfig = [
  {
    id: "Om",
    label: "Om",
    href: "/om",
    slug: "om", // null means it's the home/default page
  },
  {
    id: "Medlemmer",
    label: "Medlemmer",
    href: "/medlemmer",
    slug: "medlemmer", // null means it's the home/default page
  },
  {
    id: "BliMedlem",
    label: "Bli Medlem",
    href: "/bli-medlem",
    slug: "bli-medlem", // null means it's the home/default page
  },
  {
    id: "Fagpolitikk",
    label: "Fagpolitikk",
    href: "/fagpolitikk",
    slug: "fagpolitikk", // null means it's the home/default page
  },
  {
    id: "Bibliotek",
    label: "Bibliotek",
    href: "/bibliotek",
    slug: "bibliotek", // null means it's the home/default page
  },
  {
    id: "Leilighet",
    label: "Leilighet",
    href: "/leilighet",
    slug: "leilighet", // null means it's the home/default page
  },
  {
    id: "Stipender",
    label: "Stipender",
    href: "/stipender",
    slug: "stipender", // null means it's the home/default page
  },
  {
    id: "VU",
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
    id: "FFO",
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
    id: "FFF",
    label: "FFF",
    href: "/",
    slug: null, // null means it's the home/default page
  },
  {
    id: "VU",
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
    id: "FFO",
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

  const resolveActivePage = () => {
    const pathSegments = router.asPath.split("/").filter(Boolean);
    const firstSlug = pathSegments[0];
    const secondSlug = pathSegments[1];

    // Find matching menu item
    const menuItem = subMenuConfig.find((item) => item.slug === firstSlug);

    return {
      firstSlug: menuItem ? menuItem.id : "FFF",
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
        <SubMenu config={subMenuConfig} activePage={activePage} />
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
