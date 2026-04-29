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
    <div className="mt-8 grid gap-4">
      <motion.div
        key={selectedPhoto.src || `${currentSelectedIndex}`}
        initial={{ opacity: 0.75, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="group relative overflow-hidden rounded-[30px] text-left"
      >
        <div className="flex min-h-[320px] items-center justify-center sm:min-h-[390px]">
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            width={selectedPhoto.width}
            height={selectedPhoto.height}
            className="block h-auto max-h-[319px] w-auto max-w-full rounded-[24px] object-contain sm:max-h-[389px]"
            loading="eager"
            decoding="async"
          />
        </div>
      </motion.div>

      <div className="flex min-h-full flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          {thumbnailItems.map(({ photo, index }) => (
            <motion.button
              key={`${photo.src}-${index}`}
              type="button"
              onClick={() => handleSelect(index)}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="pressable relative overflow-hidden rounded-[24px] text-left"
              aria-label={`${photo.alt} 선택`}
            >
              <div className="flex min-h-[150px] items-center justify-center sm:min-h-[180px]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="block h-auto max-h-[149px] w-auto max-w-full rounded-[18px] object-contain sm:max-h-[179px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.button>
          ))}
        </div>

        {safePhotos.length > THUMBS_PER_PAGE ? (
          <div className="flex items-center justify-between rounded-[22px] border border-[rgba(88,74,64,0.08)] bg-white/75 px-3 py-3 sm:px-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={isPrevDisabled}
              className={`pressable inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[clamp(0.8rem,3vw,0.92rem)] font-medium ${
                isPrevDisabled ? "cursor-default text-muted/45" : "text-text hover:text-accent"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <p className="text-[clamp(9px,2.6vw,11px)] uppercase tracking-[0.18em] text-muted">
              {currentPage + 1} of {totalPages}
            </p>
            <button
              type="button"
              onClick={goNext}
              disabled={isNextDisabled}
              className={`pressable inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[clamp(0.8rem,3vw,0.92rem)] font-medium ${
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
