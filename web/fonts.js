import localFont from "next/font/local";

export const bureau = localFont({
  src: [
    {
      path: "public/fonts/STKBureauSans-Medium.woff2",
      // path: "public/fonts/STKEarl-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--bureau",
  fallback: ["sans-serif"],
});

export const earl = localFont({
  src: [
    {
      path: "public/fonts/STKEarl-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--earl",
  fallback: ["serif"],
});

export const earlMono = localFont({
  src: [
    {
      path: "public/fonts/STKEarlMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--earl-mono",
  fallback: ["mono"],
});
