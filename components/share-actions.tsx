"use client";

import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";

import { isValidUrl } from "@/lib/utils";

type ShareActionsProps = {
  title: string;
  text: string;
  siteUrl?: string;
};

export function ShareActions({ siteUrl }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    const configuredUrl = siteUrl ?? "";

    if (isValidUrl(configuredUrl)) {
      return configuredUrl;
    }

    if (typeof window !== "undefined") {
      return window.location.origin;
    }

    return "";
  }, [siteUrl]);

  const handleCopy = async () => {
    if (!shareUrl) {
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={handleCopy}
        className="pressable inline-flex min-h-12 items-center gap-2 rounded-full border border-[rgba(215,196,174,0.86)] bg-[rgba(255,252,247,0.72)] px-5 py-3 text-[0.92rem] font-medium text-[#5a4638] hover:border-accent/55 hover:bg-[rgba(255,255,255,0.82)] hover:text-accent"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span aria-live="polite">{copied ? "복사됨" : "링크 복사"}</span>
      </button>
    </div>
  );
}
