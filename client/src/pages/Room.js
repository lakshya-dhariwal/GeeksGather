import React, { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import Spinner from "../components/Spinner";
import supabase from "../services/supabase";
import { useAccount } from "wagmi";
import {
  ChatUIProvider,
  ChatViewComponent,
  darkChatTheme,
} from "@pushprotocol/uiweb";
import axios from "axios";
import QRCode from "qrcode";


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
  const [base64, setBase64] = useState(null);
  const handleQR = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/age/generate-proof?age=20"
      );
      const img = await QRCode.toDataURL(JSON.stringify(response.data));
      console.log(img);
      setBase64(img);
    } catch (err) {}
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
    <div className=" mx-auto mt-[5rem] max-w-[1500px]  p-4">
      {event.length > 0 ? (
        <div className="w-full h-[800px] flex items-center justify-center">
          <Spinner size="4rem" />
        </div>
      ) : (
        <div className="">
          <div className="flex">
            <h1 className="text-[3rem] text-white">
              {event?.name}'s Community
            </h1>
          </div>

          <div className="h-[60vh]">
            {/* <ChatUIProvider theme={darkChatTheme}>
              <ChatViewComponent
                chatId="b8e068e02fe12d7136bc2f24408835573f30c6fbf0b65ea26ab4c7055a2c85f1"
                limit={10}
                isConnected={true}
              />
            </ChatUIProvider> */}
          </div>
          <div className="flex flex-col w-[300px] mx-auto">
            <button
              onClick={handleQR}
              className={
                "px-4 py-2 text-white rounded-lg font-bold bg-[#CA599B] mt-5 mb-2"
              }
            >
              Generate Proof of Community
            </button>

            {base64 && <img src={base64} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
