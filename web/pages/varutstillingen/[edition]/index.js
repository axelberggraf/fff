import groq from "groq";
import { client } from "@/client";
import Layout from "@/components/layout";
import Link from "next/link";

export default function EditionPage({ edition }) {
  if (!edition) return null;

  return (
    <main>
      <h1>{edition.title || edition.year}</h1>
      <h3>Events</h3>
      <ul>
        {edition.events?.map((event) => (
          <li key={event.slug?.current}>
            <Link
              href={`/varutstillingen/${edition.slug?.current}/${event.slug?.current}`}
            >
              {event.title}
            </Link>
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
  const editions = await client.fetch(groq`
    *[_type == "vuEdition" && defined(slug.current)]{
      "edition": slug.current
    }
  `);

  return {
    paths: editions.map((ed) => ({ params: { edition: ed.edition } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const edition = await client.fetch(
    groq`
      *[_type == "vuEdition" && archived == true && slug.current == $edition][0]{
        title,
        slug,
        year,
        events[]->{
          title,
          slug
        }
      }
    `,
    { edition: params.edition },
  );

  if (!edition) return { notFound: true, revalidate: 60 };

  return { props: { edition }, revalidate: 60 };
}
