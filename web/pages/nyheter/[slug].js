import Layout from "@/components/layout";
import { client } from "@/client";
import groq from "groq";
import { SETTINGS, TEXTBLOCK } from "@/lib/queries";
import Head from "next/head";
import { PortableText } from "@portabletext/react";
import { serializer } from "@/lib/serializer";

export default function Nyhet({ page, settings }) {
  console.log(page);
  return (
    <>
      <Head></Head>
      <div className="news-page">
        <h1>{page.title}</h1>
        <div className="rich-text">
          <PortableText value={page.content} components={serializer} />
        </div>
      </div>
    </>
  );
}

Nyhet.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths = async () => {
  const data = await client.fetch(groq`
    *[_type == "news"][].slug.current
   `);
  return {
    paths: data.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export async function getStaticProps({ params }) {
  const page = await client.fetch(
    groq`
    *[_type == "news" && slug.current == $slug ][0] {
      title,
      content[]{
        ${TEXTBLOCK}
      }
    }
  `,
    {
      slug: params.slug,
    },
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
