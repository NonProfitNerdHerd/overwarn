"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { parseOverlayId } from "@/config/overlayConfig";
import LayoutOverlay1 from "./overlay1/LayoutOverlay1";
import LayoutOverlay2 from "./overlay2/LayoutOverlay2";

export default function OverlayLayout() {
  const searchParams = useSearchParams();
  const overlayId = parseOverlayId(searchParams.get("overlay"));

  if (overlayId === "2") {
    return <LayoutOverlay2 />;
  }

  return <LayoutOverlay1 />;
}
