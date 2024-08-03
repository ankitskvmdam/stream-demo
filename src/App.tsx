import React, { useEffect } from "react";
import { getAllUserDevices } from "./media-manager";
import { Connection } from "./Connection";

export default function App() {
  const [list, setList] = React.useState<MediaDeviceInfo[]>([]);
  const [device, setDevice] = React.useState<string>();

  async function updateList() {
    const _list = await getAllUserDevices();
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
          onChange={(e) => setDevice(e.target.value)}
          value={device}
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
      {device && (
        <Connection
          config={{ functionURL: "adapt-infra-url", deviceId: device }}
        />
      )}
    </div>
  );
}
