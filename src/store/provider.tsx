import React, { useEffect } from "react";
import {
  TAdaptRealtimeStore,
  createAdaptRealtimeStore,
  AdaptRealtimeContext,
} from "./adapt-realtime";

export type TAdaptRealtimeProvider = React.PropsWithChildren<{
  mediaId?: string;
}>;

type TStore = React.PropsWithChildren<{
  stream: MediaStream;
}>;

function Store(props: TStore) {
  const storeRef = React.useRef<TAdaptRealtimeStore>();
  const { stream, children } = props;

  if (!storeRef.current) {
    storeRef.current = createAdaptRealtimeStore({ stream });
  } else if (
    storeRef.current &&
    storeRef.current.getState().stream.id !== stream.id
  ) {
    storeRef.current.getState().updateStream(stream);
  }

  return (
    <AdaptRealtimeContext.Provider value={storeRef.current}>
      {children}
    </AdaptRealtimeContext.Provider>
  );
}

export function AdaptRealtimeProvider(props: TAdaptRealtimeProvider) {
  const { children, mediaId } = props;
  const [stream, setStream] = React.useState<MediaStream | null>();

  async function getStream() {
    const media = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: mediaId,
        height: {
          ideal: 1080,
        },
        width: {
          ideal: 1920,
        },
      },
    });

    setStream(media);
  }

  useEffect(() => {
    if (mediaId) {
      getStream();
    }
  }, [mediaId]);

  if (!mediaId) {
    return <div>Please select a device.</div>;
  }

  if (!stream) {
    return <div>Loading stream...</div>;
  }

  return <Store stream={stream}>{children}</Store>;
}
