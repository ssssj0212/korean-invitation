"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

type BgmPlayerProps = {
  src?: string;
  title?: string;
  artist?: string;
};

export function BgmPlayer({ src, title, artist }: BgmPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!src) {
    return null;
  }

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="panel flex items-center justify-between gap-4 px-5 py-4">
      <div>
        <p className="text-sm text-stone-500">BGM</p>
        <p className="text-base text-stone-900">{title ?? "배경 음악"}</p>
        {artist ? <p className="text-sm text-stone-500">{artist}</p> : null}
      </div>
      <button type="button" className="copy-chip h-10 w-10 justify-center" onClick={toggle}>
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      <audio ref={audioRef} src={src} loop onEnded={() => setPlaying(false)} onPause={() => setPlaying(false)} />
    </div>
  );
}
