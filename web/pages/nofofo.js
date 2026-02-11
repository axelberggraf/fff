import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function NOFOFO() {
  return (
    <>
      <Head>
        <title>NOFOFO </title>
      </Head>
      <div>
        <main>
          <h1>NOFOFO</h1>
          <h2>FFF</h2>
        </main>
      </div>
    </>
  );
}

NOFOFO.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
