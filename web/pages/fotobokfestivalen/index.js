import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function VU() {
  return (
    <>
      <Head>
        <title>Fotobokfestivalen Oslo</title>
      </Head>
      <div>
        <main>
          <h1>Fotobokfestivalen Oslo</h1>
        </main>
      </div>
    </>
  );
}

VU.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
