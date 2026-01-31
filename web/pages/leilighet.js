import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function Leilighet() {
  return (
    <>
      <Head>
        <title>Leilighet | FFF</title>
      </Head>
      <div>
        <main>
          <h1>Leilighet</h1>
          <h2>FFF</h2>
        </main>
      </div>
    </>
  );
}

Leilighet.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
