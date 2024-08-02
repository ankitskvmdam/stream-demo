import React, { useEffect } from "react";
import { AdaptRealtimeProvider } from "./store/provider";
import { VideoStream } from "./VideoStream";

export default function App() {
  const [list, setList] = React.useState<MediaDeviceInfo[]>([]);
  const [device1, setDevice1] = React.useState<string>();
  const [device2, setDevice2] = React.useState<string>();

  async function updateList() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const _list: MediaDeviceInfo[] = [];

    for (const device of devices) {
      if (device.kind === "videoinput") {
        _list.push(device);
      }
    }

    setList(_list);
  }

  useEffect(() => {
    updateList();
  }, []);

  if (list.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <span>Device 1</span>
        <select
          name="device1"
          id="device1"
          onChange={(e) => setDevice1(e.target.value)}
          value={device1}
        >
          <option>Select Video source 1</option>
          {list.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.kind} - {device.deviceId}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <div>
        <span>Device 2</span>
        <select
          name="device2"
          id="device2"
          onChange={(e) => setDevice2(e.target.value)}
          value={device2}
        >
          <option>Select Video source 2</option>
          {list.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.kind} - {device.deviceId}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <AdaptRealtimeProvider mediaId={device1}>
        <VideoStream title="Device 1" />
      </AdaptRealtimeProvider>
      <AdaptRealtimeProvider mediaId={device2}>
        <VideoStream title="Device 2" />
      </AdaptRealtimeProvider>
    </div>
  );
}
