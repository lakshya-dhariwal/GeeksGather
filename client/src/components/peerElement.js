import { useHuddleStore } from "@huddle01/huddle01-client/store";
import React, { useCallback, useEffect, useRef } from "react";



const PeerVideoAudioElem = ({ peerIdAtIndex }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const peerCamTrack = useHuddleStore(
    useCallback(
      (state) => state.peers[peerIdAtIndex]?.consumers?.cam,
      [peerIdAtIndex]
    )
  )?.track;

  const peerMicTrack = useHuddleStore(
    useCallback(
      (state) => state.peers[peerIdAtIndex]?.consumers?.mic,
      [peerIdAtIndex]
    )
  )?.track;

  const getStream = (_track) => {
    const stream = new MediaStream();
    stream.addTrack(_track);
    return stream;
  };

  useEffect(() => {
    const videoObj = videoRef.current;

    if (videoObj && peerCamTrack) {
      videoObj.load();
      videoObj.srcObject = getStream(peerCamTrack);
      videoObj.play().catch((err) => {
        console.log({
          message: "Error playing video",
          meta: {
            err,
          },
        });
      });
    }

    return () => {
      if (videoObj) {
        videoObj?.pause();
        videoObj.srcObject = null;
      }
    };
  }, [peerCamTrack]);

  useEffect(() => {
    if (peerMicTrack && audioRef.current) {
      audioRef.current.srcObject = getStream(peerMicTrack);
    }
  }, [peerMicTrack]);

  return (
    <div className="mx-1 h-[176px] w-[306px] flex items-center border-2 rounded bg-grey border-main">
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        className="w-[306px] h-[176px]"
      />
      <audio ref={audioRef} autoPlay playsInline controls={false}></audio>
    </div>
  );
};

export default React.memo(PeerVideoAudioElem);