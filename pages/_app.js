import React from "react";
import "../styles.css";
import "./styles/global_styles.sass";
import "./styles/components/card.module.sass";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;
