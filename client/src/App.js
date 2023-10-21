import { filecoinHyperspace } from "wagmi/chains";
import { ConnectKitProvider, ConnectKitButton } from "connectkit";
import { publicProvider } from "wagmi/providers/public";
import { Link, Route } from "wouter";
import Home from "./pages/index";
import Navbar from "./components/Nav";
import Community from "./pages/Community";
import Dashboard from "./pages/dashboard";
import Host from "./pages/host";
import { useAccount } from "wagmi";
import { Toaster } from "react-hot-toast";
import Quiz from "./pages/quiz";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function App() {
  const { address } = useAccount();
  return (
    <div className="dark">
      {" "}
      <WagmiConfig client={client}>
        <ConnectKitProvider
          theme="nouns"
          customTheme={{
            "--ck-accent-color": "#58ADF7",
            "--ck-accent-text-color": "#ffffff",
            "--ck-border-radius": 42,
          }}
        >
          <Toaster />
          <Navbar connect={<ConnectKitButton />} />
          <div className="mt-[60px]">
            <Route path="/">
              <Home />
            </Route>
            {address && (
              <>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/host">
                  <Host />
                </Route>
                <Route path="/community/:id">
                  <Community />
                </Route>
                <Route path="/community/:id/quiz">
                  <Quiz />
                </Route>
              </>
            )}

            {/* <Route path="/community/:id/room">
              <Community />
            </Route> */}
          </div>
        </ConnectKitProvider>
      </WagmiConfig>
      <div className="body-bg-shape"></div>
    </div>
  );
}

export default App;
