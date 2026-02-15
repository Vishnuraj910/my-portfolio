"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const CLARITY_PROJECT_ID = "vhszs6u8jg";

export default function ClarityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    Clarity.init(CLARITY_PROJECT_ID);
  }, []);

  return <>{children}</>;
}
