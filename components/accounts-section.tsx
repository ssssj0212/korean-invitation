"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import type { AccountsContent } from "@/lib/types";

export function AccountsSection({ content }: { content: AccountsContent }) {
  const [copied, setCopied] = useState("");

  const copy = async (value: string) => {
    if (!value) {
      return;
    }

    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-2 lg:items-start">
      {content.groups.map((group) => {
        return (
          <section
            key={group.id}
            className="overflow-hidden rounded-[28px] border border-[rgba(88,74,64,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(250,244,238,0.62))] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
          >
            <div className="p-4 sm:p-6">
              <div>
                <p className="luxury-kicker text-accent">Blessing Info</p>
                <h3 className="mt-2 font-serif text-[1.55rem] leading-none tracking-[-0.04em] text-text sm:mt-3 sm:text-[1.9rem]">
                  {group.title}
                </h3>
              </div>
            </div>
            <div className="border-t border-[rgba(88,74,64,0.08)] p-4 sm:p-6">
              <div className="grid gap-3 sm:gap-4">
                {group.accounts.map((account) => (
                  <article key={`${group.id}-${account.label}`} className="section-panel rounded-[24px] p-3.5 sm:p-5">
                    <div>
                      <p className="luxury-kicker text-muted">{account.label}</p>
                      <p className="mt-2 font-serif text-[1.2rem] leading-none tracking-[-0.04em] text-text sm:mt-3 sm:text-[1.45rem]">
                        {account.accountHolder || "-"}
                      </p>
                    </div>

                    <div className="mt-3 space-y-2.5 text-sm text-stone-700 sm:mt-5 sm:space-y-3">
                      {account.bankName && account.accountNumber ? (
                        <div className="rounded-[18px] border border-[rgba(88,74,64,0.08)] bg-white/80 px-3 py-3 sm:rounded-[20px] sm:px-4 sm:py-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-[0.92rem] text-stone-500 sm:text-sm">{account.bankName}</p>
                              <p className="mt-1 break-all text-[1rem] font-medium tracking-[0.04em] text-stone-700 sm:tracking-[0.08em]">
                                {account.accountNumber}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(88,74,64,0.08)] bg-white/88 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-text transition duration-500 hover:border-accent/40 hover:text-accent sm:px-3.5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.16em]"
                              onClick={() => copy(account.accountNumber)}
                              aria-label={`${account.label} 계좌번호 복사`}
                            >
                              {copied === account.accountNumber ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
