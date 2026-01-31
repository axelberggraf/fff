import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function Stipender() {
  return (
    <>
      <Head>
        <title>Stipender | FFF</title>
      </Head>
      <div>
        <main>
          <h1>Stipender</h1>
          <h2>FFF</h2>
        </main>
      </div>
    </>
  );
}

Stipender.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
