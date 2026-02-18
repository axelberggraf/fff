import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";
import { client } from "@/client";
import groq from "groq";
import { TEXTBLOCK, SETTINGS } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { serializer } from "@/lib/serializer";

export default function FFOInfo({ page }) {
  return (
    <>
      <Head>
        <title>Om |Fotobokfestival Oslo</title>
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

FFOInfo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const page = await client.fetch(
    groq`
    *[_id == "ffo-om" ][0] {
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
