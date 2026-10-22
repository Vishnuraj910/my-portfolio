// global.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- merges into the global Navigator type
interface Navigator {
  connection?: NetworkInformation;
}

interface NetworkInformation {
  downlink?: number;
  effectiveType?: string;
  rtt?: number;
  saveData?: boolean;
  addEventListener?: (type: string, listener: EventListenerOrEventListenerObject) => void;
}
