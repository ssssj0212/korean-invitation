import type { SiteConfig } from "@/lib/types";

export const site: SiteConfig = {
  accentColor: "#b58f77",
  couple: {
    groom: "신세진",
    bride: "김신혜",
  },
  weddingDateTime: "2026-06-13T11:30:00-04:00",
  invitationLine: "저희 두 사람의 소중한 시작에 귀한 걸음으로 함께해 주시면 감사하겠습니다.",
  venue: {
    name: "Avra 33rd & Ninth",
    hall: "",
    address: "398 9th Ave, New York, NY 10001",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=398+9th+Ave+New+York+NY+10001",
    parkingNote: "Please arrive by 11:30 AM and kindly avoid being late so we may begin together on time.",
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
