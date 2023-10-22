
import { Link, Route } from "wouter";
import {scrollSepolia} from 'wagmi/chains'
import Home from "./pages/index";
import Navbar from "./components/Nav";
import Community from "./pages/Community";
import Dashboard from "./pages/dashboard";
import Host from "./pages/host";
import { Toaster } from "react-hot-toast";
import Quiz from "./pages/quiz";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import Room from "./pages/Room";



function App() {
  const { address } = useAccount();
  return (
    <div className="dark">
      {" "}
     
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
                <Route path="/community/:id/room">
                  <Room />
                </Route>
              </>
            )}

            {/* <Route path="/community/:id/room">
              <Community />
            </Route> */}
          </div>
       
      <div className="body-bg-shape"></div>
    </div>
  );
}

export default App;
