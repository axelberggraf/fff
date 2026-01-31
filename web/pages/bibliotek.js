import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function Bibliotek() {
  return (
    <>
      <Head>
        <title>Bibliotek | FFF</title>
      </Head>
      <div>
        <main>
          <h1>Bibliotek</h1>
          <h2>FFF</h2>
        </main>
      </div>
    </>
  );
}

Bibliotek.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
