"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { formatAlertDescriptionForTicker } from "../../../utils/nwsAlertUtils";

type AlertDetailTickerProps = {
  description: string | null | undefined;
  isTransitioning: boolean;
  hasAlert: boolean;
  color: string;
};

const MIN_READING_SPEED = 80; // px/sec
const BUFFER_TIME = 2000;
const MIN_SCROLL_DURATION = 8000;

export default function AlertDetailTicker({
  description,
  isTransitioning,
  hasAlert,
  color,
}: AlertDetailTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const previousContentRef = useRef("");

  const tickerText = useMemo(
    () => formatAlertDescriptionForTicker(description),
    [description]
  );
  const isTransparent = color === "transparent";

  const getScrollMetrics = () => {
    const container = containerRef.current;
    const content = spanRef.current;
    if (!container || !content) {
      return { scrollDistance: 0, needsScroll: false };
    }
    const style = window.getComputedStyle(container);
    const paddingLeft = parseFloat(style.paddingLeft) || 0;
    const paddingRight = parseFloat(style.paddingRight) || 0;
    const totalPadding = paddingLeft + paddingRight;
    const scrollDistance =
      content.scrollWidth - (container.clientWidth - totalPadding);
    return { scrollDistance, needsScroll: scrollDistance > 0 };
  };

  useEffect(() => {
    const container = containerRef.current;
    const content = spanRef.current;
    if (!container || !content || !tickerText) return;

    const contentChanged = previousContentRef.current !== tickerText;
    if (contentChanged) {
      container.scrollLeft = 0;
      previousContentRef.current = tickerText;
    }

    let animationFrameId: number;
    let cancelled = false;

    type TickerPhase = "wait-start" | "scrolling" | "wait-end";
    let phase: TickerPhase = "wait-start";
    let phaseStart: number | null = null;

    const { scrollDistance, needsScroll } = getScrollMetrics();
    if (!needsScroll) return;

    const scrollDuration = Math.max(
      MIN_SCROLL_DURATION,
      (scrollDistance / MIN_READING_SPEED) * 1000
    );

    function step(timestamp: number) {
      if (cancelled || !container) return;
      if (!phaseStart) phaseStart = timestamp;
      const elapsed = timestamp - phaseStart;
      const metrics = getScrollMetrics();

      if (phase === "wait-start") {
        if (elapsed >= BUFFER_TIME) {
          phase = "scrolling";
          phaseStart = timestamp;
        }
      } else if (phase === "scrolling") {
        const progress = Math.min(elapsed / scrollDuration, 1);
        container.scrollLeft = progress * metrics.scrollDistance;
        if (progress >= 1) {
          phase = "wait-end";
          phaseStart = timestamp;
        }
      } else if (phase === "wait-end") {
        if (elapsed >= BUFFER_TIME) {
          container.scrollLeft = 0;
          phase = "wait-start";
          phaseStart = timestamp;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    }

    const startTimeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(step);
    }, 50);

    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [tickerText]);

  return (
    <div
      ref={containerRef}
      className={`alert-area-scrollbar-hide flex items-center px-4 py-2 text-white font-semibold text-base row-span-1 col-span-1 drop-shadow-md whitespace-nowrap overflow-hidden ${isTransparent ? "" : "shadow border-t border-neutral-700"}`}
      style={{
        textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
        overflowX: "auto",
        backgroundColor: color,
        transition: "background-color 0.3s",
        borderTop: isTransparent ? "none" : undefined,
        boxShadow: isTransparent ? "none" : undefined,
      }}
    >
      <span
        ref={spanRef}
        className={`transition-all duration-300 inline-block ${
          isTransitioning && hasAlert
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        }`}
        style={{ whiteSpace: "nowrap" }}
      >
        {tickerText}
      </span>
    </div>
  );
}
