"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

import type { PhotoItem } from "@/lib/types";
import { PhotoFrame } from "@/components/photo-frame";

export function Gallery({ photos }: { photos: PhotoItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items = photos.length > 0 ? photos : [{ src: "", alt: "웨딩 갤러리 준비 중" }];

  return (
    <>
      <div className="gallery-grid">
        {items.map((photo, index) => (
          <button
            key={`${photo.alt}-${index}`}
            type="button"
            className={index % 5 === 0 ? "col-span-2 sm:col-span-1" : ""}
            onClick={() => setActiveIndex(index)}
            aria-label={`${photo.alt} 크게 보기`}
          >
            <div
              className={`relative overflow-hidden ${
                index % 5 === 0 ? "min-h-[180px] sm:min-h-[360px]" : "min-h-[180px] sm:min-h-[240px]"
              }`}
            >
              <PhotoFrame
                src={photo.src}
                alt={photo.alt}
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 24vw"
              />
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b1512]/85 p-4 backdrop-blur-sm"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative h-[80svh] w-full max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-3 top-3 z-10 inline-flex rounded-full bg-white/85 p-2 text-text"
                onClick={() => setActiveIndex(null)}
                aria-label="닫기"
              >
                <X className="h-5 w-5" />
              </button>
              <PhotoFrame
                src={items[activeIndex]?.src}
                alt={items[activeIndex]?.alt ?? "확대 이미지"}
                fill={false}
                sizes="100vw"
                className="h-full rounded-[28px]"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
