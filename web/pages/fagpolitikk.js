import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function Fagpolitikk() {
  return (
    <>
      <Head>
        <title>Fagpolitikk | FFF</title>
      </Head>
      <div>
        <main>
          <h1>Fagpolitikk</h1>
          <h2>FFF</h2>
        </main>
      </div>
    </>
  );
}

Fagpolitikk.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
