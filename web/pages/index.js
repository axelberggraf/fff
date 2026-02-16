import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import { earl } from "@/fonts";
import { SETTINGS } from "@/lib/queries";
import { client } from "@/client";
import groq from "groq";

import FlowingFs from "@/components/flowingFs";
import NewsModule from "@/components/modules/newsModule";
import EventsModule from "@/components/modules/eventsModule";

export default function Home({ page, news, memberNews, events }) {
  console.log(events);
  return (
    <>
      <Head>
        <title>FFF</title>
      </Head>
      <div>
        <main>
          <FlowingFs />
          <NewsModule
            news={page.pinnedNews}
            recentNews={page.recentNews}
            memberNews={memberNews}
          />
          <EventsModule events={events} />
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
    *[_id == "singleton-home"][0] {
      ...,
      "pinnedNews": news[]->{
        ...
      },
      "recentNews": *[_type == "news" && !(_id in ^.news[]._ref)] 
        | order(date desc) [0..6] {
        ...
      }
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
  const events = await client.fetch(
    groq`
    *[_type == "event" && archived != true] | order(date desc) {
  ...,
    slug,
    thumbnail{
      ...,
      alt,
      crop,
      hotspot,
      asset->{
        _id,
        metadata{ dimensions, lqip }
      }
    },
    "parent": select(
      eventType == "ffo" => *[_type == "ffoEdition" && references(^._id)][0]{slug},
      eventType == "vu"  => *[_type == "vuEdition"  && references(^._id)][0]{slug},
      null
    )
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
      events,
    },
    revalidate: 60,
  };
}
