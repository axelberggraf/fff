import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function VU() {
  return (
    <>
      <Head>
        <title>Vårutstillingen</title>
      </Head>
      <div>
        <main>
          <h1>Vårutstillingen</h1>
        </main>
      </div>
    </>
  );
}

VU.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
