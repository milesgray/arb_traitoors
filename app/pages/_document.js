import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/img/brand/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/img/brand/apple-icon.png"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Intent&family=Merriweather&family=Graphik&family=Zen+Dots&family=Goldman&family=Squada+One&family=Oxanium"
            rel="stylesheet"
          />
        </Head>
        <body className="text-red-500 antialiased bg-zinc-900">
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
