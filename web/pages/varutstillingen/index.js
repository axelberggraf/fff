import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout";
import DisplacedImage from "@/components/DisplacedImage";
export default function VU() {
  return (
    <>
      <Head>
        <title>Vårutstillingen</title>
      </Head>
      <div>
        <main>
          <h1>Vårutstillingen</h1>
          <DisplacedImage src="/images/asdf.jpg" width={1200} height={600} />
        </main>
      </div>
    </>
  );
}

VU.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
