import type { AccountsContent } from "@/lib/types";

export const accounts: AccountsContent = {
  enabled: true,
  title: "마음 전하시는 곳",
  description: "축하의 마음을 전해 주실 분들을 위해 연락처와 계좌 정보를 정리해 두었습니다.",
  groups: [
    {
      id: "groom",
      title: "신랑측",
      collapsible: true,
      defaultOpen: true,
      accounts: [
        {
          label: "아버지",
          bankName: "국민은행",
          accountNumber: "123-456789-01-001",
          accountHolder: "신창봉",
          phone: "010-1234-1001",
        },
        {
          label: "어머니",
          bankName: "국민은행",
          accountNumber: "123-456789-01-002",
          accountHolder: "이예범",
          phone: "010-1234-1002",
        },
        {
          label: "장남 신세진",
          bankName: "신한은행",
          accountNumber: "110-123-456789",
          accountHolder: "신세진",
          phone: "010-1234-1003",
        },
      ],
    },
    {
      id: "bride",
      title: "신부측",
      collapsible: true,
      defaultOpen: false,
      accounts: [
        {
          label: "아버지",
          bankName: "농협은행",
          accountNumber: "352-2087-1234-01",
          accountHolder: "김은철",
          phone: "010-5678-2001",
        },
        {
          label: "어머니",
          bankName: "하나은행",
          accountNumber: "351-910234-56702",
          accountHolder: "오영희",
          phone: "010-5678-2002",
        },
        {
          label: "장녀 김신혜",
          bankName: "하나은행",
          accountNumber: "321-910234-56707",
          accountHolder: "김신혜",
          phone: "010-5678-2003",
        },
      ],
    },
  ],
};
