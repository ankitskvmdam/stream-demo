import React, { useEffect, useState } from "react";
import { TConfig, useRealtime } from "./useRealtime";
import { NewConnection } from "./NewConnection";

type TConnectionProps = {
  config: TConfig;
};

export function Connection(props: TConnectionProps) {
  const { config } = props;
  const { isConnected, videoStream } = useRealtime("channel1", config);
  const ref = React.useRef<HTMLVideoElement>(null);
  const [addConnection2, setAddConnection2] = useState(false);

  useEffect(() => {
    if (ref.current && isConnected) {
      ref.current.srcObject = videoStream;
    }
  }, [isConnected, videoStream]);

  if (!isConnected) {
    return <div>Connecting...</div>;
  }

  return (
    <div>
      <video style={{ height: 400 }} ref={ref} autoPlay playsInline />
      <button onClick={() => setAddConnection2(true)}>Add Connection 2</button>
      {addConnection2 && <NewConnection config={config} />}
    </div>
  );
}
