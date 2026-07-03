import React from "react";
import { useAlertOverlayContext } from "../../providers/AlertOverlayProvider";
import AlertExpires from "../default/AlertExpires";
import AlertStateBar from "../default/AlertStateBar";
import AlertTypeBar from "../default/AlertTypeBar";
import AlertAreaBar from "../default/AlertAreaBar";
import { Geist } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { isPassiveMode } from "../../../utils/queryParamUtils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function LayoutOverlay1() {
  const {
    alert,
    isTransitioning,
    setScrollInfo,
    startScroll,
    scrollDuration,
    bufferTime,
    isCurrentAlertNew,
  } = useAlertOverlayContext();
  const searchParams = useSearchParams();
  const showNewBadge = !isPassiveMode(searchParams);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 ${geistSans.variable}`}
      style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}
    >
      <div className="grid grid-cols-[auto_1fr] grid-rows-2 w-full min-h-[90px]">
        <AlertExpires
          expires={alert ? alert.expires : null}
          isTransitioning={isTransitioning}
          isNew={isCurrentAlertNew}
          showNewBadge={showNewBadge}
        />
        <AlertStateBar
          area={alert ? alert.area : null}
          geocode={alert ? alert.geocode : undefined}
          expires={alert ? alert.expires : null}
          headline={alert ? alert.headline : null}
          isTransitioning={isTransitioning}
        />
        <AlertTypeBar
          label={alert ? alert.label : null}
          color={alert ? alert.color : "#404040"}
          isTransitioning={isTransitioning}
        />
        <AlertAreaBar
          area={alert ? alert.area : null}
          geocode={alert ? alert.geocode : undefined}
          isTransitioning={isTransitioning}
          color={alert ? alert.color : "#737373"}
          scrollDuration={scrollDuration}
          bufferTime={bufferTime}
          startScroll={startScroll}
          onMeasureScroll={setScrollInfo}
          alertType={alert ? alert.alertType : undefined}
          parameters={alert ? alert.parameters : undefined}
          tickerLoop
        />
      </div>
    </div>
  );
}
