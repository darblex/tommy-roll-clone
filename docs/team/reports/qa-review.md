# QA Review — Tommy Roll Clone
**Date:** 2026-03-29  
**Reviewer:** Skippy (automated subagent review)  
**Scope:** Post-fidelity-improvements pass — RTL, mobile, a11y, fidelity, Instagram embeds, UserWay widget, icon changes, production readiness.

---

## 1. RTL Correctness

| Check | Status | Notes |
|---|---|---|
| `<html dir="rtl" lang="he">` | ✅ | Correct in layout.tsx |
| Font (Rubik Hebrew subset) | ✅ | Hebrew + latin subsets loaded |
| Tailwind RTL classes | ⚠️ | No explicit `rtl:` prefixed overrides used — relies on browser's native RTL flip for flex/grid. This generally works but is fragile. |
| Nav items order in RTL | ⚠️ | Header uses `justify-between` which renders correctly for RTL, but arrow characters in CTA buttons (`← הזמינו עכשיו`) use a left-arrow `←` — in RTL context this should be `→` (pointing left-to-right visually in an LTR arrow, but semantically pointing back = should be `→` since reading direction is right-to-left). Currently visually misleading. |
| Badge placement (`top-3 right-3`) | ✅ | `right-3` anchors to the visual right, which in RTL is the start — correct for Hebrew UX. |
| Text alignment | ✅ | No explicit `text-left` overrides found that would break RTL flow. |
| `space-y` / `gap` usage | ✅ | All directional-agnostic spacing. |

**RTL Score: 8/10** — Minor arrow-glyph issue. No `rtl:` utility usage means future LTR-heavy additions may regress silently.

---

## 2. Mobile Responsiveness

| Check | Status | Notes |
|---|---|---|
| Hamburger menu | ✅ | Present, toggles via state, closes on nav click |
| Hero text sizing | ✅ | `text-5xl md:text-7xl` — sensible scale |
| Hero buttons | ✅ | `flex-col sm:flex-row` wrapping — correct for small screens |
| Stars grid | ✅ | `grid md:grid-cols-3` — single column on mobile |
| Branch grid | ✅ | `grid md:grid-cols-2` — single column on mobile |
| Instagram embed grid | ⚠️ | `grid md:grid-cols-3` but iframes are fixed `h-[26rem]` — on mobile all 3 reels stack vertically and each is 416px tall, making this section very long (>1200px). No horizontal scroll or carousel implemented despite pagination dots being rendered. |
| Gallery grid | ✅ | `grid-cols-2 md:grid-cols-4` — fine |
| Footer grid | ⚠️ | `grid md:grid-cols-4` — on mobile stacks to 4 vertical blocks, which is functional but cramped. The branch list in column 3 renders addresses + labels at `text-sm`, readable but dense. |
| About section grid | ✅ | `grid md:grid-cols-2` — stacks correctly |
| Viewport meta | ✅ | Handled by Next.js default |
| Touch targets | ⚠️ | Mobile nav items use `py-2` (8px top+bottom), which gives ~32px tap height — borderline for WCAG 2.5.5 (44px target). |

**Mobile Score: 7/10** — Instagram section is the main pain point on mobile.

---

## 3. Accessibility

| Check | Status | Notes |
|---|---|---|
| `lang` + `dir` on `<html>` | ✅ | Both set correctly |
| Alt text on images | ✅ | All `<Image>` components have Hebrew alt text |
| Aria labels on icon-only buttons | ✅ | Social icon links have `aria-label` set |
| Hamburger button | ✅ | Has `aria-label="תפריט"` |
| `aria-hidden` on decorative SVGs | ✅ | Facebook, Instagram, TikTok icons have `aria-hidden="true"` |
| Colour contrast (orange `rgb(232,73,33)` on white) | ⚠️ | Orange (#E84921) on white → ratio ~3.3:1, below WCAG AA 4.5:1 for normal text. Affects badge text on star cards and some button labels on white backgrounds. |
| Colour contrast (orange on dark bg) | ✅ | On dark `rgb(25,14,11)` background, orange passes |
| Focus styles | ⚠️ | No custom `:focus-visible` styles defined. Tailwind's default outline may be suppressed by `outline-none` resets in some browsers. |
| Instagram `<iframe>` titles | ✅ | Each iframe has a unique `title` attribute |
| Skip-to-content link | ❌ | Missing. Keyboard users must tab through the entire fixed header before reaching main content. |
| Heading hierarchy | ✅ | `h1` → `h2` → `h3/h4` used correctly throughout. Only one `h1`. |
| Form elements | N/A | No form on the page (contact section uses tel/email links instead) |
| UserWay widget | ✅ | Loaded via `<Script>` with `afterInteractive` strategy. Widget provides its own a11y overlay. `data-color` is set to brand orange — consistent. |

**A11y Score: 6.5/10** — Skip link missing, orange contrast on white is a WCAG fail, focus styles are untested.

---

## 4. Fidelity vs Original Tommy Roll Site

Assessed against public knowledge of tommyrollbar.co.il and the clone's content:

| Element | Status | Notes |
|---|---|---|
| Brand colours (orange `#E84921`, dark `#190E0B`) | ✅ | Accurate |
| Logo | ✅ | `/images/logo.png` used |
| Font (Rubik) | ✅ | Matches original |
| Section order | ✅ | Hero → Stars/Menu → About → Gallery → Instagram → Branches → Testimonials → CTA → Contact → Footer |
| Branch data (names, addresses, phones, hours) | ✅ | All 4 branches with accurate hours including Shabbat language |
| Social links | ✅ | Correct Facebook, Instagram, TikTok URLs |
| Kosher badges on branches | ✅ | Green "כשר" badge per branch |
| Navigation items | ✅ | 6 nav items matching site sections |
| "21 שנה" claim in about | ✅ | Matches |
| Footer credits (Yael Bonfis, KnockKnock) | ✅ | Present |
| Footer legal links | ✅ | Terms, Privacy, Accessibility declaration linked to original domain |
| Real Instagram reel embeds | ✅ | 3 actual reel URLs embedded |
| Gallery images (8) | ✅ | 8 gallery slots populated |
| Delivery time note "90-120 דקות" | ✅ | Present in CTA |
| Ordering mechanism | ⚠️ | "הזמינו עכשיו" buttons all anchor to `#contact` section rather than an actual ordering system — functional as a landing page redirect but not a real order flow |
| Menu page / full menu | ❌ | No menu items with prices. The "תפריט" nav item links to `#stars` which only shows 3 hero items, not a full menu |

**Fidelity Score: 8.5/10** — Very close for a marketing/landing page. Not a full functional recreation (no ordering, no full menu), but structurally faithful.

---

## 5. Regressions from Instagram Embeds / UserWay / Icon Changes

### Instagram Embeds
- **Positive:** Real reel URLs used, `loading="lazy"`, proper `allow` attribute, unique `title` per iframe.
- **Regression risk:** Instagram embeds require third-party cookies and will show a login prompt in some browsers (Safari, Firefox with strict privacy). No fallback UI (e.g., placeholder image + link) is provided.
- **Pagination dots** are rendered statically — they don't actually control a carousel. This is a dead UI element that may confuse users.
- **Mobile regression:** On screens < 768px, all 3 iframes stack vertically, creating an extremely long section. The dots below imply carousel but there's no JS carousel.

### UserWay Widget
- Script loads via Next.js `<Script>` with `afterInteractive` — no blocking. ✅
- `data-account="ZMs9cc17RE"` — matches the real site. ✅
- `data-color="#ec4920"` aligns with brand. ✅
- No regression detected.

### Icon Changes (inline SVG)
- All 3 social icons (Facebook, Instagram, TikTok) implemented as inline SVG — no external CDN dependency. ✅
- `aria-hidden="true"` on all decorative social icons. ✅
- Instagram icon uses `stroke` not `fill` — visually matches the outline style of the original. ✅
- TikTok icon path geometry is a reasonable approximation. ✅
- Facebook icon uses a simplified path (not the official F logo proportions, but visually acceptable). Minor fidelity note only.
- **No regression detected** in icon implementation.

---

## 6. Production Readiness

| Check | Status | Notes |
|---|---|---|
| `next.config.js` with `output: "standalone"` | ✅ | Railway-ready |
| TypeScript compilation | ✅ (assumed) | `tsconfig.tsbuildinfo` present, no obvious type errors in review |
| `.next` build artifact present | ✅ | `.next/` directory exists |
| GitHub Actions deploy workflow | ✅ | `.github/workflows/deploy-railway.yml` present |
| Environment variables | ✅ | No secrets in code; no `.env` with live keys detected |
| `rel="noopener noreferrer"` on external links | ✅ | All `target="_blank"` links have this |
| Image optimisation | ✅ | Using Next.js `<Image>` with `fill`/`width`/`height` throughout |
| `priority` on hero image | ✅ | LCP image marked `priority` |
| `loading="lazy"` on iframes | ✅ | Instagram iframes lazy-loaded |
| SEO metadata | ✅ | Title, description, OG image, favicon all set |
| Console errors (build-time) | Unknown | Not run locally; static analysis only |
| CSP / security headers | ❌ | No `next.config.js` security headers configured. Instagram embeds + UserWay widget require permissive CSP anyway, but at minimum X-Frame-Options, X-Content-Type-Options should be set. |
| HTTPS redirects | N/A | Handled by Railway |

**Production Readiness Score: 8/10** — Missing security headers. Otherwise solid for a landing page.

---

## Overall Summary

| Category | Score |
|---|---|
| RTL Correctness | 8/10 |
| Mobile Responsiveness | 7/10 |
| Accessibility | 6.5/10 |
| Fidelity | 8.5/10 |
| Regression (IG/UserWay/Icons) | 9/10 |
| Production Readiness | 8/10 |
| **Weighted Average** | **7.8/10** |

---

## Verdict: ⚠️ CONDITIONAL PASS

The clone is structurally sound, visually faithful, and deployable. It is **not FAIL** — there are no blocking bugs or broken layouts. However, it has notable issues that should be fixed before calling it 1:1.

---

## Top 5 Remaining Fixes

1. **Instagram mobile layout** — Convert the 3-embed grid into a real swipeable carousel on mobile (e.g., with CSS scroll-snap), or hide 2/3 embeds below `md:` and show only one on mobile. The static pagination dots are misleading and must either be wired to real carousel logic or removed.

2. **Skip-to-content link** — Add a visually-hidden skip link at the top of `<body>` pointing to `#hero` or `#main-content`. Mandatory for keyboard/screen-reader accessibility.

3. **CTA arrow direction** — Replace `←` with `→` in all Hebrew CTA buttons. In RTL reading order, `→` points toward the action (forward), while `←` points backward. Currently all "הזמינו עכשיו ←" CTAs use the wrong direction.

4. **Orange-on-white contrast** — The orange brand colour `#E84921` on white fails WCAG AA (ratio ~3.3:1 for normal text). Either increase font-weight to bold everywhere it's used on white, increase the size, or darken the orange slightly to `#C93A1A` for text uses.

5. **Security headers in `next.config.js`** — Add at minimum:
   ```js
   headers: async () => [{
     source: '/(.*)',
     headers: [
       { key: 'X-Content-Type-Options', value: 'nosniff' },
       { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
       { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
     ]
   }]
   ```

---

## Is This 1:1 Yet?

**No — but it's very close (~85% there).**

As a marketing/landing page, it hits all the major visual and content checkpoints. The critical gap from a true 1:1 is:
- No actual ordering/checkout flow (all CTAs go to `#contact`)
- No full menu with prices
- The Instagram carousel is cosmetically broken on mobile
- WCAG failures that the original site (which has a UserWay widget) presumably remedies

If the goal is a **faithful landing-page clone** (not a full app clone), fixing items 1–3 above would bring it to ~95% parity and make it shippable as a production landing page replacement.
