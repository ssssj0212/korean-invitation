"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import type { PhotoItem } from "@/lib/types";
import { PhotoFrame } from "@/components/photo-frame";

export function Gallery({ photos }: { photos: PhotoItem[] }) {
  const safePhotos = useMemo(
    () => (photos.length ? photos : [{ src: "", alt: "웨딩 갤러리 준비 중" }]),
    [photos],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, setPage] = useState(0);
  const thumbnailsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(safePhotos.length / thumbnailsPerPage));
  const currentSelectedIndex = Math.min(selectedIndex, safePhotos.length - 1);
  const currentPage = Math.min(page, totalPages - 1);
  const thumbnailItems = useMemo(() => {
    const start = currentPage * thumbnailsPerPage;
    return safePhotos.slice(start, start + thumbnailsPerPage).map((photo, index) => ({
      photo,
      index: start + index,
    }));
  }, [currentPage, safePhotos]);
  const selectedPhoto = safePhotos[currentSelectedIndex] ?? safePhotos[0];

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setPage(Math.floor(index / thumbnailsPerPage));
  };

  const goPrev = () => setPage((current) => Math.max(0, current - 1));
  const goNext = () => setPage((current) => Math.min(totalPages - 1, current + 1));
  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage === totalPages - 1;

  return (
    <div className="mt-8 grid gap-4 [--gallery-main:clamp(300px,58vw,430px)] [--gallery-thumb:clamp(138px,26vw,195px)] sm:[--gallery-main:clamp(340px,48vw,500px)] sm:[--gallery-thumb:clamp(158px,22vw,230px)] lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:[--gallery-main:clamp(380px,36vw,520px)] lg:[--gallery-thumb:clamp(175px,16vw,240px)] xl:[--gallery-main:clamp(400px,34vw,540px)] xl:[--gallery-thumb:clamp(185px,15vw,250px)]">
      <div className="relative h-[var(--gallery-main)] overflow-hidden rounded-[30px] border border-[rgba(88,74,64,0.08)] bg-white/60">
        <PhotoFrame
          src={selectedPhoto.src}
          alt={selectedPhoto.alt}
          priority
          sizes="(max-width: 1024px) 100vw, 52vw"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(23,18,14,0)_0%,rgba(27,20,15,0.38)_100%)] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#f3e3d7]">Selected Photo</p>
              <p className="mt-2 text-sm font-medium tracking-[-0.01em] text-[#fffaf6] sm:text-base">
                {selectedPhoto.alt}
              </p>
            </div>
            <span className="rounded-full border border-white/20 bg-black/15 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#f3e3d7] backdrop-blur-sm">
              {currentSelectedIndex + 1} / {safePhotos.length}
            </span>
          </div>
        </div>
      </div>

        <div className="flex min-h-full flex-col gap-4">
        <div className="flex items-center justify-start">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Gallery Preview</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {thumbnailItems.map(({ photo, index }) => {
            const isSelected = index === currentSelectedIndex;

            return (
              <motion.button
                key={`${photo.alt}-${index}`}
                type="button"
                onClick={() => handleSelect(index)}
                whileTap={{ scale: 0.985 }}
                className="group h-full text-left"
                aria-label={`${photo.alt} 선택`}
              >
                <div
                  className={`relative h-[var(--gallery-thumb)] overflow-hidden rounded-[24px] border bg-white/70 ${
                    isSelected
                      ? "border-[rgba(184,143,115,0.55)] shadow-[0_18px_30px_rgba(91,67,49,0.12)]"
                      : "border-[rgba(88,74,64,0.08)]"
                  }`}
                >
                  <PhotoFrame
                    src={photo.src}
                    alt={photo.alt}
                    sizes="(max-width: 1024px) 50vw, 28vw"
                    className="rounded-[24px]"
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 transition duration-300 ${
                      isSelected
                        ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(23,18,14,0.18))]"
                        : "bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(23,18,14,0.06))]"
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(23,18,14,0)_0%,rgba(27,20,15,0.38)_100%)] px-4 py-3">
                    <p className="text-xs font-medium text-[#fffaf6]">{photo.alt}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {safePhotos.length > thumbnailsPerPage ? (
          <div className="flex items-center justify-between rounded-[22px] border border-[rgba(88,74,64,0.08)] bg-white/75 px-4 py-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={isPrevDisabled}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition ${
                isPrevDisabled ? "cursor-default text-muted/45" : "text-text hover:text-accent"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <p className="text-[11px] uppercase tracking-[0.26em] text-muted">
              {currentPage + 1} / {totalPages}
            </p>
            <button
              type="button"
              onClick={goNext}
              disabled={isNextDisabled}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition ${
                isNextDisabled ? "cursor-default text-muted/45" : "text-text hover:text-accent"
              }`}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
