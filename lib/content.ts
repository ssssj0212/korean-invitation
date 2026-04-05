import { accounts } from "@/content/accounts";
import { contact } from "@/content/contact";
import { faq } from "@/content/faq";
import { meta } from "@/content/meta";
import { photos } from "@/content/photos";
import { schedule } from "@/content/schedule";
import { site } from "@/content/site";
import { story } from "@/content/story";
import type {
  AccountGroup,
  AccountsContent,
  ContactPerson,
  FaqItem,
  MetaContent,
  PhotoItem,
  ScheduleItem,
  SiteConfig,
  StoryContent,
} from "@/lib/types";
import { isNonEmptyString, isValidUrl, toIsoDate } from "@/lib/utils";

const fallbackSite: SiteConfig = {
  accentColor: "#b28d74",
  couple: {
    groom: "신랑",
    bride: "신부",
  },
  weddingDateTime: "2026-10-18T13:00:00+09:00",
  invitationLine: "소중한 분들을 정중히 모시고자 합니다.",
  venue: {
    name: "웨딩 베뉴",
    address: "서울시 중구 예시로 100",
  },
  rsvp: {
    label: "참석 여부 전달하기",
  },
  bgm: {
    enabled: false,
  },
};

const fallbackStory: StoryContent = {
  invitationTitle: "초대합니다",
  invitationBody: [
    "두 사람이 같은 마음으로 한날을 기다려 왔습니다.",
    "소중한 걸음으로 함께해 주시면 오래도록 감사히 간직하겠습니다.",
  ],
};

export function getSiteConfig(): SiteConfig {
  const weddingDate = toIsoDate(site.weddingDateTime) ? site.weddingDateTime : fallbackSite.weddingDateTime;

  return {
    accentColor: isNonEmptyString(site.accentColor) ? site.accentColor : fallbackSite.accentColor,
    couple: {
      groom: isNonEmptyString(site.couple?.groom) ? site.couple.groom : fallbackSite.couple.groom,
      bride: isNonEmptyString(site.couple?.bride) ? site.couple.bride : fallbackSite.couple.bride,
    },
    weddingDateTime: weddingDate,
    invitationLine: isNonEmptyString(site.invitationLine)
      ? site.invitationLine
      : fallbackSite.invitationLine,
    venue: {
      name: isNonEmptyString(site.venue?.name) ? site.venue.name : fallbackSite.venue.name,
      hall: isNonEmptyString(site.venue?.hall) ? site.venue.hall : undefined,
      address: isNonEmptyString(site.venue?.address)
        ? site.venue.address
        : fallbackSite.venue.address,
      mapUrl: isValidUrl(site.venue?.mapUrl) ? site.venue.mapUrl : undefined,
      parkingNote: isNonEmptyString(site.venue?.parkingNote) ? site.venue.parkingNote : undefined,
    },
    rsvp: {
      label: isNonEmptyString(site.rsvp?.label) ? site.rsvp.label : fallbackSite.rsvp.label,
      url: isValidUrl(site.rsvp?.url) ? site.rsvp.url : undefined,
    },
    bgm: {
      enabled: Boolean(site.bgm?.enabled && isValidUrl(site.bgm?.src)),
      title: isNonEmptyString(site.bgm?.title) ? site.bgm.title : undefined,
      artist: isNonEmptyString(site.bgm?.artist) ? site.bgm.artist : undefined,
      src: isValidUrl(site.bgm?.src) ? site.bgm.src : undefined,
    },
  };
}

export function getStory(): StoryContent {
  const body = Array.isArray(story.invitationBody)
    ? story.invitationBody.filter(isNonEmptyString)
    : [];

  return {
    invitationTitle: isNonEmptyString(story.invitationTitle)
      ? story.invitationTitle
      : fallbackStory.invitationTitle,
    invitationBody: body.length > 0 ? body : fallbackStory.invitationBody,
  };
}

export function getPhotos(): PhotoItem[] {
  if (!Array.isArray(photos)) {
    return [];
  }

  return photos
    .filter((item) => isNonEmptyString(item?.alt))
    .map((item) => ({
      src: isNonEmptyString(item.src) ? item.src : "",
      alt: item.alt.trim(),
      caption: isNonEmptyString(item.caption) ? item.caption : undefined,
    }));
}

export function getSchedule(): ScheduleItem[] {
  if (!Array.isArray(schedule)) {
    return [];
  }

  return schedule
    .filter((item) => isNonEmptyString(item?.time) && isNonEmptyString(item?.title))
    .map((item) => ({
      time: item.time.trim(),
      title: item.title.trim(),
      description: isNonEmptyString(item.description) ? item.description : undefined,
    }));
}

export function getContacts(): ContactPerson[] {
  if (!Array.isArray(contact)) {
    return [];
  }

  return contact
    .filter((item) => isNonEmptyString(item?.role) && isNonEmptyString(item?.name))
    .map((item) => ({
      role: item.role.trim(),
      name: item.name.trim(),
      phone: isNonEmptyString(item.phone) ? item.phone : undefined,
      kakaotalkId: isNonEmptyString(item.kakaotalkId) ? item.kakaotalkId : undefined,
      note: isNonEmptyString(item.note) ? item.note : undefined,
    }));
}

function normalizeGroups(groups: AccountGroup[]) {
  return groups
    .filter((group) => isNonEmptyString(group?.title) && Array.isArray(group?.accounts))
    .map((group) => ({
      id: isNonEmptyString(group.id)
        ? group.id
        : group.title.toLowerCase().replace(/\s+/g, "-"),
      title: group.title.trim(),
      collapsible: Boolean(group.collapsible),
      defaultOpen: Boolean(group.defaultOpen),
      accounts: group.accounts.filter(
        (account) =>
          isNonEmptyString(account?.bankName) &&
          isNonEmptyString(account?.accountNumber) &&
          isNonEmptyString(account?.accountHolder) &&
          isNonEmptyString(account?.label),
      ).map((account) => ({
        ...account,
        phone: isNonEmptyString(account.phone) ? account.phone : undefined,
        note: isNonEmptyString(account.note) ? account.note : undefined,
      })),
    }))
    .filter((group) => group.accounts.length > 0);
}

export function getAccounts(): AccountsContent {
  const groups = normalizeGroups(Array.isArray(accounts.groups) ? accounts.groups : []);

  return {
    enabled: Boolean(accounts.enabled) && groups.length > 0,
    title: isNonEmptyString(accounts.title) ? accounts.title : "마음 전하실 곳",
    description: isNonEmptyString(accounts.description) ? accounts.description : undefined,
    groups,
  };
}

export function getFaq(): FaqItem[] {
  if (!Array.isArray(faq)) {
    return [];
  }

  return faq
    .filter((item) => isNonEmptyString(item?.question) && isNonEmptyString(item?.answer))
    .map((item) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }));
}

export function getMeta(): MetaContent {
  return {
    title: isNonEmptyString(meta.title) ? meta.title : "Wedding Invitation",
    description: isNonEmptyString(meta.description)
      ? meta.description
      : "소중한 날에 함께해 주세요.",
    siteUrl: isValidUrl(meta.siteUrl) ? meta.siteUrl : undefined,
    ogImage: isValidUrl(meta.ogImage) ? meta.ogImage : undefined,
  };
}
