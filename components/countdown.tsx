"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();

  if (Number.isNaN(diff) || diff <= 0) {
    return null;
  }

  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;

  return {
    days: Math.floor(diff / day),
    hours: Math.floor((diff % day) / hour),
    minutes: Math.floor((diff % hour) / minute),
    seconds: Math.floor((diff % minute) / 1000),
  };
}

export function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(getTimeLeft(targetDate));
    };

    const initialTimer = window.setTimeout(updateCountdown, 0);
    const timer = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="grid w-full max-w-full grid-cols-4 gap-2.5 sm:gap-3.5" aria-label="카운트다운을 준비하고 있습니다">
        {["Days", "Hours", "Min", "Sec"].map((label) => (
          <div key={label} className="countdown-item">
            <div className="flex items-end justify-center gap-1.5 sm:gap-2">
              <span className="countdown-value">--</span>
              <span className="countdown-label">{label}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="grid w-full max-w-full grid-cols-4 gap-2.5 sm:gap-3.5">
      {items.map((item) => (
        <div key={item.label} className="countdown-item">
          <div className="flex items-end justify-center gap-1.5 sm:gap-2">
            <span className="countdown-value">{String(item.value).padStart(2, "0")}</span>
            <span className="countdown-label">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
