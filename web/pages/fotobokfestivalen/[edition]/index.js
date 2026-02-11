import groq from "groq";
import { client } from "@/client";
import Layout from "@/components/layout";

export default function EditionPage({ edition }) {
  return (
    <main>
      <h1>{edition.title}</h1>

      <ul>
        {edition.events?.map((event) => (
          <li key={event.slug?.current}>
            <a
              href={`/fotobokfestivalen/${edition.slug?.current}/${event.slug?.current}`}
            >
              {event.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

EditionPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
  const query = groq`
    *[_type == "ffoEdition" && defined(slug.current)]{
      "slug": slug.current
    }
  `;

  const editions = await client.fetch(query);

  return {
    paths: editions.map((ed) => ({
      params: { edition: ed.slug },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const query = groq`
    *[_type == "ffoEdition" && slug.current == $edition][0]{
      title,
      slug,
      events[]->{
        title,
        slug
      }
    }
  `;

  const edition = await client.fetch(query, {
    edition: params.edition,
  });

  if (!edition) return { notFound: true };

  return {
    props: { edition },
    revalidate: 60,
  };
}
