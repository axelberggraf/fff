import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function Medlemmer() {
  return (
    <>
      <Head>
        <title>Medlemmer | FFF</title>
      </Head>
      <div>
        <main>
          <h1>Medlemmer</h1>
          <h2>FFF</h2>
        </main>
      </div>
    </>
  );
}

Medlemmer.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
