# Afterglow visual specification — Phase 04A

Status: documentation-only design target for [issue #23](https://github.com/dvale94/kyrshas-app/issues/23). [Audit and reference provenance](../../migration/afterglow-design-audit.md). No Afterglow UI or production assets are implemented here. The owner approved the direction below; numerical tokens, font strategy and construction details are recommendations to test in later approved pilots.

## Approved principles

**“Five little moments, just for you.”** An elegant, magical, softly playful, cinematic sequence with a finite beginning and end. Let one thought own the screen. Use midnight navy/indigo, violet/lavender/teal/coral/amber sunset light, expressive readable type, soft restrained glow, immersive illustration and minimal floating controls. Content appears automatically; only trivia's answer needs deliberate reveal. Retain five worlds in the existing order. “Daily” is presentation language, with no implied uniqueness, timer, schedule, streak or persistence.

Do not copy phone hardware/status bars, the board's external title/reflection, baked-in text or illustrative data into the app. The system status bar is native chrome. “Kyrsha’s App” remains the product identity; the full board masthead is not a repeated in-app header consuming every chapter's reading space.

## Foundations and semantic palette

Use these sRGB recommendations as a small named token vocabulary; implement later without requiring a theme package. Keep illustration colors separate from semantic text/control tokens.

| Foundation / semantic token | Value | Use |
|---|---|---|
| midnight / canvas | `#0B1026` | Full viewport fallback; launch-to-content continuity is a later QA concern |
| indigo / surface | `#161D3D` | Opaque reading panel, pill, refresh and navigation backing |
| deep violet / elevated | `#24224D` | Answer surface or raised control group |
| white / text-primary | `#FFF8F5` | Body, headers and functional icons |
| lavender-mist / text-secondary | `#D8D2EC` | Author, status, chapter position and supporting copy |
| muted-lavender / progress-inactive | `#8E88B2` | Inactive segment on dark opaque track; active shape also differs |
| lavender / accent-quote | `#DAB7FF` | Quote identity and selected segment |
| violet-pink / accent-trivia | `#F3A6FF` | Trivia identity, question motif and answer outline |
| teal / accent-fact | `#6EE7EF` | Discovery identity and selected segment |
| coral / accent-joke | `#FFAF9E` | Warm identity, playful light |
| amber / accent-bucket | `#FFD18A` | Adventure identity, horizon light |
| coral / status-error | `#FFAF9E` | Error icon/text with explicit message; never color alone |
| teal / status-success | `#6EE7EF` | Optional settled status emphasis, no persistent success banner |
| white / control-stroke | `#D8D2EC` | Functional boundary on opaque indigo surface |

Use primary and secondary text only on measured dark surfaces. Chapter accents can serve as text/icons on those surfaces, never as a guarantee of readable text over arbitrary illustration. Selected progress uses a longer/thicker segment plus position text, not hue alone. Disabled/busy controls retain readable labels and indicate state semantically; lowered opacity is optional decoration, not the only state cue.

Text protection: opaque `surface` is the guaranteed fallback. An optional scrim of midnight at **at least 88% opacity** may replace it only after contrast is checked against worst-case white and actual artwork crops. Keep scrim behind the entire text/answer/author block; gradients alone cannot guarantee minimum contrast. Default to 4.5:1 for all text and 3:1 for meaningful icon/control boundaries. Glow is outside the glyph/border and cannot count toward contrast. See [computed pair and composite checks](feasibility-accessibility.md#contrast-and-readable-surfaces).

## Five illustration worlds

| ID / visible chapter | World and palette | Composition / negative space |
|---|---|---|
| `quote` / Quote | Lavender sunrise/horizons; midnight, `#7861AA` distant ridge, lavender, soft amber sun | Layered low horizons, sun below primary text; quiet upper-middle reading zone; no portrait or remote nature photo |
| `trivia` / Trivia | Cosmic curiosity; midnight, violet, pink, restrained starlight | Planet arc low, question/star motif off the reading block; question mark is decorative, never the only instruction |
| `fact` / Fact | Teal discovery/science; midnight, deep teal `#103D55`, cyan/teal light | Underwater or other scientific imagery; octopus/jellyfish is an example world, not mandatory literal art for unrelated facts; calm text zone above/detail below |
| `dad joke` / Dad Joke | Whimsical warm coral/amber cloud light against indigo | Soft smiling sun/cloud near lower third; playful without childish clutter; reserve full joke reading region |
| `bucket list item` / Bucket List Item | Aspirational mountain/adventure; violet ridges, coral horizon, amber dawn | Mountain paths/hiker silhouette low and clear of text; aspiration without implying the suggestion must involve mountains |

Worlds are category identity, not factual diagrams or depictions guaranteed to match arbitrary provider text. If an illustration would imply a misleading scientific claim or activity, use a more abstract category motif. No generated text in artwork. No new network image source, credential use, production image generation or asset-rights assumption.

## Typography strategy and scale

Recommend iOS system sans for functional UI and a verified system serif treatment for expressive reading, with a system sans fallback if a serif face is unavailable or poor at large sizes. Native system fonts avoid new dependencies/files and custom-font loading. Test actual supported family names/weights on the approved iPhone baseline before choosing one. A later licensed bundled serif can offer stronger consistency but adds rights review, font loading, size and Unicode/fallback responsibilities; do not select or install it in 04A.

| Role | Recommended base size / line height, logical points | Treatment |
|---|---|---|
| Product identity, when shown | 24 / 31 | Serif or system title; visible identity on first chapter or accessible home heading, not a blocking splash |
| Chapter body / question | 28 / 37 | Regular readable serif; 30 / 39 for very short quotes only if measured to fit |
| Trivia answer | 26 / 35 | Same readable family; no mandatory italic/script |
| Author / secondary text | 17 / 25 | System sans; natural case, wrap; do not shrink to imitate board microtype |
| Category pill | 16 / 22 | System sans semibold; title case preferred for readable wrapping, uppercase optional at standard sizes only |
| Buttons | 17 / 24 | System sans semibold, explicit text label when space permits |
| Status / error / navigation | 17 / 25 | System sans; full guidance, no tiny wide-tracked footer |
| Chapter position | 16 / 22 | “Quote, 1 of 5”; not a substitute for category heading |

All sizes participate in system font scaling. No `allowFontScaling=false`, content font shrinking, fixed line count, ellipsis or decorative forced line breaks. The board's italic quote and widely spaced capitals are optional accents: prefer normal roman for long text, very large text and controls. Track only short labels gently; never letterspace paragraphs. Do not force “UNKNOWN” attribution when author is absent; optional content stays omitted. Preserve punctuation/Unicode from validated content, and do not add duplicate quotation marks around text that already contains them.

## Geometry, layers and responsive rules

Logical points, not screenshot pixels. Baseline QA viewports: compact 375×667, standard 393×852 and large 430×932 portrait; also check the smallest available supported iPhone width. These are design test sizes, not a new supported-device declaration.

- Spacing scale: 4, 8, 12, 16, 24, 32, 48. Use 24 horizontal content gutter at standard widths, 16 at compact width; center reading block with maximum width 520, fluid within safe width. Maintain at least 8 between adjacent touch regions.
- Artwork fills behind status/home-indicator areas. Functional content uses measured top/bottom safe-area insets, never a hard-coded notch height. Add 12 above progress below top safe area, 16 between progress and category row, 24 between category/status and body. Footer has at least 12 above bottom safe inset. Do not double-apply automatic insets and explicit padding.
- Reading stack: position below category row, use a flexible 24–48 gap when content is short; compact/large-text mode uses 16–24. Lower artwork absorbs extra room. No fixed top coordinate or percentage height may clip content.
- Radii: category pill 999, circular refresh 24 at a 48×48 touch region, reading/answer panel 20, status panel 16. Padding 16–24 around body, 16 around answer/status. Stroke 1–2 on opaque surfaces. Avoid multiple competing luminous borders.
- Progress: five compact segments in a centered track with textual chapter position exposed accessibly; visual segments are decorative rather than five undersized buttons. Previous/Next are the standard navigation controls. Use stable high contrast and reserve a wrapping text row at large type.
- Layer order: canvas → static far atmosphere → world/low foreground art → dark reading scrim/surface → live text/status → functional controls/focus. Decorative layers do not intercept touches. Safe-area controls do not sit inside an image.
- Glow recommendation: one soft accent edge/light source per chapter, decorative opacity at most 0.25; no glow behind body glyphs, animated blur or full-screen flashing. Platform-specific shadow appearance is a later visual check, not a contractual pixel value.
- Long content reduces or removes visible foreground art before reducing reading space. Overflow switches to the [reading/navigation model](interaction-model.md#overflow-and-dynamic-type). Fixed page geometry contains a scrollable reading region, not clipped text. Controls and content remain reachable at the largest accessibility text size.

## Shared chapter hierarchy

Within each snapped viewport: safe-area chapter progress → category heading/pill and Refresh/Retry → optional status/error → primary content → optional author or trivia answer/control → flexible quiet artwork → Previous/Next navigation and contextual cue above home indicator. Navigation remains discoverable without a gesture. The refresh icon may be visually small but its touch area remains at least 48×48. A content title may wrap; category/action identity stays canonical. Mode information stays honest (mock versus live-local) in a readable secondary row; it must not be baked into art or become an unrelated settings feature.

Content and controls are live text. Art can be simplified or removed with no functional loss. Do not group a whole chapter into one accessibility element that hides buttons. See [focus and semantics](feasibility-accessibility.md#focus-semantics-and-operability).

## Chapter layout contracts

| Chapter | Normal hierarchy / content treatment | Short, long and optional cases |
|---|---|---|
| Quote | Quote pill + refresh; complete quote as primary reading; optional author below, separated by 16; lavender dawn in lower world | Short quote may center higher with larger quiet horizon. Long quote becomes leading-aligned readable paragraph with opaque surface and scroll region. Author wraps, stays attached after quote, and is omitted entirely when blank/absent. No invented author |
| Trivia | Trivia pill + refresh; full question; optional lower cosmic motif; Show Answer button; when expanded, labeled answer surface then Hide Answer | Hidden answer is absent from visual/accessibility reading tree. Long question and answer share one reading scroll region; opening answer preserves question context and keeps toggle reachable. Do not replace question with answer or require tap to reveal the question. Extra art yields space first |
| Fact | Fact pill + refresh; full fact; optional author if supplied; teal science world below text | A one-line fact still has a clear reading anchor. Long scientific text uses natural paragraphs, no keyword truncation. Art does not encode additional facts. Initial loading may show static skeleton bars and a visible status; no fake text or mandatory shimmer |
| Dad Joke | Dad Joke pill + refresh; full returned joke as one body; optional author after; warm cloud world | Current content has no setup/punchline fields. Do not split on punctuation or guess a punchline. A board-like warm italic punchline is only possible in a separately approved structured-content change; default stays complete text. Long joke scrolls, short joke uses quiet space |
| Bucket List Item | Full category label + refresh; complete suggestion; optional author after; aspirational mountains below | Full label can wrap; do not shorten the ID or obscure refresh. Long suggestion has the same complete reading fallback. Omit the board's checkbox: no saved/completed state, checkmark action, progress count or persistence. Final footer reads “Last chapter · Previous” and allows return by navigation, without looping automatically |

At standard text sizes short body text may center as in the boards. At overflow/large type use leading alignment for sustained reading. This is a responsive presentation rule, not a content rewrite. Never replace a provider failure with board example text. Reference example phrases are not fixtures or editorially approved production content.

## Review acceptance

Every chapter must work with short/very long body, optional author present/absent, no content image, pending/failed/retried data and largest Dynamic Type. Review typography, contrast, full control hit areas, safe areas and complete reading before adding glow or art. A successful 04A review accepts the written direction and pilot plan; actual iPhone visual/accessibility acceptance remains a later pilot.
