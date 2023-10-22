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
    if (event) {
      if (event?.allowlist?.includes(address)) return;
    } else {
      setLocation(`/community/${params.id}`);
    }
  }, [event]);
  return (
    <div className="w-[100vw]  p-4">
      {event.length > 0 ? (
        <div className="w-full h-[800px] flex items-center justify-center">
          <Spinner size="4rem" />
        </div>
      ) : (
        <h1>Room Enter</h1>
      )}
    </div>
  );
}

export default Room;
