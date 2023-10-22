import React, { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import Spinner from "../components/Spinner";
import supabase from "../services/supabase";
import { useAccount } from "wagmi";
 

function Room() {
  const [location, setLocation] = useLocation();
  const [event, setEvent] = React.useState([]);
  const { address } = useAccount();
  const [match, params] = useRoute("/community/:id/room");

  const fetchEvent = async () => {
    const { data, error } = await supabase
      .from("Events")
      .select("*")
      .eq("id", params.id);
    console.log({ error, data });
    setEvent(data?.[0]);
  };
  useEffect(() => {
    fetchEvent();
  }, []);
  useEffect(() => {
    //todo  allowlist check
    if (event) {
      if (event?.allowlist?.includes(address)) return;
    } else {
      setLocation(`/community/${params.id}`);
    }
  }, [event]);
  return (
    <div className=" mx-auto mt-[5rem]  p-4">
      {event.length > 0 ? (
        <div className="w-full h-[800px] flex items-center justify-center">
          <Spinner size="4rem" />
        </div>
      ) : (
        <div className="">
          <h1 className="text-[3rem] text-white">{event?.name}'s Community</h1>
          <div className="h-[60vh]">
            {/* <ChatUIProvider theme={darkChatTheme}>
              <ChatViewComponent
                chatId="b8e068e02fe12d7136bc2f24408835573f30c6fbf0b65ea26ab4c7055a2c85f1"
                limit={10}
                isConnected={true}
              />
            </ChatUIProvider> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
