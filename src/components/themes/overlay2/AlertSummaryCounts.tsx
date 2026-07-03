import React from "react";
import { TAILWIND_TO_HEX } from "../../../config/alertConfig";

export type RegionSummaryCounts = {
  tornado: number;
  severe: number;
};

type AlertSummaryCountsProps = {
  counts: RegionSummaryCounts;
};

function CountBox({
  label,
  count,
  backgroundColor,
}: {
  label: string;
  count: number;
  backgroundColor: string;
}) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 text-white font-bold text-lg shadow drop-shadow-md whitespace-nowrap"
      style={{
        textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
        backgroundColor,
      }}
    >
      <span className="uppercase tracking-wide">{label}</span>
      <span className="tabular-nums min-w-[1.25em] text-center">{count}</span>
    </div>
  );
}

export default function AlertSummaryCounts({ counts }: AlertSummaryCountsProps) {
  return (
    <div className="flex w-full justify-end gap-2 px-0">
      <CountBox
        label="Severe T-Storm"
        count={counts.severe}
        backgroundColor={TAILWIND_TO_HEX["bg-yellow-500"]}
      />
      <CountBox
        label="Tornado"
        count={counts.tornado}
        backgroundColor={TAILWIND_TO_HEX["bg-red-600"]}
      />
    </div>
  );
}
