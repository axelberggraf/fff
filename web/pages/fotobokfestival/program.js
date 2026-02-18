import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function FFOProgram() {
  return (
    <>
      <Head>
        <title>Program | Vårutstillingen</title>
      </Head>
      <div>
        <main>
          <h1>Program</h1>
          <h2>Fotobokfestivalen</h2>
        </main>
      </div>
    </>
  );
}

FFOProgram.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
