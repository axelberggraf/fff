import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function VUSoknadsinfo() {
  return (
    <>
      <Head>
        <title>Søknadsinformasjon | Vårutstillingen</title>
      </Head>
      <div>
        <main>
          <h1>Søknadsinformasjon</h1>
          <h2>Vårutstillingen</h2>
        </main>
      </div>
    </>
  );
}

VUSoknadsinfo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
