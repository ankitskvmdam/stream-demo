export async function getAllUserDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const _list: MediaDeviceInfo[] = [];

  for (const device of devices) {
    if (device.kind === "videoinput") {
      _list.push(device);
    }
  }
  return _list;
}

export class MediaManager {
  constraints: MediaStreamConstraints;
  name: string;
  static streamManager = {} as Record<string, MediaStream>;

  constructor(name: string, constraints: MediaStreamConstraints) {
    this.constraints = constraints;
    this.name = name;
  }

  async initMedia() {
    if (this.name in MediaManager.streamManager) {
      console.log("Returning from MediaManager.streamManager");
      return {
        ok: true,
        err: null,
      };
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        this.constraints
      );
      MediaManager.streamManager[this.name] = stream;
      return {
        ok: true,
        err: null,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        err: error,
      };
    }
  }

  getStream(): MediaStream | undefined {
    return MediaManager.streamManager[this.name];
  }
}
