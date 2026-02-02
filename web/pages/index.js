import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import { earl } from "@/fonts";
import FlowingFs from "@/components/flowingFs";
export default function Home() {
  return (
    <>
      <Head>
        <title>FFF</title>
      </Head>
      <div>
        <main>
          <FlowingFs />
          <h1>Forbundet frie fotografer</h1>
          <div>
            <p className={earl.className} style={{ fontSize: "3rem" }}>
              FFF er fagorganisasjonen for fotografer og kamerabaserte
              kunstnere, etablert i 1974 for å fremme kunstfotografiet i Norge.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
