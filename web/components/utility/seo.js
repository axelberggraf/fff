import Head from "next/head";

export default function Seo({ meta, globalMeta }) {
  const fallbackMeta = {
    ogTitle: "Smuss Type Kiosk",
    ogDescription:
      "Smuss Type Kiosk is a collaborative platform dedicated to exploring alphabets, letterforms, and typographic ideas. Our typefaces are the results of new ideas and investigations from former projects. ",
  };
  return (
    <>
      {/* Favicon */}
      <link
        rel="icon"
        type="image/png"
        href="/favicon/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <meta name="apple-mobile-web-app-title" content="MyWebSite" />
      <link rel="manifest" href="/favicon/site.webmanifest" />

      <meta property="og:type" content="website" />
      {/* OG */}
      <meta
        property="og:title"
        content={meta?.ogTitle || globalMeta?.ogTitle || fallbackMeta.ogTitle}
      />

      <meta
        name="description"
        content={
          meta?.ogDescription ||
          globalMeta?.ogDescription ||
          fallbackMeta.ogDescription
        }
      />
      <meta
        property="og:image"
        content={
          meta?.ogImage?.asset?.url ||
          globalMeta?.ogImage?.asset?.url ||
          fallbackMeta?.ogImage?.asset?.url
        }
      />
      <meta
        property="og:image:secure_url"
        content={
          meta?.ogImage?.asset?.url ||
          globalMeta?.ogImage?.asset?.url ||
          fallbackMeta?.ogImage?.asset?.url
        }
      />
      <meta
        property="og:description"
        content={
          meta?.ogDescription ||
          globalMeta?.ogDescription ||
          fallbackMeta?.ogDescription
        }
      />
      <meta property="og:image:type" content="image/jpeg" />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:title"
        content={meta?.ogTitle || globalMeta?.ogTitle || fallbackMeta?.ogTitle}
      />
      <meta
        property="twitter:description"
        content={
          meta?.ogDescription ||
          globalMeta?.ogDescription ||
          fallbackMeta?.ogDescription
        }
      />
      <meta
        property="twitter:image"
        content={
          meta?.ogImage?.asset.url ||
          globalMeta?.ogImage?.asset.url ||
          fallbackMeta?.ogImage?.asset.url
        }
      />
    </>
  );
}
