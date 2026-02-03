import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function Arkiv() {
  return (
    <>
      <Head>
        <title>Arkiv | FFF</title>
      </Head>
      <div>
        <main>
          <h1>Arkiv</h1>
        </main>
      </div>
    </>
  );
}

Arkiv.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
