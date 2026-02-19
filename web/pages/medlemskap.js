import Head from "next/head";
import Layout from "@/components/layout";
import { serializer } from "@/lib/serializer";
import { SETTINGS, TEXTBLOCK } from "@/lib/queries";
import { client } from "@/client";
import groq from "groq";
import { PortableText } from "@portabletext/react";

export default function Medlemskap({ page, settings }) {
  return (
    <>
      <Head>
        <title>Medlemskap | FFF</title>
      </Head>
      <div className="template-page">
        <h1>{page.title}</h1>
        <div className="rich-text">
          <PortableText value={page.content} components={serializer} />
        </div>
      </div>
    </>
  );
}

Medlemskap.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const page = await client.fetch(
    groq`
    *[_id == "medlemskap" ][0] {
      title,
      content[]{
        ${TEXTBLOCK}
      }
    }
  `,
  );

  if (!page) {
    return {
      notFound: true,
    };
  }

  const settings = await client.fetch(groq`
    *[_id == "singleton-settings"][0]
      {
        ${SETTINGS}
      }`);

  return {
    props: {
      page,
      settings,
    },
    revalidate: 60,
  };
}
