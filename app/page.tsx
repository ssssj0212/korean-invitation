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
      className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-16 pt-4 text-text sm:px-6 lg:px-8"
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

        <div className="relative grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[72svh] overflow-hidden rounded-[30px] border border-white/50"
          >
            <div className="absolute inset-0">
              <PhotoFrame
                src={heroPhoto?.src}
                alt={heroPhoto?.alt ?? "Wedding hero image"}
                priority
                className="min-h-[72svh] rounded-[30px]"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,14,10,0.08),rgba(23,18,14,0.18)_28%,rgba(40,28,20,0.58)_100%)]" />

            <div className="absolute inset-x-0 top-0 flex justify-start p-5 text-[#fdf5ef] sm:p-7">
              <div className="rounded-full border border-white/25 bg-black/10 px-4 py-2 backdrop-blur-sm">
                <p className="luxury-kicker text-[#f5e4d8]">모바일 청첩장</p>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 text-[#fdf8f3] sm:p-7">
              <p className="luxury-kicker mb-3 text-[#f0d9ca]">양가 가족과 함께</p>
              <h1 className="balanced-title mt-4 font-serif text-[2.5rem] leading-[0.94] tracking-[-0.05em] text-white sm:text-[3.4rem] lg:text-[4.5rem]">
                <span className="block">{site.couple.groom}</span>
                <span className="my-1 block text-[0.5em] leading-none text-[#f2ddd0]">&amp;</span>
                <span className="block">{site.couple.bride}</span>
              </h1>
              <div className="mt-4 max-w-[22rem] border-l border-white/25 pl-4 sm:mt-5 sm:max-w-md">
                <p className="balanced-copy text-[14px] leading-6 text-[#f8eee6] sm:text-base sm:leading-8">
                  {site.invitationLine}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[30px] border border-[rgba(88,74,64,0.08)] bg-[linear-gradient(180deg,rgba(255,252,248,0.95),rgba(247,239,232,0.9))] p-6 sm:p-8"
          >
            <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(184,143,115,0.45),transparent)]" />
            <div>
              <p className="luxury-kicker text-accent">Wedding Lunch</p>
              <p className="balanced-copy mt-5 text-[13.5px] leading-6 text-muted sm:text-[15px] sm:leading-8">
                {site.invitationLine}
              </p>
            </div>

            <div className="my-9 space-y-6">
              <div className="editorial-divider pt-6">
                <p className="luxury-kicker text-muted">Date &amp; Time</p>
                <p className="mt-3 font-serif text-[1.45rem] leading-[1.1] tracking-[-0.035em] text-text sm:text-[1.82rem]">
                  <span className="block">{formatFullDate(site.weddingDateTime)}</span>
                  <span className="mt-1 block text-[0.8em] tracking-[-0.02em]">at {formatTime(site.weddingDateTime)}</span>
                </p>
              </div>
              <div className="editorial-divider pt-6">
                <p className="luxury-kicker text-muted">Venue</p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-text">{site.venue.name}</p>
                <div className="mt-3 flex items-start gap-2 text-sm leading-7 text-muted">
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
          <SectionHeading eyebrow="Invitation" title={story.invitationTitle} description="소중한 분들을 정중히 초대합니다." align="center" />
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <p className="font-serif text-[1.65rem] leading-[1.06] tracking-[-0.04em] text-text sm:text-[2.35rem] lg:text-[2.75rem] lg:whitespace-nowrap">
              {site.couple.groom} &amp; {site.couple.bride}
            </p>
            <div className="mx-auto mt-6 h-px w-24 bg-[linear-gradient(90deg,transparent,rgba(184,143,115,0.55),transparent)]" />
            <div className="balanced-copy mt-8 space-y-5 text-[14px] leading-7 text-muted sm:text-[15px] sm:leading-8">
              {story.invitationBody.map((paragraph, index) => (
                <p key={`${paragraph}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="details">
          <SectionHeading
            eyebrow="Wedding Details"
            title="따뜻한 식사와 기쁜 마음을 나누는 자리에 초대합니다."
            description={site.venue.parkingNote}
            align="center"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="section-panel rounded-[26px] p-5 sm:p-6">
              <div className="flex items-center gap-3 text-text">
                <CalendarDays className="h-5 w-5 text-accent" />
                <p className="luxury-kicker text-muted">When</p>
              </div>
              <div className="mt-5">
                <p className="font-serif text-[1.85rem] leading-[1.06] tracking-[-0.04em] text-text sm:text-[2rem]">
                  {formatFullDate(site.weddingDateTime)}
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.22em] text-accent">
                  {formatTime(site.weddingDateTime)}
                </p>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">Eastern Time (ET)</p>
            </div>

            <div className="section-panel rounded-[26px] p-5 sm:p-6">
              <div className="flex items-center gap-3 text-text">
                <MapPinned className="h-5 w-5 text-accent" />
                <p className="luxury-kicker text-muted">Where</p>
              </div>
              <div className="mt-5">
                <p className="font-serif text-[1.65rem] leading-[1.08] tracking-[-0.03em] text-text sm:text-[1.9rem]">
                  {site.venue.name}
                </p>
                <p className="balanced-copy mt-3 text-sm leading-7 text-muted">{site.venue.address}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:items-start">
            <div className="sm:max-w-[320px]">
              <Link
                href="/api/calendar"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[rgba(88,74,64,0.08)] bg-white/80 px-5 py-4 text-sm font-semibold text-text transition duration-500 hover:border-accent/50 hover:text-accent"
              >
                캘린더 추가
                <CalendarDays className="h-4 w-4" />
              </Link>
            </div>

            <div className="sm:max-w-[320px]">
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-text px-5 py-4 text-sm font-semibold text-[#fff8f2] transition duration-500 hover:bg-[#4c3f35]"
              >
                지도 열기
                <ExternalLink className="h-4 w-4" />
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
            description="사진은 /public/photos 폴더와 content/photos.ts만 수정하면 교체할 수 있습니다."
            align="center"
          />
          <Gallery photos={photos} />
        </SectionShell>

        {accounts.enabled ? (
          <SectionShell id="gift">
            <SectionHeading
              eyebrow="Blessing"
              title={accounts.title}
              description="신랑측, 신부측 순서로 연락처와 계좌 정보를 함께 안내드립니다."
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
              description="링크 복사는 항상 동작하고, 지원되는 모바일 브라우저에서는 공유 메뉴가 바로 열립니다."
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
