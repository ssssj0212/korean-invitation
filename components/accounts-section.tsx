"use client";

import { Check, Copy, Phone } from "lucide-react";
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
    <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:items-start">
      {content.groups.map((group) => {
        return (
          <section
            key={group.id}
            className="overflow-hidden rounded-[28px] border border-[rgba(88,74,64,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(250,244,238,0.62))] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
          >
            <div className="p-5 sm:p-6">
              <div>
                <p className="luxury-kicker text-accent">Blessing Info</p>
                <h3 className="mt-3 font-serif text-[1.9rem] leading-none tracking-[-0.04em] text-text">
                  {group.title}
                </h3>
              </div>
            </div>
            <div className="border-t border-[rgba(88,74,64,0.08)] p-5 sm:p-6">
              <div className="grid gap-4">
                {group.accounts.map((account) => (
                  <article key={`${group.id}-${account.label}`} className="section-panel rounded-[24px] p-4 sm:p-5">
                    <div>
                      <p className="luxury-kicker text-muted">{account.label}</p>
                      <p className="mt-3 font-serif text-[1.45rem] leading-none tracking-[-0.04em] text-text">
                        {account.accountHolder || "-"}
                      </p>
                    </div>

                    <div className="mt-5 space-y-3 text-sm text-stone-700">
                      {account.phone ? (
                        <div className="flex items-center justify-between gap-3 rounded-[20px] border border-[rgba(88,74,64,0.08)] bg-white/80 px-4 py-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <Phone className="h-4 w-4 shrink-0 text-accent" />
                            <a
                              className="truncate"
                              href={`tel:${account.phone.replaceAll(" ", "").replaceAll("-", "")}`}
                            >
                              {account.phone}
                            </a>
                          </div>
                          <button
                            type="button"
                            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(88,74,64,0.08)] bg-white/88 px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-text transition duration-500 hover:border-accent/40 hover:text-accent"
                            onClick={() => copy(account.phone!)}
                          >
                            {copied === account.phone ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      ) : null}

                      {account.bankName && account.accountNumber ? (
                        <div className="rounded-[20px] border border-[rgba(88,74,64,0.08)] bg-white/80 px-4 py-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm text-stone-500">{account.bankName}</p>
                              <p className="mt-1 break-all font-medium tracking-[0.08em] text-stone-700">
                                {account.accountNumber}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(88,74,64,0.08)] bg-white/88 px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-text transition duration-500 hover:border-accent/40 hover:text-accent"
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
