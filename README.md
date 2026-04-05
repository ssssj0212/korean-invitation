# Korean Wedding Invitation

독립 배포용 한국형 모바일 청첩장 프로젝트입니다. 기존 U.S. 청첩장 코드와 분리된 별도 Next.js 앱이며, 별도 Vercel 프로젝트와 별도 URL로 운영하는 것을 전제로 합니다.

## Local Run

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 됩니다.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy To Vercel

이 프로젝트 폴더만 따로 배포해야 합니다.

```bash
cd /Users/sejin/Documents/project/korean-invitation
npx vercel
```

프로덕션 배포:

```bash
cd /Users/sejin/Documents/project/korean-invitation
npx vercel --prod
```

Vercel에서 반드시 새 프로젝트로 연결하세요. 기존 U.S. 초대장 프로젝트에 연결하면 안 됩니다.

배포가 끝나면 실제 배포 URL을 아래 파일에 넣어 주세요.

- `/Users/sejin/Documents/project/korean-invitation/content/meta.ts`
  - `siteUrl`
  - `ogImage`

이 값을 넣으면 공유 링크와 Open Graph URL이 실제 한국 청첩장 주소를 사용합니다.

## What To Edit

### Couple names, accent color, wedding date/time, venue, RSVP, BGM
- [content/site.ts](/Users/sejin/Documents/project/korean-invitation/content/site.ts)

### Invitation wording
- [content/story.ts](/Users/sejin/Documents/project/korean-invitation/content/story.ts)

### Photos
1. 사진 파일을 [public/photos](/Users/sejin/Documents/project/korean-invitation/public/photos) 에 넣습니다.
2. 배열만 수정합니다: [content/photos.ts](/Users/sejin/Documents/project/korean-invitation/content/photos.ts)

컴포넌트는 수정할 필요가 없습니다.

### Timeline / schedule
- [content/schedule.ts](/Users/sejin/Documents/project/korean-invitation/content/schedule.ts)

### Contact info
- [content/contact.ts](/Users/sejin/Documents/project/korean-invitation/content/contact.ts)

### Gift / account numbers
- [content/accounts.ts](/Users/sejin/Documents/project/korean-invitation/content/accounts.ts)

계좌 섹션 전체 숨기기:
- `enabled: false`

계좌 추가/삭제:
- `groups` 배열 또는 각 그룹 안의 `accounts` 배열 수정

### FAQ
- [content/faq.ts](/Users/sejin/Documents/project/korean-invitation/content/faq.ts)

FAQ 전체 숨기기:
- 배열을 비워두면 됩니다

### SEO / share / Open Graph
- [content/meta.ts](/Users/sejin/Documents/project/korean-invitation/content/meta.ts)

## File Summary

- [app/page.tsx](/Users/sejin/Documents/project/korean-invitation/app/page.tsx): 메인 페이지 조립
- [app/layout.tsx](/Users/sejin/Documents/project/korean-invitation/app/layout.tsx): 메타데이터와 전역 레이아웃
- [app/api/calendar/route.ts](/Users/sejin/Documents/project/korean-invitation/app/api/calendar/route.ts): 캘린더 다운로드
- [components](/Users/sejin/Documents/project/korean-invitation/components): UI 컴포넌트
- [lib/content.ts](/Users/sejin/Documents/project/korean-invitation/lib/content.ts): 콘텐츠 검증 및 fallback 처리

## Behavior Notes

- 사진이 없으면 우아한 placeholder가 자동 표시됩니다.
- 계좌 정보가 비어 있거나 `enabled: false`이면 계좌 섹션이 숨겨집니다.
- RSVP 링크가 없으면 RSVP 섹션이 숨겨집니다.
- FAQ 배열이 비어 있으면 FAQ 섹션이 숨겨집니다.
- 공유 버튼은 `content/meta.ts`의 `siteUrl`을 우선 사용하고, 비어 있으면 현재 접속 URL을 사용합니다.

## Recommended Post-Deploy Checklist

1. 새 Vercel 프로젝트로 배포합니다.
2. 실제 배포 URL을 [content/meta.ts](/Users/sejin/Documents/project/korean-invitation/content/meta.ts)에 넣습니다.
3. 실제 사진 파일을 [public/photos](/Users/sejin/Documents/project/korean-invitation/public/photos)에 넣습니다.
4. RSVP 외부 링크를 실제 폼 주소로 바꿉니다.
5. 필요 시 계좌 섹션 공개 여부를 확인합니다.
