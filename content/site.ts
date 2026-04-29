import type { SiteConfig } from "@/lib/types";

export const site: SiteConfig = {
  accentColor: "#b58f77",
  couple: {
    groom: "신세진",
    bride: "김신혜",
  },
  weddingDateTime: "2026-06-04T11:30:00-04:00",
  invitationLine: "저희 두 사람의 소중한 시작에 귀한 걸음으로 함께해 주시면 감사하겠습니다.",
  venue: {
    name: "Manhattan, New York",
    hall: "",
    address: "Manhattan, New York",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Manhattan+New+York",
    parkingNote: "",
  },
  rsvp: {
    label: "참석 여부 전달하기",
    url: "",
  },
  bgm: {
    enabled: false,
    title: "Our Moment",
    artist: "Instrumental",
    src: "",
  },
};
