export type OptionalString = string | null | undefined;

export type SiteConfig = {
  accentColor: string;
  couple: {
    groom: string;
    bride: string;
  };
  weddingDateTime: string;
  invitationLine: string;
  venue: {
    name: string;
    hall?: string;
    address: string;
    mapUrl?: string;
    parkingNote?: string;
  };
  rsvp: {
    label: string;
    url?: string;
  };
  bgm: {
    enabled: boolean;
    title?: string;
    artist?: string;
    src?: string;
  };
};

export type StoryContent = {
  invitationTitle: string;
  invitationBody: string[];
};

export type PhotoItem = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type ScheduleItem = {
  time: string;
  title: string;
  description?: string;
};

export type ContactPerson = {
  role: string;
  name: string;
  phone?: string;
  kakaotalkId?: string;
  note?: string;
};

export type AccountItem = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  label: string;
  phone?: string;
  note?: string;
};

export type AccountGroup = {
  id: string;
  title: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  accounts: AccountItem[];
};

export type AccountsContent = {
  enabled: boolean;
  title: string;
  description?: string;
  groups: AccountGroup[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type MetaContent = {
  title: string;
  description: string;
  siteUrl?: string;
  ogImage?: string;
};
