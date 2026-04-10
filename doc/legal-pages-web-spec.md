# 약관/법적 문서 웹페이지 작업 요청서

> **대상**: 앱 소개 웹사이트(with-stan.com) 작업자
> **목적**: Dear Us 앱에서 WebView로 로드할 법적 문서 HTML 페이지 생성
> **참고 문서**: `docs/글로벌.pdf` (Terms of Service v2.5 EN, Scenario-Hardened Final)

---

## 1. 필요한 페이지 목록

| 경로                         | 문서명                            | 비고                   |
| ---------------------------- | --------------------------------- | ---------------------- |
| `/legal/terms/{version}`     | 이용약관 (Terms of Service)       | v2.5부터               |
| `/legal/privacy/{version}`   | 개인정보처리방침 (Privacy Policy) |                        |
| `/legal/location/{version}`  | 위치기반서비스 이용약관           | 위치정보법 Art.16 준수 |
| `/legal/marketing/{version}` | 마케팅 정보 수신 동의 안내        | 선택 동의 안내용       |
| `/legal/opensource`          | 오픈소스 라이선스                 | 버전 불필요            |

### URL 규칙

- **버전 명시**: `/legal/terms/2.5?lang=ko`
- **최신 버전**: `/legal/terms/latest?lang=ko` → 서버에서 최신 버전으로 리다이렉트 또는 렌더링
- **언어 파라미터**: `?lang={ko|en|pt|es}` — 미지정 시 `en` 기본값
- **예시**: `https://with-stan.com/legal/terms/2.5?lang=ko`

---

## 2. 지원 언어

| 우선순위 | 언어 코드 | 대상                    |
| -------- | --------- | ----------------------- |
| 1차      | `ko`      | 한국어                  |
| 1차      | `en`      | 영어 (Controlling text) |
| 2차      | `pt`      | 포르투갈어 (브라질)     |
| 2차      | `es`      | 스페인어 (멕시코)       |

### 필수 규칙

- **EN이 원본(controlling text)** — 번역본 페이지 상단에 아래 문구 고정 표시:
  > "This is a translation provided for informational purposes only. In the event of any conflict between this translation and the English text, the English text prevails."
  > "이 번역은 정보 제공 목적으로만 제공됩니다. 본 번역과 영문 원본 사이에 충돌이 있을 경우, 영문 원본이 우선합니다."
- 미지원 언어 요청 시 → `en`으로 fallback
- 각 언어 페이지에서 다른 언어로 전환할 수 있는 언어 선택 링크 제공

---

## 3. 페이지 디자인/레이아웃 요구사항

### 3.1 공통 구조

```
┌─────────────────────────────────┐
│ [Dear Us 로고]                    │
│ 문서 제목                         │
│ 시행일: YYYY-MM-DD · 버전 vX.X    │
│ [ko] [en] [pt] [es]             │  ← 언어 전환
├─────────────────────────────────┤
│ ⚠ 번역 안내 배너 (EN 외 언어 시)   │
├─────────────────────────────────┤
│ 목차 (Table of Contents)         │
│  Article 1. ...                  │
│  Article 2. ...                  │
│  ...                             │
├─────────────────────────────────┤
│                                  │
│ 본문 (각 Article / Section)       │
│                                  │
├─────────────────────────────────┤
│ 회사 정보                         │
│ WithStan · 대표 현승환             │
│ support@with-stan.com            │
│ privacy@with-stan.com            │
│ 버전 이력: v1.0 → ... → v2.5     │
└─────────────────────────────────┘
```

### 3.2 스타일 요구사항

- **WebView 최적화**: 모바일 뷰포트 기준, `max-width: 100%`, 좌우 패딩 16~20px
- **폰트 크기**: 본문 15~16px, 제목 계층 명확히 (h1/h2/h3)
- **다크모드 대응**: `prefers-color-scheme: dark` 미디어 쿼리 지원
  - 배경: `#1a1a1a`, 텍스트: `#e0e0e0`
- **외부 리소스 의존 금지**: 웹폰트 CDN 등 외부 호출 없이, 시스템 폰트 사용
  - `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;`
- **인라인 CSS 권장**: 앱 WebView에서 별도 CSS 파일 로드 실패 가능성 대비
- **JavaScript 최소화**: 목차 앵커 이동 정도만, 복잡한 JS 사용 금지

### 3.3 강조 박스 스타일 (v2.5 PDF 참고)

PDF에 여러 종류의 강조 박스가 사용되었음. 아래 클래스로 통일:

| 클래스명            | 용도                           | 색상 (라이트)            | 색상 (다크)      |
| ------------------- | ------------------------------ | ------------------------ | ---------------- |
| `.legal-critical`   | 법적 필수 고지, 즉시 해지 조건 | 빨강 테두리, 연빨강 배경 | 어두운 빨강 배경 |
| `.legal-warning`    | 주의 사항, 면책 조항           | 주황 테두리, 연주황 배경 | 어두운 주황 배경 |
| `.legal-info`       | 법적 설명, 의무 고지           | 파랑 테두리, 연파랑 배경 | 어두운 파랑 배경 |
| `.legal-correction` | 이전 버전 대비 수정사항        | 보라 테두리, 연보라 배경 | 어두운 보라 배경 |

---

## 4. 문서별 컨텐츠 참고

### 4.1 이용약관 (`/legal/terms/2.5`)

v2.5 PDF 전문을 기반으로 아래 Article 구조로 작성:

- Article 1. 서비스 아키텍처, 역할 정의, 플랫폼 의무
- Article 2. 가입 자격, 연령 요건, 등록
- Article 3. 금지 콘텐츠, 무관용 정책, 집행
- Article 4. 데이터 처리, 보관, 유예기간, 법적 보존
- Article 5. 위치기반서비스 (한국법 전면 준수)
- Article 6. 사용자 콘텐츠: 소유권, 라이선스, 책임
- Article 7. 결제, 구독, 환불
- Article 8. 보증 부인 (현상태 제공)
- Article 9. 책임 제한
- Article 10. 면책
- Article 11. 불가항력
- Article 12. 마케팅 및 알림
- Article 13. 준거법, 관할, 분쟁해결
- Article 14. 서비스 변경, 중단, 종료
- Article 15. 분리조항, 권리포기, 완전합의
- Article 16. 구독, 결제, 해지 (앱 삭제 ≠ 구독 해지 경고 필수)
- Article 17. 계정 양도 불가, 사망 시 처리
- Article 18. 앱스토어 조항 (Apple/Google)
- Article 19. 법집행 협조, 사용자 알림 정책
- Article 20. 개인 운영자 문제 시 서비스 연속성

### 4.2 개인정보처리방침 (`/legal/privacy/2.5`)

- 별도 문서 필요 (현재 PDF에 포함되지 않음)
- 한국 PIPA, 브라질 LGPD, 멕시코 LFPDPPP, 필리핀 DPA 2012 준수
- 필수 포함 항목:
  - 수집하는 개인정보 항목
  - 수집 목적
  - 보유 기간 (v2.5 Article 4.2 표 참조)
  - 제3자 제공 (Firebase — US 서버 고지)
  - 파기 절차
  - 정보주체 권리
  - DPO 연락처: Kim Minjeong, dev@with-stan.com

### 4.3 위치기반서비스 약관 (`/legal/location/2.5`)

- 위치정보법 Art.16 의무 고지 포함 (v2.5 Article 5.1 참조):
  - 위치정보관리책임자: Kim Minjeong (dev@with-stan.com)
  - 이용·제공사실 확인자료 보관: 6개월
  - 수집 데이터: 실시간 GPS 좌표, 이동 경로, 체크인 완료 시간
  - 이용 목적: 연결된 파트너에게만 위치/안전 도착 알림 전송
  - 제공 대상: 연결된 파트너에게만
  - GPS 데이터 보관: 체크인 완료 7일 이내 자동 삭제
  - 동의 철회: 설정 > Safety Check-In > 비활성화

---

## 5. 앱 WebView 연동 시 고려사항

### 5.1 메타태그

각 페이지에 아래 메타태그 필수:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="legal-doc-type" content="terms" />
<meta name="legal-doc-version" content="2.5" />
<meta name="legal-doc-lang" content="ko" />
<meta name="legal-effective-date" content="2026-04-07" />
```

### 5.2 앱과의 인터페이스

- 페이지는 **독립적으로 동작**해야 함 (앱 외 브라우저에서도 정상 표시)
- 앱 WebView는 `?embed=true` 파라미터를 추가할 수 있음 → 이 경우:
  - 상단 네비게이션 바, 푸터 등 웹사이트 공통 UI 숨김
  - 문서 본문만 표시
  - 언어 전환 링크는 유지

### 5.3 캐싱

- HTTP 캐시 헤더: `Cache-Control: public, max-age=86400` (24시간)
- 약관 업데이트 시 버전 URL이 바뀌므로 캐시 무효화 자동 처리됨

---

## 6. 과거 버전 관리

- `/legal/terms/2.5`, `/legal/terms/2.4` 등 과거 버전도 접근 가능해야 함
- 용도: 사용자가 동의했던 시점의 약관을 확인할 수 있어야 함 (법적 투명성)
- 과거 버전 페이지 상단에 배너 표시:
  > "이 문서는 과거 버전(v2.4)입니다. 현재 유효한 버전은 [v2.5](/legal/terms/latest)입니다."

---

## 7. 회사 정보 (공통 푸터)

```
WithStan
대표: 현승환
소재지: 서울특별시 강북구 노해로 23길 123, 5층 503호
개인정보보호책임자(DPO) / 위치정보관리책임자: Kim Minjeong (dev@with-stan.com)
개인정보 문의: privacy@with-stan.com
고객지원: support@with-stan.com
```

---

## 8. 작업 체크리스트

- [ ] URL 라우팅 설정 (`/legal/{docType}/{version}?lang=xx`)
- [ ] `/legal/terms/2.5` — 한국어, 영어 페이지
- [ ] `/legal/privacy/2.5` — 한국어, 영어 페이지
- [ ] `/legal/location/2.5` — 한국어, 영어 페이지
- [ ] `/legal/marketing/2.5` — 한국어, 영어 페이지
- [ ] `/legal/opensource` — 라이선스 목록 페이지
- [ ] 다크모드 대응
- [ ] `?embed=true` 모드 (WebView용)
- [ ] `?lang=xx` 처리 및 fallback
- [ ] 과거 버전 배너
- [ ] 모바일 반응형 확인
- [ ] 메타태그 삽입

---

## 9. 앱 번들용 HTML 스냅샷 요청

웹 페이지 완성 후, 아래 파일을 **인라인 CSS, 외부 의존 없는 단일 HTML 파일**로 export해서 전달 부탁:

```
terms.ko.html
terms.en.html
privacy.ko.html
privacy.en.html
location.ko.html
location.en.html
```

이 파일들은 앱 번들 `assets/legal/` 폴더에 포함되어 **오프라인 fallback**으로 사용됩니다.
회원가입 시점에 네트워크 없이도 약관을 볼 수 있어야 법적으로 안전합니다.
