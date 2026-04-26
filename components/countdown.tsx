"use client";

import { useEffect, useState } from "react";

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
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <p className="balanced-copy text-[13px] leading-7 text-muted sm:text-[14.5px] sm:leading-8">소중한 날이 시작되었습니다.</p>;
  }

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="grid w-full max-w-[760px] grid-cols-4 gap-2 sm:gap-3">
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
