import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function VUArkiv() {
  return (
    <>
      <Head>
        <title>Arkiv | Vårutstillingen</title>
      </Head>
      <div>
        <main>
          <h1>Arkiv</h1>
          <h2>Vårutstillingen</h2>
        </main>
      </div>
    </>
  );
}

VUArkiv.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
