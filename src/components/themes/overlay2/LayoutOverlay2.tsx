import React from "react";
import { useAlertOverlayContext } from "../../providers/AlertOverlayProvider";
import AlertExpires from "../default/AlertExpires";
import AlertTypeBar from "../default/AlertTypeBar";
import AlertAreaBar from "../default/AlertAreaBar";
import AlertDetailTicker from "./AlertDetailTicker";
import AlertSummaryCounts from "./AlertSummaryCounts";
import { Geist } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { isPassiveMode } from "../../../utils/queryParamUtils";
import { getStateUntilText } from "../../../utils/nwsAlertUtils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function LayoutOverlay2() {
  const {
    alert,
    isTransitioning,
    setScrollInfo,
    startScroll,
    scrollDuration,
    bufferTime,
    isCurrentAlertNew,
    filteredRegionCounts,
  } = useAlertOverlayContext();
  const searchParams = useSearchParams();
  const showNewBadge = !isPassiveMode(searchParams);

  const stateUntilPrefix = alert
    ? getStateUntilText(
        alert.area,
        alert.geocode,
        alert.expires,
        alert.headline
      )
    : "";

  const hasActiveAlert = !!alert;

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 ${geistSans.variable}`}
      style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}
    >
      <AlertSummaryCounts counts={filteredRegionCounts} />
      <div className="grid grid-cols-[auto_1fr] grid-rows-2 w-full min-h-[90px] border-t border-neutral-700">
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
          backgroundColorOverride={hasActiveAlert ? undefined : "transparent"}
          scrollDuration={scrollDuration}
          bufferTime={bufferTime}
          startScroll={startScroll}
          onMeasureScroll={setScrollInfo}
          alertType={alert ? alert.alertType : undefined}
          parameters={alert ? alert.parameters : undefined}
          prefix={stateUntilPrefix}
          tickerLoop
        />
        <AlertExpires
          expires={alert ? alert.expires : null}
          isTransitioning={isTransitioning}
          isNew={isCurrentAlertNew}
          showNewBadge={showNewBadge}
          backgroundColorOverride={hasActiveAlert ? undefined : "transparent"}
        />
        <AlertDetailTicker
          description={alert ? alert.description : null}
          isTransitioning={isTransitioning}
          hasAlert={hasActiveAlert}
          color={hasActiveAlert ? alert.color : "transparent"}
        />
      </div>
    </div>
  );
}
