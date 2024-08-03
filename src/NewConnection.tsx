import React, { useEffect } from "react";
import { TConfig, useRealtime } from "./useRealtime";

type TConnectionProps = {
  config: TConfig;
};

export function NewConnection(props: TConnectionProps) {
  const { config } = props;
  const { isConnected, videoStream } = useRealtime("channel1", config);
  const ref = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current && isConnected) {
      ref.current.srcObject = videoStream;
    }
  }, [isConnected, videoStream]);

  if (!isConnected) {
    return <div>Connecting...</div>;
  }

  return <video style={{ height: 400 }} ref={ref} autoPlay playsInline />;
}
