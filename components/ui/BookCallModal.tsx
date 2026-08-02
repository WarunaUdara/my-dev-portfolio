"use client";

import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { IconX, IconCalendar, IconVideo } from "@tabler/icons-react";

export const DEFAULT_CAL_LINK = "waruna-udara/30min";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  calLink?: string;
}

export default function BookCallModal({
  isOpen,
  onClose,
  calLink = DEFAULT_CAL_LINK,
}: BookCallModalProps) {
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "30min" });
        cal("ui", {
          theme: "dark",
          styles: {
            branding: {
              brandColor: "#ffffff",
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch {
        // Embed init is best-effort; failure should not block the modal
      }
    })();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0d12] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#12131a] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <IconVideo className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                Book a 1-on-1 Call
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-medium">
                  Google Meet
                </span>
              </h3>
              <p className="text-neutral-400 text-xs font-mono">
                Select a time slot that works best for you
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all"
            title="Close modal"
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body with Embedded Cal.com Calendar */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-[#090a0f]">
          <Cal
            namespace="30min"
            calLink={calLink}
            style={{ width: "100%", height: "100%", minHeight: "560px" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>
      </div>
    </div>
  );
}
