import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import useLocation from "wouter/use-location";
import EventCard from "../components/EventCard";
import Spinner from "../components/Spinner";
import supabase from "../services/supabase";

function Home() {
  const [Events, setEvents] = React.useState([]);
  const { address, isConnected } = useAccount();
  const fetchEvents = async () => {
    const { data, error } = await supabase.from("Events").select("*");
    console.log(error);
    setEvents(data);
  };
  const [location, setLocation] = useLocation();
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      <main>
        <article>
          <section className="section hero" aria-label="home">
            <div className="container">
              <h1 className="headline-lg hero-title">
                {" "}
                <img
                  src="geeks-gather-large.png"
                  alt=""
                  className=" = mx-auto sm:visible"
                />{" "}
              </h1>

              <p className="section-text body-lg text-white">
                Gated Communities with verified enthusiasts
              </p>

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
              {!Events.length > 0 ? (
                <div className="w-full h-[800px] flex items-center justify-center">
                  <Spinner size="4rem" />
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-10">
                  {Events.map((event) => {
                    return (
                      <EventCard
                        event={event}
                        buttonOnClick={() => {
                          setLocation(`/community/${event.id}`);
                        }}
                        buttonText={"Join the Cult"}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </section>
          {address && (
            <section>
              <div className="container">
                <h2
                  className="headline-md section-title text-center"
                  id="discover-label"
                >
                  GG says GM!
                </h2>
                {!Events.length > 0 ? (
                  <div className="w-full h-[800px] flex items-center justify-center">
                    <Spinner size="4rem" />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-10">
                    {Events.map((event) => {
                      if (event.allowlist.includes(address)) {
                        return (
                          <EventCard
                            event={event}
                            buttonOnClick={() => {
                              setLocation(`/community/${event.id}/room`);
                            }}
                            buttonText={"Join the room"}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </section>
          )}
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
