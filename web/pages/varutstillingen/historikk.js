import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function VUHistorikk() {
  return (
    <>
      <Head>
        <title>Historikk | Vårutstillingen</title>
      </Head>
      <div>
        <main>
          <h1>Historikk</h1>
          <h2>Vårutstillingen</h2>
        </main>
      </div>
    </>
  );
}

VUHistorikk.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
