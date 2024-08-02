import React, { useEffect } from "react";
import { useAdaptRealtime } from "./store/adapt-realtime";

export function VideoStream({ title }: { title: string }) {
  const stream = useAdaptRealtime(
    (state) => state.stream,
    (left, right) => {
      return left.id === right.id;
    }
  );
  const ref = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div>
      <h1>Video Player: {title}</h1>
      <video ref={ref} playsInline autoPlay style={{ height: 500 }}></video>
    </div>
  );
}
