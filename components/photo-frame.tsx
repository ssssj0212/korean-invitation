 "use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type PhotoFrameProps = {
  src?: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
  fit?: "contain" | "cover";
};

export function PhotoFrame({
  src,
  alt,
  priority = false,
  className,
  sizes,
  fill = true,
  fit = "contain",
}: PhotoFrameProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={cn(
          "flex h-full min-h-[240px] w-full items-center justify-center rounded-[24px] border border-dashed border-line bg-[#f6efe8] text-center text-muted",
          className,
        )}
      >
        <div className="flex max-w-[200px] flex-col items-center gap-3 px-4">
          <ImageIcon className="h-8 w-8 text-accent" />
          <div>
            <p className="text-sm font-medium text-text">사진을 교체해 주세요</p>
            <p className="mt-1 text-xs leading-5 text-muted">`/public/photos`에 파일을 넣으면 됩니다.</p>
          </div>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        onError={() => setHasError(true)}
        priority={priority}
        sizes={sizes}
        className={cn(fit === "cover" ? "object-cover" : "object-contain", "transition duration-500 ease-out", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={2000}
      onError={() => setHasError(true)}
      priority={priority}
      sizes={sizes}
      className={cn("h-full w-full object-contain transition duration-500 ease-out", className)}
    />
  );
}
