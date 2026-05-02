"use client";
/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import type { PhotoItem } from "@/lib/types";

const THUMBS_PER_PAGE = 4;

export function Gallery({ photos }: { photos: PhotoItem[] }) {
  const safePhotos = useMemo(
    () => (photos.length ? photos : [{ src: "", alt: "Wedding gallery image" }]),
    [photos],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(safePhotos.length / THUMBS_PER_PAGE));
  const currentSelectedIndex = Math.min(selectedIndex, safePhotos.length - 1);
  const currentPage = Math.min(page, totalPages - 1);

  const thumbnailItems = useMemo(() => {
    const start = currentPage * THUMBS_PER_PAGE;
    return safePhotos.slice(start, start + THUMBS_PER_PAGE).map((photo, index) => ({
      photo,
      index: start + index,
    }));
  }, [currentPage, safePhotos]);

  const selectedPhoto = safePhotos[currentSelectedIndex] ?? safePhotos[0];

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setPage(Math.floor(index / THUMBS_PER_PAGE));
  };

  const goPrev = () => {
    setPage((current) => Math.max(0, current - 1));
  };

  const goNext = () => {
    setPage((current) => Math.min(totalPages - 1, current + 1));
  };

  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = currentPage === totalPages - 1;
  return (
    <div className="mt-8 grid gap-5">
      <motion.div
        key={selectedPhoto.src || `${currentSelectedIndex}`}
        initial={{ opacity: 0.76, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="group relative overflow-hidden rounded-[28px] text-left"
      >
        <div className="flex min-h-[320px] items-center justify-center sm:min-h-[390px]">
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            width={selectedPhoto.width}
            height={selectedPhoto.height}
            className="editorial-photo block h-auto max-h-[319px] w-auto max-w-full object-contain sm:max-h-[389px]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>

      <div className="flex min-h-full flex-col gap-4">
        <div className="grid grid-cols-2 gap-3.5">
          {thumbnailItems.map(({ photo, index }) => (
            <motion.button
              key={`${photo.src}-${index}`}
              type="button"
              onClick={() => handleSelect(index)}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="pressable relative overflow-hidden rounded-[22px] text-left"
              aria-label={`${photo.alt} 선택`}
            >
              <div className="flex min-h-[150px] items-center justify-center sm:min-h-[180px]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="editorial-photo block h-auto max-h-[149px] w-auto max-w-full rounded-[18px] object-contain sm:max-h-[179px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.button>
          ))}
        </div>

        {safePhotos.length > THUMBS_PER_PAGE ? (
          <div className="flex items-center justify-between rounded-[24px] border border-[rgba(215,196,174,0.82)] bg-[rgba(255,252,247,0.76)] px-3 py-3 shadow-[0_10px_22px_rgba(67,49,35,0.028)] sm:px-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={isPrevDisabled}
              className={`pressable inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3 py-2 text-[clamp(0.84rem,3vw,0.94rem)] font-medium ${
                isPrevDisabled ? "cursor-default text-muted/45" : "text-text hover:text-accent"
              } ${isPrevDisabled ? "border-transparent bg-transparent" : "border-[rgba(215,196,174,0.76)] bg-[rgba(255,252,247,0.68)] hover:bg-[rgba(255,255,255,0.82)]"}`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <p className="font-sans text-[clamp(10px,2.6vw,11.5px)] uppercase tracking-[0.18em] text-muted">
              {currentPage + 1} of {totalPages}
            </p>
            <button
              type="button"
              onClick={goNext}
              disabled={isNextDisabled}
              className={`pressable inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3 py-2 text-[clamp(0.84rem,3vw,0.94rem)] font-medium ${
                isNextDisabled ? "cursor-default text-muted/45" : "text-text hover:text-accent"
              } ${isNextDisabled ? "border-transparent bg-transparent" : "border-[rgba(215,196,174,0.76)] bg-[rgba(255,252,247,0.68)] hover:bg-[rgba(255,255,255,0.82)]"}`}
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
