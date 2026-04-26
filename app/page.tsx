"use client";

import { motion } from "framer-motion";
import { CalendarDays, Camera, ExternalLink, Gift, MapPin, MapPinned, Share2 } from "lucide-react";
import Link from "next/link";

import { AccountsSection } from "@/components/accounts-section";
import { BgmPlayer } from "@/components/bgm-player";
import { Countdown } from "@/components/countdown";
import { Gallery } from "@/components/gallery";
import { PhotoFrame } from "@/components/photo-frame";
import { SectionHeading } from "@/components/section-heading";
import { SectionShell } from "@/components/section-shell";
import { ShareActions } from "@/components/share-actions";
import { getAccounts, getMeta, getPhotos, getSiteConfig, getStory } from "@/lib/content";
import { formatFullDate, formatTime, mapSearchUrl } from "@/lib/utils";

export default function Home() {
  const site = getSiteConfig();
  const story = getStory();
  const photos = getPhotos();
  const accounts = getAccounts();
  const meta = getMeta();
  const heroPhoto = photos[0];
  const mapUrl = site.venue.mapUrl ?? mapSearchUrl(site.venue.address);

  return (
    <main
      className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-3 pb-16 pt-4 text-text sm:px-5 lg:px-6"
      style={{ ["--color-accent" as string]: site.accentColor }}
    >
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-3 z-30 mb-5 overflow-x-auto rounded-full border border-white/60 bg-[rgba(255,251,246,0.72)] px-3 py-2 shadow-[0_12px_30px_rgba(77,57,43,0.08)] backdrop-blur-xl"
        aria-label="Section navigation"
      >
        <div className="flex min-w-max items-center gap-1">
          {[
            { href: "#details", label: "안내", icon: MapPinned },
            { href: "#gallery", label: "갤러리", icon: Camera },
            { href: "#gift", label: "마음 전하실 곳", icon: Gift },
            { href: "#share", label: "공유", icon: Share2 },
          ].map((section) => {
            const Icon = section.icon;
            return (
              <a
                key={section.href}
                href={section.href}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-medium tracking-[0.08em] text-muted transition duration-500 hover:bg-white/90 hover:text-text"
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{section.label}</span>
              </a>
            );
          })}
        </div>
      </motion.nav>

      <section className="section-card relative overflow-hidden px-4 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-[#f6e7d9]/50 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-40 w-40 rounded-full bg-[#efe0d2]/45 blur-3xl" />
        </div>

        <div className="relative grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[30px] border border-white/50 sm:aspect-[5/6] lg:aspect-auto lg:min-h-[72svh] [@media_(orientation:landscape)_and_(max-height:560px)]:aspect-[16/10] [@media_(orientation:landscape)_and_(max-height:560px)]:min-h-0"
          >
            <div className="absolute inset-0">
              <PhotoFrame
                src={heroPhoto?.src}
                alt={heroPhoto?.alt ?? "Wedding hero image"}
                priority
                className="h-full min-h-0 rounded-[30px] lg:min-h-[72svh] [@media_(orientation:landscape)_and_(max-height:560px)]:min-h-0"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,14,10,0.08),rgba(23,18,14,0.18)_28%,rgba(40,28,20,0.58)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 p-4 text-[#fdf8f3] sm:p-8">
              <p className="luxury-kicker mb-3 text-[#f0d9ca]">Wedding Invitation</p>
              <h1 className="balanced-title max-w-[10ch] font-serif leading-[0.94] tracking-[-0.045em] text-white text-[clamp(1.85rem,8.2vmin,4.35rem)] sm:max-w-[12ch] sm:leading-[0.9] sm:tracking-[-0.05em] lg:text-[clamp(3.2rem,5.4vw,4.7rem)]">
                <span className="block">{site.couple.groom}</span>
                <span className="my-1 block text-[0.5em] leading-none text-[#f2ddd0]">&amp;</span>
                <span className="block">{site.couple.bride}</span>
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col gap-4 px-1 sm:px-0"
          >
            <div className="rounded-[24px] border border-[rgba(184,143,115,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(252,247,242,0.7))] px-6 py-6 sm:px-8 lg:px-10">
              <p className="luxury-kicker text-accent">Wedding Lunch</p>
              <p className="mx-auto mt-5 w-full max-w-[22rem] text-center text-[clamp(0.96rem,2vw,1.12rem)] leading-[1.9] tracking-[-0.03em] text-muted sm:max-w-[24rem] sm:leading-8">
                <span className="block whitespace-nowrap">저희 두 사람의 소중한 시작에 귀한 걸음으로</span>
                <span className="block whitespace-nowrap">함께해 주시면 감사하겠습니다.</span>
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[22px] border border-[rgba(88,74,64,0.08)] bg-white/72 px-7 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] sm:px-9 lg:px-10">
                <p className="luxury-kicker text-muted">Date &amp; Time</p>
                <p className="mt-3 text-[clamp(0.76rem,1.8vw,0.84rem)] leading-8 tracking-[-0.015em] text-text sm:leading-8">
                  {formatFullDate(site.weddingDateTime)} {formatTime(site.weddingDateTime)}
                </p>
              </div>

              <div className="rounded-[22px] border border-[rgba(88,74,64,0.08)] bg-white/72 px-7 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] sm:px-9 lg:px-10">
                <p className="luxury-kicker text-muted">Venue</p>
                <p className="mt-3 text-[clamp(0.76rem,1.8vw,0.84rem)] leading-8 tracking-[-0.015em] text-text sm:leading-8">
                  {site.venue.name}
                </p>
                <div className="mt-1 flex items-start gap-2 text-[clamp(1rem,2.4vw,1.08rem)] leading-8 tracking-[-0.015em] text-muted sm:leading-8">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <p className="balanced-copy">{site.venue.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5 sm:mt-7 sm:gap-7">
        <SectionShell
          id="invitation"
          className="bg-[linear-gradient(180deg,rgba(255,250,246,0.96),rgba(251,245,239,0.92))]"
        >
          <SectionHeading eyebrow="Invitation" title={story.invitationTitle} align="center" />
          <div className="relative mx-auto mt-10 max-w-4xl px-3 text-center sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute left-1/2 top-8 h-28 w-28 -translate-x-1/2 rounded-full bg-[rgba(245,228,214,0.26)] blur-3xl" />

            <div className="relative">
              <p className="font-serif text-[1.68rem] leading-[1.06] tracking-[-0.04em] text-text sm:text-[2.35rem] lg:text-[2.8rem]">
                {site.couple.groom} &amp; {site.couple.bride}
              </p>
              <div className="mx-auto mt-5 h-px w-24 bg-[linear-gradient(90deg,transparent,rgba(184,143,115,0.55),transparent)]" />

              <p className="balanced-copy mx-auto mt-9 max-w-2xl text-[1rem] leading-[1.95] tracking-[-0.02em] text-text sm:text-[1.14rem] sm:leading-[2.05]">
                {story.invitationBody[0]}
              </p>

              <div className="mx-auto mt-7 h-10 w-px bg-[linear-gradient(180deg,rgba(184,143,115,0.06),rgba(184,143,115,0.44),rgba(184,143,115,0.06))]" />

              <div className="balanced-copy mx-auto mt-7 max-w-[56rem] space-y-6 text-[14px] leading-7 text-muted sm:text-[15px] sm:leading-8">
                {story.invitationBody.slice(1).map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>

<SectionShell id="details">
          <SectionHeading
            eyebrow="Wedding Details"
            title="편안한 식사와 함께 마음을 나누는 자리에 모십니다."
            align="center"
          />
          <div className="mt-8 grid gap-4">
            <div className="section-panel rounded-[26px] px-6 py-5 text-center sm:px-8 sm:py-6 lg:px-9 lg:py-7">
              <div className="flex items-center justify-center gap-3 text-text">
                <CalendarDays className="h-5 w-5 text-accent" />
                <p className="luxury-kicker text-muted">When</p>
              </div>
              <div className="mt-5">
                <p className="font-serif text-[clamp(1.12rem,3vw,1.4rem)] leading-[1.12] tracking-[-0.04em] text-text">
                  {formatFullDate(site.weddingDateTime)}
                </p>
                <p className="mt-2 font-serif text-[clamp(1.12rem,3vw,1.4rem)] leading-[1.12] tracking-[-0.04em] text-text">
                  {formatTime(site.weddingDateTime)}
                </p>
              </div>
            </div>

            <div className="px-2 sm:px-3">
              <Link
                href="/api/calendar"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-text px-5 py-4 text-sm font-semibold text-white transition duration-500 hover:bg-[#4c3f35]"
              >
                <span className="text-white">캘린더 추가</span>
                <CalendarDays className="h-4 w-4 text-white" />
              </Link>
            </div>

            <div className="section-panel rounded-[26px] px-6 py-5 sm:px-8 sm:py-6 lg:px-9 lg:py-7">
              <div className="flex items-center gap-3 text-text">
                <MapPinned className="h-5 w-5 text-accent" />
                <p className="luxury-kicker text-muted">Where</p>
              </div>
              <div className="mt-5">
                <p className="font-serif text-[clamp(1.12rem,3vw,1.4rem)] leading-[1.12] tracking-[-0.04em] text-text">
                  {site.venue.name}
                </p>
                <p className="balanced-copy mt-3 text-[clamp(0.98rem,2vw,1.08rem)] leading-8 text-text">
                  {site.venue.address}
                </p>
              </div>
            </div>

            <div className="px-2 sm:px-3">
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-text px-5 py-4 text-sm font-semibold text-white transition duration-500 hover:bg-[#4c3f35]"
              >
                <span className="text-white">오시는 길 보기</span>
                <ExternalLink className="h-4 w-4 shrink-0 text-white" />
              </a>
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
            title="함께한 계절의 몇 장면"
            align="center"
          />
          <Gallery photos={photos} />
        </SectionShell>

        {accounts.enabled ? (
          <SectionShell id="gift">
            <SectionHeading
              eyebrow="Blessing"
              title={accounts.title}
              description="신랑측과 신부측 연락처 및 계좌 정보를 한곳에 정리했습니다."
              align="center"
            />
            <AccountsSection content={accounts} />
          </SectionShell>
        ) : null}

        <SectionShell id="share">
          <div className="flex flex-col items-center gap-6 text-center">
            <SectionHeading
              eyebrow="Share"
              title="한 번의 탭으로 이 초대장을 전해보세요."
              align="center"
            />
            <ShareActions title={meta.title} text={meta.description} siteUrl={meta.siteUrl} />
          </div>
        </SectionShell>

        {site.bgm.enabled ? (
          <section className="sticky bottom-4 z-20 mx-auto w-full max-w-[22rem] px-4 pb-6">
            <BgmPlayer src={site.bgm.src} title={site.bgm.title} artist={site.bgm.artist} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
