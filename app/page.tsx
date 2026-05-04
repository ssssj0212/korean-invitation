"use client";

import { motion } from "framer-motion";
import { Camera, Gift, House, MapPinned } from "lucide-react";
import { Montserrat, WindSong } from "next/font/google";

import { AccountsSection } from "@/components/accounts-section";
import { BgmPlayer } from "@/components/bgm-player";
import { Countdown } from "@/components/countdown";
import { Gallery } from "@/components/gallery";
import { PhotoFrame } from "@/components/photo-frame";
import { SectionHeading } from "@/components/section-heading";
import { SectionShell } from "@/components/section-shell";
import { ShareActions } from "@/components/share-actions";
import { getAccounts, getMeta, getPhotos, getSiteConfig, getStory } from "@/lib/content";

const windsong = WindSong({
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "300",
});

export default function Home() {
  const site = getSiteConfig();
  const story = getStory();
  const photos = getPhotos();
  const accounts = getAccounts();
  const meta = getMeta();
  const heroPhoto = photos[0];
  const galleryPhotos = photos.slice(1);
  const compactDate = "2026.06.04";
  const heroLocation = "Manhattan, New York";
  const heroFadeMask =
    "[mask-image:linear-gradient(to_bottom,#000_0%,#000_73%,rgba(0,0,0,0.9)_83%,rgba(0,0,0,0.45)_93%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_73%,rgba(0,0,0,0.9)_83%,rgba(0,0,0,0.45)_93%,transparent_100%)]";
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", window.location.origin);
  };

  return (
    <main
      className="mx-auto flex min-h-[100svh] w-full max-w-[430px] flex-col px-3 pb-16 pt-4 text-text sm:px-4"
      style={{ ["--color-accent" as string]: site.accentColor }}
    >
      <motion.nav
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.02, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-3 z-30 mb-6 rounded-full border border-[rgba(232,222,210,0.88)] bg-[rgba(255,252,247,0.8)] px-2 py-2 shadow-[0_12px_28px_rgba(77,57,43,0.045)] backdrop-blur-xl"
        aria-label="Section navigation"
      >
        <div className="flex w-full items-center justify-center gap-3">
          {[
            { id: "home", label: "홈", icon: House },
            { id: "invitation", label: "안내", icon: MapPinned },
            { id: "gallery", label: "갤러리", icon: Camera },
            { id: "gift", label: "마음 전하실 곳", icon: Gift },
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className="pressable inline-flex min-w-0 items-center justify-center gap-[2px] rounded-full px-1 py-1.5 font-sans text-[clamp(8.2px,1.95vw,9.1px)] font-normal tracking-[-0.045em] text-muted hover:bg-[rgba(255,255,255,0.58)] hover:text-text"
              >
                <Icon className="h-[10px] w-[10px] shrink-0 stroke-[1.9]" />
                <span className="whitespace-nowrap">{section.label}</span>
              </button>
            );
          })}
        </div>
      </motion.nav>

      <section id="home" className="section-card relative overflow-hidden px-4 pb-5 pt-4 sm:px-6 sm:pb-7 sm:pt-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-[#f6e7d9]/50 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-40 w-40 rounded-full bg-[#efe0d2]/45 blur-3xl" />
        </div>

        <div className="relative grid gap-0">
          <motion.div
            initial={false}
            className="hero-light-leak relative aspect-[2/3] overflow-hidden rounded-t-[30px] rounded-b-none"
          >
            <PhotoFrame
              src={heroPhoto?.src}
              alt={heroPhoto?.alt ?? "Wedding hero image"}
              priority
              fit="cover"
              className={`hero-photo-reveal z-0 h-full min-h-0 rounded-t-[30px] rounded-b-none object-center ${heroFadeMask}`}
              sizes="(max-width: 430px) calc(100vw - 38px), 392px"
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] rounded-t-[30px] rounded-b-none bg-[linear-gradient(180deg,rgba(255,250,244,0.12)_0%,rgba(246,232,219,0.08)_30%,rgba(255,255,255,0)_52%)]"
              aria-hidden="true"
            />
            <div className="petal-layer" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, index) => (
                <span key={index} className={`petal petal-${index + 1}`} />
              ))}
            </div>

            <div className="absolute inset-x-0 top-4 z-10 flex justify-center px-8 text-center text-[#fdf8f3] sm:top-8">
              <p
                className={`${montserrat.className} text-[9.8px] font-light uppercase tracking-[0.5em] text-[#eadfd1]/96`}
              >
                WEDDING INVITATION
              </p>
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-[10.9%] z-10 flex justify-center px-6 text-center text-white">
              <p
                className={`${windsong.className} w-full max-w-[16.35rem] whitespace-pre-line text-[clamp(3.58rem,15.4vw,5.02rem)] font-normal leading-[0.7] tracking-[-0.012em] [text-shadow:0_1px_10px_rgba(0,0,0,0.04)]`}
              >
                {"Our\nWedding\nDay"}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.02, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mt-1 mx-auto w-full max-w-[15.5rem] px-3 pb-4 pt-0 text-center"
          >
            <div className="mx-auto grid max-w-[13.25rem] grid-cols-2 items-baseline justify-items-center gap-x-5">
              <div className="inline-flex items-baseline justify-center gap-[0.58rem] whitespace-nowrap">
                <span className="text-[clamp(0.68rem,2vw,0.72rem)] font-medium tracking-[0.045em] text-[#8a7969]">
                  신랑
                </span>
                <span className="font-serif text-[clamp(1.03rem,3.15vw,1.13rem)] font-semibold tracking-[-0.022em] text-[#8b7a6b]">
                  {site.couple.groom}
                </span>
              </div>
              <div className="inline-flex items-baseline justify-center gap-[0.58rem] whitespace-nowrap">
                <span className="text-[clamp(0.68rem,2vw,0.72rem)] font-medium tracking-[0.045em] text-[#8a7969]">
                  신부
                </span>
                <span className="font-serif text-[clamp(1.03rem,3.15vw,1.13rem)] font-semibold tracking-[-0.022em] text-[#8b7a6b]">
                  {site.couple.bride}
                </span>
              </div>
            </div>
            <div className="mx-auto mt-3 h-px w-5 bg-[linear-gradient(90deg,transparent,rgba(181,150,114,0.34),transparent)]" />
            <div className="mt-2.5 space-y-[0.14rem] text-center text-[#7d6b5c]">
              <p className="font-medium tracking-[0.042em] text-[clamp(0.74rem,2.15vw,0.79rem)]">{compactDate}</p>
              <p className="text-[clamp(0.68rem,2.05vw,0.74rem)] tracking-[0.008em]">{heroLocation}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5 sm:mt-7 sm:gap-7">
        <SectionShell
          id="invitation"
          className="bg-[linear-gradient(180deg,rgba(255,250,246,0.96),rgba(251,245,239,0.92))]"
        >
          <SectionHeading eyebrow="OUR WEDDING" align="center" />
          <div className="relative mx-auto mt-10 max-w-4xl px-3 text-center sm:px-5">
            <div className="pointer-events-none absolute left-1/2 top-8 h-28 w-28 -translate-x-1/2 rounded-full bg-[rgba(245,228,214,0.26)] blur-3xl" />

            <div className="relative">
              <div className="balanced-copy mx-auto mt-9 max-w-[20.5rem] space-y-8 text-center font-sans text-[clamp(0.97rem,3.85vw,1.03rem)] leading-[2.04] text-[#5f5047]">
                {story.invitationBody.map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="countdown" className="overflow-hidden">
          <div className="flex flex-col items-center gap-9 text-center">
            <SectionHeading
              eyebrow="Countdown"
              title="소중한 날을 기다리고 있습니다."
              description={`${site.couple.groom} · ${site.couple.bride}의 예식까지 남은 시간입니다.`}
              align="center"
            />
            <Countdown targetDate={site.weddingDateTime} />
          </div>
        </SectionShell>

        <SectionShell id="gallery">
          <SectionHeading
            eyebrow="Gallery"
            align="center"
          />
          <Gallery photos={galleryPhotos} />
        </SectionShell>

        {accounts.enabled ? (
          <SectionShell id="gift">
            <SectionHeading
              eyebrow="Blessing"
              title={accounts.title}
              align="center"
            />
            <AccountsSection content={accounts} />
          </SectionShell>
        ) : null}

        <SectionShell id="share">
          <div className="flex flex-col items-center gap-7 text-center">
            <div className="mx-auto w-full max-w-[72rem] text-center">
              <p className="ornament mx-auto mb-4 inline-flex luxury-kicker text-accent">Share</p>
              <h2 className="balanced-title mx-auto max-w-[28ch] font-serif text-[clamp(1rem,3.8vw,1.18rem)] leading-[1.22] text-text">
                한 번의 탭으로 이 초대장을 전해보세요.
              </h2>
            </div>
            <ShareActions title={meta.title} text={meta.description} siteUrl={meta.siteUrl} />
          </div>
        </SectionShell>

        {site.bgm.enabled ? (
          <section className="sticky bottom-4 z-20 mx-auto w-full max-w-full px-2 pb-6">
            <BgmPlayer src={site.bgm.src} title={site.bgm.title} artist={site.bgm.artist} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
