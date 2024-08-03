import React, { useEffect } from "react";
import { MediaManager } from "./media-manager";

export type TConfig = {
  functionURL: string;
  deviceId?: string;
  // ...other configs
};

export type TUseRealtimeReturn = {
  isConnected: boolean;
  videoStream?: MediaStream;
};

export function useRealtime(name: string, config: TConfig) {
  const { deviceId } = config;
  const [isConnected, setIsConnected] = React.useState(false);
  const [videoStream, setVideoStream] = React.useState<MediaStream | null>(
    null
  );

  const initConnection = React.useCallback(async () => {
    setIsConnected(false);
    const mediaManager = new MediaManager(name, {
      video: { deviceId, height: { ideal: 1080 } },
    });

    const response = await mediaManager.initMedia();

    if (!response.ok) {
      setVideoStream(null);
      console.log("Unable to initialize media");
      return;
    }

    const stream = mediaManager.getStream();
    if (!stream) {
      setVideoStream(null);
      console.log("Unable to get stream");
      return;
    }

    setVideoStream(stream);
    setIsConnected(true);
  }, [deviceId, name]);

  useEffect(() => {
    initConnection();
  }, [initConnection]);

  return {
    isConnected,
    videoStream,
  };
}
