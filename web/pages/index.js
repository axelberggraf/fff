import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import { earl } from "@/fonts";
import FlowingFs from "@/components/flowingFs";
import { SETTINGS } from "@/lib/queries";
import NewsModule from "@/components/modules/newsModule";
import { client } from "@/client";
import groq from "groq";

export default function Home({ page, news, memberNews }) {
  console.log(memberNews);
  return (
    <>
      <Head>
        <title>FFF</title>
      </Head>
      <div>
        <main>
          <FlowingFs />
          <NewsModule news={news} memberNews={memberNews} />
          {/* <h1>Forbundet frie fotografer</h1> */}
          {page.intro && (
            <div>
              <p
                className={earl.className}
                style={{
                  fontSize: "2rem",
                  textAlign: "center",
                  padding: "0 20%",
                }}
              >
                {page.intro}
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const page = await client.fetch(
    groq`
    *[_id == "singleton-home" ][0] {
      ...
    }
  `,
  );
  const news = await client.fetch(
    groq`
    *[_type == "news" ] | order(date desc) {
      ...
    }
  `,
  );
  const memberNews = await client.fetch(
    groq`
    *[_type == "medlemsNytt" ] | order(date desc) {
      ...,
      thumbnail{
        ...,
        alt,
        crop,
        hotspot,
        asset->{
          _id,
          metadata{ dimensions, lqip }
        }
      }
    }
  `,
  );

  // if (!page) {
  //   return {
  //     notFound: true,
  //   };
  // }

  const settings = await client.fetch(groq`
    *[_id == "singleton-settings"][0]
      {
        ${SETTINGS}
      }`);

  return {
    props: {
      page,
      news,
      memberNews,
      settings,
    },
    revalidate: 60,
  };
}
