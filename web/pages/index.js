import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>FFF</title>
      </Head>
      <div>
        <main>
          <h1>Forbundet frie fotografer</h1>
        </main>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
