"use client";
import React, { Suspense } from "react";
import { Geist } from "next/font/google";
import { Menu } from "lucide-react";
import AppMenu from "../components/menu/AppMenu";
import OverlayLayout from "../components/themes/OverlayLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

function LoadingOverlay() {
  return (
    <div className={`fixed bottom-0 left-0 w-full z-50 ${geistSans.variable}`}>
      <div className="grid grid-cols-[auto_1fr] grid-rows-2 w-full min-h-[90px] bg-gray-800 animate-pulse">
        <div className="col-span-1 row-span-1"></div>
        <div className="col-span-1 row-span-1"></div>
        <div className="col-span-1 row-span-1"></div>
        <div className="col-span-1 row-span-1"></div>
      </div>
    </div>
  );
}

export default function LiveAlertOverlay() {
  return (
    <div className="group min-h-screen w-full fixed inset-0">
      <div className="fixed top-4 left-4 z-[100]">
        <AppMenu>
          <button
            aria-label="Open menu"
            className="opacity-100 data-[state=open]:opacity-100 bg-black/70 hover:bg-black/90 p-1 rounded-md border border-white/20 shadow-lg"
          >
            <Menu className="w-8 h-8 text-white" />
          </button>
        </AppMenu>
      </div>
      <Suspense fallback={<LoadingOverlay />}>
        <OverlayLayout />
      </Suspense>
    </div>
  );
}
