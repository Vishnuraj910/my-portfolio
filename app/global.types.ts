// global.d.ts
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
