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
      return configuredUrl.replace(/\/$/, "");
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
        className="pressable inline-flex items-center gap-2 rounded-full border border-[rgba(88,74,64,0.08)] bg-white/88 px-4 py-3 text-sm font-semibold text-text hover:border-accent/40 hover:text-accent"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span>{copied ? "복사됨" : "링크 복사"}</span>
      </button>
    </div>
  );
}
