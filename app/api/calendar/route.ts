import { NextResponse } from "next/server";

import { getMeta, getSiteConfig } from "@/lib/content";
import { formatDateTimeDisplay, toIsoDate } from "@/lib/utils";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function utcStamp(date: Date) {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

export async function GET() {
  const site = getSiteConfig();
  const meta = getMeta();
  const start = toIsoDate(site.weddingDateTime);

  if (!start) {
    return NextResponse.json({ error: "Invalid wedding date." }, { status: 400 });
  }

  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const location = [site.venue.name, site.venue.hall, site.venue.address].filter(Boolean).join(", ");
  const description = `${meta.description}\n\n일시: ${formatDateTimeDisplay(site.weddingDateTime)}\n장소: ${location}`;
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Korean Invitation//Wedding Calendar//KO",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@korean-invitation`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(start)}`,
    `DTEND:${utcStamp(end)}`,
    `SUMMARY:${site.couple.groom} · ${site.couple.bride} 결혼식`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;")}`,
    `LOCATION:${location.replace(/,/g, "\\,").replace(/;/g, "\\;")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "attachment; filename=wedding-invitation.ics",
    },
  });
}
