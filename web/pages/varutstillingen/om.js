import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function VUInfo() {
  return (
    <>
      <Head>
        <title>Søknadsinformasjon | Vårutstillingen</title>
      </Head>
      <div>
        <main>
          <h1>Info</h1>
          <h2>Vårutstillingen</h2>
        </main>
      </div>
    </>
  );
}

VUInfo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
