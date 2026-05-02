"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import type { AccountsContent } from "@/lib/types";

export function AccountsSection({ content }: { content: AccountsContent }) {
  const [copied, setCopied] = useState("");
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  const copy = async (value: string) => {
    if (!value) {
      return;
    }

    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1500);
  };

  const activeGroup = content.groups.find((group) => group.id === activeGroupId) ?? null;

  return (
    <div className="mt-8 space-y-4">
      <div className="rounded-[28px] border border-line/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(252,248,242,0.62))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_20px_rgba(67,49,35,0.02)] sm:p-6">
        <p className="luxury-kicker text-accent">Blessing Info</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {content.groups.map((group) => {
            const isActive = group.id === activeGroupId;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveGroupId((current) => (current === group.id ? null : group.id))}
                className={`pressable rounded-full border px-4 py-3 text-center ${
                  isActive
                    ? "border-[rgba(215,196,174,0.9)] bg-[rgba(255,252,247,0.9)] text-text shadow-[0_6px_14px_rgba(67,49,35,0.03)]"
                    : "border-line/80 bg-[rgba(255,252,247,0.72)] text-text hover:border-accent/50 hover:bg-[rgba(255,255,255,0.82)]"
                }`}
              >
                <span className={`font-serif text-[1.02rem] tracking-[-0.03em] sm:text-[1.1rem] ${isActive ? "text-text" : "text-text"}`}>
                  {group.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {activeGroup ? (
        <section
          className="overflow-hidden rounded-[28px] border border-line/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(252,248,242,0.64))] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_12px_24px_rgba(67,49,35,0.024)]"
        >
          <div className="p-4 sm:p-6">
            <div>
              <p className="luxury-kicker text-accent">Blessing Info</p>
              <h3 className="mt-2 font-serif text-[1.22rem] leading-none tracking-[-0.04em] text-text sm:mt-3 sm:text-[1.55rem]">
                {activeGroup.title}
              </h3>
            </div>
          </div>
          <div className="border-t border-[rgba(232,222,210,0.92)] p-4 sm:p-6">
            <div className="grid gap-3 sm:gap-4">
              {activeGroup.accounts.map((account) => (
                <article key={`${activeGroup.id}-${account.label}`} className="section-panel rounded-[24px] p-3.5 sm:p-5">
                  <div>
                    <p className="luxury-kicker text-muted">{account.label}</p>
                    <p className="mt-2 font-serif text-[1.04rem] leading-none tracking-[-0.04em] text-text sm:mt-3 sm:text-[1.16rem]">
                      {account.accountHolder || "-"}
                    </p>
                  </div>

                  <div className="mt-3 space-y-2.5 text-sm text-stone-700 sm:mt-5 sm:space-y-3">
                    {account.bankName && account.accountNumber ? (
                      <div className="rounded-[18px] border border-line/85 bg-[rgba(255,252,247,0.82)] px-3 py-3 sm:rounded-[20px] sm:px-4 sm:py-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[0.82rem] text-muted sm:text-[0.88rem]">{account.bankName}</p>
                            <p className="mt-1 break-all text-[0.88rem] font-medium tracking-[0.01em] text-text sm:text-[0.96rem] sm:tracking-[0.02em]">
                              {account.accountNumber}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="pressable inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border border-[rgba(215,196,174,0.86)] bg-[rgba(255,252,247,0.76)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#5a4638] hover:border-accent/50 hover:bg-[rgba(255,255,255,0.86)] hover:text-accent sm:px-3.5 sm:py-2 sm:text-[10px] sm:tracking-[0.12em]"
                            onClick={() => copy(account.accountNumber)}
                            aria-label={`${account.label} 계좌번호 복사`}
                          >
                            {copied === account.accountNumber ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            <span aria-live="polite">{copied === account.accountNumber ? "복사됨" : "복사"}</span>
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
      ) : null}
    </div>
  );
}
