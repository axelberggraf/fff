import Head from "next/head";
import Layout from "@/components/layout";
import { serializer } from "@/lib/serializer";
import { SETTINGS, TEXTBLOCK } from "@/lib/queries";
import { client } from "@/client";
import groq from "groq";
import { PortableText } from "@portabletext/react";

export default function Leilighet({ page, settings }) {
  return (
    <>
      <Head>
        <title>Leilighet | FFF</title>
      </Head>
      <div className="template-page">
        <h1>{page.title}</h1>
        <div className="rich-text">
          <PortableText value={page.content} components={serializer} />
          <iframe
            src="https://calendar.google.com/calendar/embed?src=fffotografer.no_dtb4f05i5ob3psg4gu1u5fiiqs%40group.calendar.google.com&amp;ctz=Europe%2FOslo"
            style={{ width: "100%", aspectRatio: "800 / 600" }}
            // width="800"
            // height="600"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </>
  );
}

Leilighet.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const page = await client.fetch(
    groq`
    *[_id == "leilighet" ][0] {
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
