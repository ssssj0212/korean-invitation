"use client";

import { motion } from "framer-motion";
import { Camera, Gift, House, MapPinned } from "lucide-react";
import { WindSong } from "next/font/google";

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

export default function Home() {
  const site = getSiteConfig();
  const story = getStory();
  const photos = getPhotos();
  const accounts = getAccounts();
  const meta = getMeta();
  const heroPhoto = photos[0];
  const galleryPhotos = photos.slice(1);
  const weddingDate = new Date(site.weddingDateTime);
  const compactDate = `${weddingDate.getFullYear()}.${String(weddingDate.getMonth() + 1).padStart(2, "0")}.${String(
    weddingDate.getDate(),
  ).padStart(2, "0")}`;
  const heroLocation = "Manhattan, New York";
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", window.location.origin);
  };

  return (
    <main
      className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-3 pb-16 pt-4 text-text sm:px-4"
      style={{ ["--color-accent" as string]: site.accentColor }}
    >
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-3 z-30 mb-5 rounded-full border border-white/60 bg-[rgba(255,251,246,0.72)] px-1.5 py-2 shadow-[0_12px_30px_rgba(77,57,43,0.08)] backdrop-blur-xl"
        aria-label="Section navigation"
      >
        <div className="flex w-full items-center justify-between">
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
                className="inline-flex min-w-0 items-center justify-center gap-1 rounded-full px-0 py-2 text-[clamp(10.5px,2.55vw,11.5px)] font-medium tracking-[0] text-muted transition duration-500 hover:bg-white/90 hover:text-text"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="whitespace-nowrap">{section.label}</span>
              </button>
            );
          })}
        </div>
      </motion.nav>

      <section id="home" className="section-card relative overflow-hidden px-4 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-[#f6e7d9]/50 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-40 w-40 rounded-full bg-[#efe0d2]/45 blur-3xl" />
        </div>

        <div className="relative grid gap-5">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[2/3] overflow-hidden rounded-[30px]"
          >
            <PhotoFrame
              src={heroPhoto?.src}
              alt={heroPhoto?.alt ?? "Wedding hero image"}
              priority
              fit="cover"
              className="hero-photo-reveal h-full min-h-0 rounded-[30px] object-center"
              sizes="100vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-[31%] bg-[linear-gradient(180deg,rgba(19,14,10,0),rgba(36,27,20,0.04)_44%,rgba(36,27,20,0.13)_100%)]" />

            <div className="absolute inset-x-0 top-4 flex justify-center px-8 text-center text-[#fdf8f3] sm:top-8">
              <p className="luxury-kicker text-center text-white/96">Wedding Invitation</p>
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-[24%] flex justify-center px-6 text-center text-white">
              <p
                className={`${windsong.className} w-full max-w-[18rem] whitespace-pre-line text-[clamp(2.82rem,12.1vw,4.12rem)] font-normal leading-[0.74] [text-shadow:0_2px_10px_rgba(0,0,0,0.08)]`}
              >
                {"Our\nWedding\nDay"}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="section-panel rounded-[24px] px-6 py-5 text-center"
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[clamp(0.88rem,3vw,0.96rem)] font-medium text-muted">신랑</p>
                <p className="mt-2 font-sans text-[clamp(1.54rem,5.5vw,1.94rem)] font-semibold leading-none text-text">
                  {site.couple.groom}
                </p>
              </div>
              <div>
                <p className="text-[clamp(0.88rem,3vw,0.96rem)] font-medium text-muted">신부</p>
                <p className="mt-2 font-sans text-[clamp(1.54rem,5.5vw,1.94rem)] font-semibold leading-none text-text">
                  {site.couple.bride}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-0.5 text-center text-muted">
              <p className="font-medium text-[clamp(0.84rem,3vw,0.92rem)]">{compactDate}</p>
              <p className="text-[clamp(0.84rem,3vw,0.92rem)]">{heroLocation}</p>
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
          <div className="relative mx-auto mt-8 max-w-4xl px-3 text-center sm:px-5">
            <div className="pointer-events-none absolute left-1/2 top-8 h-28 w-28 -translate-x-1/2 rounded-full bg-[rgba(245,228,214,0.26)] blur-3xl" />

            <div className="relative">
              <div className="mx-auto mt-8 max-w-[20rem] space-y-6 text-center font-sans text-[clamp(1.05rem,4.5vw,1.2rem)] font-medium leading-[2.15] text-text">
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
          <div className="flex flex-col items-center gap-8 text-center">
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
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="mx-auto w-full max-w-[72rem] text-center">
              <p className="ornament mx-auto mb-4 inline-flex luxury-kicker text-accent">Share</p>
              <h2 className="mx-auto max-w-[28ch] font-serif text-[clamp(0.96rem,3.7vw,1.16rem)] leading-[1.16] text-text">
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
