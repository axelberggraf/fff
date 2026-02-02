import "@/styles/main.scss";
// import localFont from "next/font/local";
import { bureau } from "@/fonts";

// const bureau = localFont({
//   src: [
//     {
//       path: "../public/fonts/STKBureauSans-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//   ],
//   // variable: "--bureau",
//   fallback: ["sans-serif"],
// });

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <div className={bureau.className}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
