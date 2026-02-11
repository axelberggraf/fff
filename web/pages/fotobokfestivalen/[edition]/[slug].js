import groq from "groq";
import { client } from "@/client";
import Layout from "@/components/layout";
export default function EventPage({ edition, event }) {
  if (!edition || !event) return null;

  return (
    <main>
      <p>{edition.title}</p>
      <h1>{event.title}</h1>
      {/* Render event content */}
    </main>
  );
}

EventPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
  const query = groq`
    *[_type == "ffoEdition" && defined(slug.current)]{
      "edition": slug.current,
      "eventSlugs": events[]->slug.current
    }
  `;

  const editions = await client.fetch(query);

  const paths = editions.flatMap((ed) =>
    (ed.eventSlugs || []).filter(Boolean).map((eventSlug) => ({
      params: { edition: ed.edition, slug: eventSlug },
    })),
  );

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { edition, slug } = params;

  const query = groq`
    *[_type == "ffoEdition" && slug.current == $edition][0]{
      _id,
      title,
      slug,
      "event": events[@->slug.current == $slug][0]->{
        _id,
        title,
        slug,
        // add event fields you need:
        // body,
        // date,
        // ...
      }
    }
  `;

  const data = await client.fetch(query, { edition, slug });

  if (!data?._id || !data?.event?._id) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: {
      edition: { title: data.title, slug: data.slug },
      event: data.event,
    },
    revalidate: 60,
  };
}
