export const menuConfig = [
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
    label: "Medlemskap",
    href: "/bli-medlem",
    slug: "bli-medlem",
  },
  {
    label: "Nyheter",
    href: "/nyheter",
    slug: "nyheter",
  },
  {
    label: "Fagpolitikk",
    href: "/fagpolitikk",
    slug: "fagpolitikk",
  },
  {
    label: "Fasiliteter",
    href: "/bibliotek",
    slug: "bibliotek",
  },
  // {
  //   label: "Leilighet",
  //   href: "/leilighet",
  //   slug: "leilighet",
  // },
  {
    label: "Stipender",
    href: "/stipender",
    slug: "stipender",
  },
  {
    label: "Arkiv",
    href: "/arkiv",
    slug: "arkiv",
    style: { marginBottom: "1rem" },
  },
  // {
  //   label: "NOFOFO",
  //   href: "/nofofo",
  //   slug: "nofofo",
  // },

  // {
  //   label: "Vårutstillingen",
  //   href: "/varutstillingen",
  //   slug: "varutstillingen",
  //   subItems: [
  //     { slug: "om", label: "Om" },
  //     // { slug: "historikk", label: "Historikk" },
  //     { slug: "soknadsinfo", label: "Søknadsinformasjon" },
  //     { slug: "arkiv", label: "Arkiv" },
  //   ],
  // },
  // {
  //   label: "Fotobokfestival Oslo",
  //   href: "/fotobokfestival",
  //   slug: "fotobokfestival",
  //   subItems: [
  //     { slug: "om", label: "Om" },
  //     { slug: "program", label: "Program" },
  //     { slug: "arkiv", label: "Arkiv" },
  //   ],
  // },
];

export const subMenuConfig = [
  // {
  //   label: "FFF",
  //   href: "/",
  //   slug: null,
  // },
  {
    label: "Vårutstillingen",
    href: "/varutstillingen",
    slug: "varutstillingen",
    subItems: [
      { slug: "om", label: "Om" },
      // { slug: "historikk", label: "Historikk" },
      { slug: "soknadsinfo", label: "Søknadsinformasjon" },
      { slug: "arkiv", label: "Arkiv" },
    ],
  },
  {
    label: "Fotobokfestival Oslo",
    href: "/fotobokfestival",
    slug: "fotobokfestival",
    subItems: [
      { slug: "om", label: "Om" },
      { slug: "program", label: "Program" },
      { slug: "arkiv", label: "Arkiv" },
    ],
  },
];
