import React, { useEffect } from "react";
import Spinner from "../components/Spinner";
import { Link, Route, useRouter } from "wouter";
import supabase from "../services/supabase";
import EventCard from "../components/EventCard";
import { useAccount } from "wagmi";
import useLocation from "wouter/use-location";

function Home() {
  const [Communities, setCommunities] = React.useState([]);
  const { address, isConnected } = useAccount();
  const fetchCommunities = async () => {
    const { data, error } = await supabase.from("Communities").select("*");
    console.log(error);
    setCommunities(data);
  };
  const [location, setLocation] = useLocation();
  useEffect(() => {
    fetchCommunities();
  }, []);
  return (
    <>
      <main>
        <article>
          <section className="section hero" aria-label="home">
            <div className="container">
              <h1 className="headline-lg hero-title">Geeks gather</h1>

              <p className="section-text body-lg">Gated communities</p>

              <a href="#" className="btn">
                Show Communities
              </a>
            </div>
          </section>

          <section
            className="section discover"
            aria-labelledby="discover-label"
          >
            <div className="container">
              <h2
                className="headline-md section-title text-center"
                id="discover-label"
              >
                Discover Communities
              </h2>
              {!Communities ? (
                <div className="w-full h-[800px] flex items-center justify-center">
                  <Spinner size="4rem" />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-10">
                  {Communities.map((event) => {
                    if (isConnected) {
                      if (
                        event.allowlist.includes(address) ||
                        event.host === address ||
                        event.applicants.includes(address)
                      ) {
                        return null;
                      }
                    }
                    return (
                      <EventCard
                        event={event}
                        buttonOnClick={() => {
                          setLocation(`/event/${event.id}`);
                        }}
                        buttonText={"Apply to attend"}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </article>
      </main>

      <a
        href="#top"
        className="back-to-top btn-icon"
        aria-label="back to top"
        data-back-top-btn
      >
        <ion-icon name="arrow-up" aria-hidden="true"></ion-icon>
      </a>
    </>
  );
}

export default Home;
