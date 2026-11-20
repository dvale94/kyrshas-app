# Afterglow feasibility, artwork and accessibility

Phase 04A recommendations for [issue #23](https://github.com/dvale94/kyrshas-app/issues/23). No package installed, artwork generated, native input changed or runtime performance measured. [Visual values](visual-specification.md), [interaction contract](interaction-model.md), [roadmap](implementation-roadmap.md). Public technical documentation was consulted November 19, 2026 (America/New_York); versions and compatibility must be checked again in any approved adoption pilot.

## Paging and motion approach

| Approach | Fit / benefits | Costs, constraints and decision |
|---|---|---|
| Built-in React Native ScrollView snapping | Five stable, lightweight mounted children; measured fixed page offsets; explicit programmatic navigation; no new package or native integration | Recommended first pilot. Full mounting has memory cost, so keep worlds lightweight. Must prove vertical snapping, one-step bounds, overflow-mode disabling, safe areas and VoiceOver on real iPhone simulator; a documentation API does not prove our geometry |
| Built-in FlatList paging | Potentially limits mounting if later art becomes expensive; stable ID data model | Virtualization can discard local read/answer/entrance state. No present need for five small pages; consider only with measured memory pressure and explicit state retention tests |
| Focused pager such as react-native-pager-view | Purpose-built page API; official project documents vertical paging | Not directly declared in the app; package/version/native compatibility and retained state need separate approval and proof. Do not install it or follow native setup instructions in 04A |
| Built-in Animated opacity/transform | Sufficient candidate for automatic entrance, small translation and brief replacement fade; native-driver option for supported properties | Recommended after static model passes. Prefer opacity/translation; do not animate paragraph height, every glow/shadow or per-frame React state. Cancel on unmount, inactive chapter or changed motion preference |
| Reanimated plus focused gesture tooling | Useful candidate for tightly coupled gestures, richer UI-thread motion or complex arbitration if a real limitation appears | Not required by the approved visual principles. Reanimated docs describe extra Worklets/native setup and architecture constraints; that introduces compatibility/build obligations. Defer unless built-in evidence fails a concrete acceptance criterion and owner approves dependency/native scope |

The [React Native ScrollView reference](https://reactnative.dev/docs/scrollview) documents explicit snap offsets, vertical alignment, programmatic scrolling and momentum controls. A later pilot can evaluate fixed offsets and momentum limiting; single-step behavior still needs device tests. Keep reading and chapter navigation separate in overflow mode. This recommendation is an inference from the API and the app's small five-slot model, not tested implementation evidence.

[Animated](https://reactnative.dev/docs/animated) documents declarative values/timing and a native-driver option. [Pager View](https://github.com/callstack/react-native-pager-view) is a focused alternative; [Reanimated's setup documentation](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) describes its added dependencies and native integration. These links are research evidence, not authorization to run installation, Pods or prebuild commands. No exact third-party version has been selected or claimed SDK-58-compatible.

## Motion budget and Reduce Motion

Recommended baseline, subject to actual iPhone review:

| Event | Standard motion | Reduce Motion / static fallback |
|---|---|---|
| First validated content becomes visible | One 180–240ms fade, optional translation ≤8pt; no wait timer | Immediate final text, no translation or staged delay |
| User changes chapter | Native bounded scroll/snap; explicit button navigation can animate only when allowed | Explicit navigation jumps directly to selected page; gesture settles without added animated travel |
| Trivia reveal/hide | Immediate layout update, optional ≤160ms opacity on answer; no expanding-height animation required | Immediate answer state, focus/control retained |
| Refresh success | Commit validated text first; optional ≤180ms replacement fade, never hide all content while pending | Immediate replacement |
| Loading | Static skeleton/status; platform busy indication without a decorative loop | Static status/busy glyph if needed; still expose busy semantics |
| Illustration parallax | Optional later experiment, active page only, ≤8pt relative movement; never device-tilt driven | None |
| Glow, starfields, clouds | Static by default; no particles, shimmer, perpetual orbit, auto camera drift or flash | Static |

Use initial motion preference plus change subscription before starting effects; if the preference is unresolved, show the static final state. On preference change cancel running entrance/parallax and settle content to its final visible state. Do not couple data availability, focus or control enablement to an animation callback. Stop decoration while inactive/backgrounded. [AccessibilityInfo](https://reactnative.dev/docs/accessibilityinfo) exposes motion and transparency preferences/events; the future pilot must exercise toggling during animation. Decorative motion adds no essential information, so removing it must lose nothing.

## Artwork construction, sourcing and performance

| Candidate | Visual potential | Trade-off / recommendation |
|---|---|---|
| Native View geometry and solid surfaces | Low horizons, sun, planet arc, abstract lights; crisp scaling and tiny incremental bundle | Recommended scaffold while testing layout. Complex octopus/mountain detail is costly as many Views; simplify rather than build hundreds of layers |
| Static local raster illustration | Closest candidate to cinematic conceptual worlds; predictable layers, no runtime drawing engine | Recommended production starting point only after rights/selection approval. Export art without text; crop at several aspect ratios; preserve dark reading space. Compression and decode cost must be measured |
| Separate static far/near layers | Modest parallax and responsive composition | More decoded images, alpha/overdraw and crop alignment complexity. Approve only if static art passes budget and parallax adds value |
| SVG/vector renderer or canvas/Skia | Scalable controlled diagrams or richer procedural scenes | Additional renderer/dependency/native work if absent; intricate paths/effects can be expensive. No evidence current design needs it; later separate approval |
| Remote photos or generated production assets | Not evaluated for implementation | Neither requested nor authorized. Do not call a random-photo provider or generation service, introduce asset transport/cache, or reuse private birthday photos |

Keep world ownership in presentation keyed by category; never add illustration URLs or remote renderers to the content validator. Missing/failed local asset falls back to canvas/solid readable surface without changing content success/error. Existing validated local placeholder metadata remains supported by its current contract; decorative category art is not a reason to weaken validation.

For each eventual asset record: creator/source URL or commissioning record, creation method (including AI involvement where relevant), license/version/permission evidence, commercial/distribution and derivative/crop rights, attribution requirement, owner approval, final file hash, dimensions/format, export/crop variants and accessibility classification. No rights evidence currently exists for shipping either supplied board. Avoid personal likenesses and birthday/private material. Font files need the same licensing/attribution review. Owner selects final artwork; no paid service is assumed.

Proposed art budgets are planning guardrails, not measured results or hard platform guarantees: ≤1MiB compressed per chapter and ≤5MiB incremental illustration bundle total; start with one raster at a time per chapter and active-plus-adjacent decoded heavy artwork where feasible. A 1170×2532 RGBA surface is about 11.3MiB decoded (width×height×4), so five full-size images can exceed 56MiB before other overhead despite small compressed files. Do not ship arbitrary 4K boards or multiple full-screen alpha/blur layers. Use appropriate resolution variants and focal crops; validate chosen format with the existing image pipeline before selecting it. No image-transform dependency is required by the spec.

Future measurement: record app/bundle sizes before and after, allocated-memory baseline/peak after ten full traversals and twenty scoped refreshes, dropped/hitching frames during paging, first-content paint and asset decode stalls on compact/standard/large iPhones. Target smooth 60Hz paging (about 16.7ms/frame) with no recurring visible hitches, no growth trend after cycles and no content delay added solely by art/motion; record actual measurements rather than treating this budget as proof. Stop and simplify assets if budget fails; escalating to a renderer/package is a separately reviewed choice. Only the active page animates; five lightweight data/text slots can stay mounted while decorative image resources are managed separately.

## Contrast and readable surfaces

Use [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) as the design benchmark: 4.5:1 normal text, 3:1 large text; this specification takes the stronger 4.5:1 target for all text. Meaningful icons/boundaries target 3:1 against adjacent surface, with selected/disabled/error semantics also communicated by shape/text. This is a design benchmark, not a legal conformance certification.

Computed with sRGB linearization and `(lighter luminance + .05) / (darker luminance + .05)` on the proposed solid tokens:

| Foreground | Midnight `#0B1026` | Surface `#161D3D` | Elevated `#24224D` |
|---|---:|---:|---:|
| Primary `#FFF8F5` | 17.91 | 15.66 | 14.17 |
| Secondary/stroke `#D8D2EC` | 12.85 | 11.23 | 10.17 |
| Inactive progress `#8E88B2` | 5.66 | 4.94 | 4.48 |
| Quote `#DAB7FF` | 10.93 | 9.55 | 8.65 |
| Trivia `#F3A6FF` | 10.49 | 9.17 | 8.30 |
| Fact `#6EE7EF` | 12.85 | 11.23 | 10.16 |
| Joke/error `#FFAF9E` | 10.64 | 9.30 | 8.42 |
| Bucket `#FFD18A` | 13.20 | 11.54 | 10.45 |

Inactive progress is not a body-text token and must remain on the opaque surface track. Midnight at 88% composited over white yields approximately `#282D40`: primary 12.99, secondary 9.32, accent minimum 7.61. This proves conservative arithmetic for those pairs only; actual gradients/opacity/pressed states and asset composites still need checking. Do not apply an overall opacity to the text/control group that undermines these pairs. Use opaque surfaces for Reduce Transparency, Increase Contrast or any unverified composite. Keep control outlines on their own dark backing, not directly over a bright sun.

Reproduction: convert each channel `c/255` to linear `c/12.92` when ≤0.04045, otherwise `((c+0.055)/1.055)^2.4`; luminance `0.2126R+0.7152G+0.0722B`. Composite channels before linearizing. The 04A report records the executed arithmetic check. It cannot certify the unimplemented screens.

## Focus semantics and operability

- At least **48×48 logical-point** action regions, preserving the current minimum (stronger than the common 44pt iOS target); 8pt separation, no overlap with system edges. Small drawn icons/segments do not justify smaller hit targets.
- Category is a heading. Progress is one “chapter X of 5” summary; inactive pages/decorative shapes are not focus targets. Do not group live controls inside a single accessible image/chapter wrapper.
- Refresh/Retry name includes canonical category; busy and disabled states match actual work; hint explains last-good retention. Spinner and skeleton are decorative. One settled announcement per explicit user action, no startup flood, no raw payload text.
- Show/Hide Answer exposes expanded state; hidden answer absent from reading order. Keep focus on the invoking control; do not move it to a decorative question mark or force reading the entire chapter again.
- After deliberate navigation focus the new active heading once. Controls and chapter actions must work with VoiceOver, Switch Control and accessible keyboard navigation where available. Sequential focus must not enter offscreen pages. A visible focus indicator must survive glow/backgrounds.
- Keep text scalable with no truncation, `adjustsFontSizeToFit`, fixed line count or disabled scaling; avoid restrictive font-scale caps. Respect system text preferences, Bold Text and sufficient line spacing. At maximum sizes content and controls scroll rather than collide.
- Never communicate state only by color, animation, location or icon shape. Safe error text explains load versus refresh, explicitly offers Retry and preserves last-good. A world is decorative unless it conveys distinct information; then provide one useful label and hide its child decoration.
- No automatic sound, tilt sensor, permission request, haptic prerequisite or timed interaction. Native status/home-indicator safe areas remain usable.

React Native's [accessibility guide](https://reactnative.dev/docs/accessibility) documents roles, states, labels/actions and offscreen semantics; [Text](https://reactnative.dev/docs/text) documents scaling controls. These APIs support an implementation but do not prove assistive behavior. Actual auditory VoiceOver, Switch Control, maximum Dynamic Type, Reduce Motion/Transparency and Increase Contrast review is required in the QA pilot. Record device/OS/build/fixture/settings and observations separately from unit-test props.

## Required future QA matrix

| Axis | Minimum cases / evidence |
|---|---|
| Layout | Compact 375×667, standard 393×852, large 430×932 portrait and smallest supported available iPhone; top/notch/home indicator and changed insets |
| Content | Short, multiline Unicode, very long title/body/author, blank/absent optional author/image, long question/answer, malformed data via synthetic provider |
| State | Initial pending/partial success/failure, overlapping refresh, repeated identical failures, last-good Retry recovery, stale provider and revisit with answer shown |
| Accessibility | Default and largest accessibility type; Bold Text; VoiceOver normal/overflow/retry/reveal/offscreen outcomes; Switch Control chapter navigation; Reduce Motion/Transparency and Increase Contrast |
| Art/performance | Solid fallback and each approved crop; actual composite contrast; ten traversals/twenty refreshes; memory/frame/bundle evidence; no offscreen animation |

All runtime rows are NOT RUN in 04A. Documentation completeness and contrast arithmetic are the applicable checks here. Do not start Metro/simulators, install dependencies, inspect credential files or alter native projects to fill this matrix during this pilot.
