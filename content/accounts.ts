import type { AccountsContent } from "@/lib/types";

export const accounts: AccountsContent = {
  enabled: true,
  title: "마음 전하시는 곳",
  description: "축하의 마음을 전해 주실 분들을 위해 연락처와 계좌 정보를 정리해 두었습니다.",
  groups: [
    {
      id: "groom",
      title: "신랑 측",
      collapsible: true,
      defaultOpen: true,
      accounts: [
        {
          label: "아버지",
          bankName: "하나은행",
          accountNumber: "097-18-14531-4",
          accountHolder: "신창봉",
          phone: "010-1234-1001",
        },
        {
          label: "어머니",
          bankName: "국민은행",
          accountNumber: "792002-01-013850",
          accountHolder: "이예범",
          phone: "010-1234-1002",
        },
        {
          label: "장남",
          bankName: "광주은행",
          accountNumber: "133-121-830302",
          accountHolder: "신세진",
          phone: "010-1234-1003",
        },
      ],
    },
    {
      id: "bride",
      title: "신부 측",
      collapsible: true,
      defaultOpen: false,
      accounts: [
        {
          label: "아버지",
          bankName: "하나은행",
          accountNumber: "45391042563407",
          accountHolder: "김은철",
          phone: "010-5678-2001",
        },
        {
          label: "어머니",
          bankName: "하나은행",
          accountNumber: "45391037763407",
          accountHolder: "오영희",
          phone: "010-5678-2002",
        },
        {
          label: "장녀",
          bankName: "하나은행",
          accountNumber: "45391042471107",
          accountHolder: "김신혜",
          phone: "010-5678-2003",
        },
      ],
    },
  ],
};
