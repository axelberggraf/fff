import Head from "next/head";
import Layout from "@/components/layout";

export default function Nyheter() {
  return (
    <>
      <Head>
        <title>Nyheter | FFF</title>
      </Head>
      <div>
        <main>
          <h1>Nyheter</h1>
        </main>
      </div>
    </>
  );
}

Nyheter.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
