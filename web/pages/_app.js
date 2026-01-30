import "@/styles/main.scss";
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return <div>{getLayout(<Component {...pageProps} />)}</div>;
}
