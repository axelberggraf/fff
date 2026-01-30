import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function FFOHistorikk() {
  return (
    <>
      <Head>
        <title>Historikk | Vårutstillingen</title>
      </Head>
      <div>
        <main>
          <h1>Historikk</h1>
          <h2>Fotobokfestivalen</h2>
        </main>
      </div>
    </>
  );
}

FFOHistorikk.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
