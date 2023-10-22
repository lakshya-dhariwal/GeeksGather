import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import {scrollSepolia} from "wagmi/chains"

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: "e7b53371d64a322ae6d669190b6e2fed",
    chains: [scrollSepolia],

    // Required
    appName: "GeeKGather",
    appDescription: "ZK and AI proven Community",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <WagmiConfig config={config}>
    <ConnectKitProvider
      theme="nouns"
      customTheme={{
        "--ck-accent-color": "#58ADF7",
        "--ck-accent-text-color": "#ffffff",
        "--ck-border-radius": 42,
      }}
    >
      <App />
    </ConnectKitProvider>
  </WagmiConfig>

  // </React.StrictMode>
);
