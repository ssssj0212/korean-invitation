"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useMemo, useState } from "react";

import { isValidUrl } from "@/lib/utils";

type ShareActionsProps = {
  title: string;
  text: string;
  siteUrl?: string;
};

export function ShareActions({ title, text, siteUrl }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => {
    if (isValidUrl(siteUrl)) {
      return siteUrl;
    }

    if (typeof window !== "undefined") {
      return window.location.href;
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

  const handleShare = async () => {
    if (!shareUrl) {
      return;
    }

    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url: shareUrl,
      });
      return;
    }

    await handleCopy();
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-full border border-[rgba(88,74,64,0.08)] bg-white/88 px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-text transition duration-500 hover:border-accent/40 hover:text-accent"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        <span>{copied ? "복사됨" : "링크 복사"}</span>
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-full bg-text px-4 py-3 text-sm font-semibold text-[#fff8f2]"
      >
        <Share2 className="h-4 w-4" />
        공유하기
      </button>
    </div>
  );
}
