import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function BliMedlem() {
  return (
    <>
      <Head>
        <title>Bli Medlem | FFF</title>
      </Head>
      <div>
        <main>
          <h1>Bli Medlem</h1>
          <h2>FFF</h2>
        </main>
      </div>
    </>
  );
}

BliMedlem.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
