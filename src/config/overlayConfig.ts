export const OVERLAY_OPTIONS = [
  { value: "1", label: "Overlay 1" },
  { value: "2", label: "Overlay 2" },
] as const;

export type OverlayId = (typeof OVERLAY_OPTIONS)[number]["value"];

export function parseOverlayId(param: string | null | undefined): OverlayId {
  return param === "2" ? "2" : "1";
}
