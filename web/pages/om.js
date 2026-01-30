import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function Om() {
  return (
    <>
      <Head>
        <title>Om | FFF</title>
      </Head>
      <div>
        <main>
          <h1>Om</h1>
          <h2>FFF</h2>
        </main>
      </div>
    </>
  );
}

Om.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
