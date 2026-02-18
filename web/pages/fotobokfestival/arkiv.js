import Head from "next/head";
import groq from "groq";
import { client } from "@/client";
import Layout from "@/components/layout";
import Link from "next/link";

export default function FFArkiv(props) {
  console.log(props);
  return (
    <>
      <Head>
        <title>Historikk | Vårutstillingen</title>
      </Head>
      <div>
        <main>
          <h1>Historikk</h1>
          <h2>Fotobokfestivalen</h2>

          <div>
            {props.editions.map((edition) => (
              <Link
                href={`/fotobokfestival/${edition.slug.current}`}
                key={edition.slug.current}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <div>{edition?.title}</div>
                  <div>{edition?.year}</div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

FFArkiv.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps({ params }) {
  const query = groq`
    *[_type == "ffoEdition" ] | order(year desc){
      title,
      year,
      slug,
      events[]->{
        title,
        slug
      }
    }
  `;

  const editions = await client.fetch(query);

  // if (!edition) return { notFound: true };

  return {
    props: { editions: editions },
    revalidate: 60,
  };
}
