import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";
import { client } from "@/client";
import groq from "groq";
import { SETTINGS, TEXTBLOCK } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { serializer } from "@/lib/serializer";
export default function VUInfo({ page }) {
  return (
    <>
      <Head>
        <title>Om | Vårutstillingen</title>
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

VUInfo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const page = await client.fetch(
    groq`
    *[_id == "om-vu" ][0] {
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
