import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";

export default function FFOInfo() {
  return (
    <>
      <Head>
        <title>Søknadsinformasjon | Fotobokfestivalen</title>
      </Head>
      <div>
        <main>
          <h1>Info</h1>
          <h2>Fotobokfestivalen</h2>
        </main>
      </div>
    </>
  );
}

FFOInfo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
