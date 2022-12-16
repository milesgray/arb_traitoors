import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon.png" />
          <link rel="shortcut icon" type="image/png" href="/static/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon.ico" />
          <link rel="manifest" href="/static/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicon.ico" color="#FBFBFB" />

          <link
            href="https://fonts.googleapis.com/css2?family=Gidugu&family=Merriweather&family=Graphik&family=Arsenal&family=Goldman&family=Intent&family=Oxanium"
            rel="stylesheet"
          />

          <meta name="msapplication-TileColor" content="#FBFBFB" />
          <meta name="theme-color" content="#FBFBFB" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FBFBFB" />
          <meta charSet="utf-8" />
          <meta property="og:type" content="website" />

          {/* Essential for socials */}
          <meta property="og:title" content="Geo Genesis" />
          <meta
            name="description"
            content="Arbitrum native NFT project minting now."
          />
          <meta
            property="og:description"
            content="Arbitrum native NFT project minting now."
          />
          <meta property="og:image" content="https://vwww.geobrowser.io/static/geo-social-image.png" />

          {/* Less essential */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:site_name" content="traitoors.on.fleek.co" />
          <meta name="twitter:site" content="@arbitraitoors" />
          <meta name="twitter:creator" content="@arbitraitoors" />
          <meta name="twitter:image" content="https://traitoors.on.fleek.co/static/geo-social-image.png" />

          {/* Less essential */}
          <meta property="og:site_name" content="traitoors.on.fleek.co" />
          <meta name="twitter:site" content="@arbitraitoors" />
          <meta name="twitter:creator" content="@arbitraitoors" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </Head>
        <body className="text-slate-300 antialiased bg-black">
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
