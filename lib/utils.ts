export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidUrl(value?: string) {
  if (!isNonEmptyString(value)) {
    return false;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function toIsoDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatFullDate(value: string) {
  const date = toIsoDate(value);

  if (!date) {
    return "날짜를 확인해주세요";
  }

  const formatted = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);

  return formatted.replace(/(토요일|일요일|월요일|화요일|수요일|목요일|금요일)$/, "$1,");
}

export function formatTime(value: string) {
  const date = toIsoDate(value);

  if (!date) {
    return "시간 미정";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function formatDateTimeDisplay(value: string) {
  return `${formatFullDate(value)} ${formatTime(value)}`;
}

export function googleCalendarUrl(input: {
  title: string;
  description: string;
  location: string;
  start: string;
}) {
  const start = toIsoDate(input.start);

  if (!start) {
    return null;
  }

  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const format = (date: Date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    details: input.description,
    location: input.location,
    dates: `${format(start)}/${format(end)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function mapSearchUrl(address: string) {
  const query = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
