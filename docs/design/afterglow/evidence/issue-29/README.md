# Issue 29 visual evidence

## Owner refinements

The November 24 simulator run used the refined working tree on the existing issue branch. [Swipe recording](refined-swipes.mov) shows compact iPhone SE 3 upward and downward traversal and revisits. The artwork and content both move during the gesture. Because the artwork travels across the full display while the content pager occupies the safe-area viewport, their moving boundaries do not coincide exactly. The owner accepted this implementation tradeoff after physical iPhone testing and approved the visual appearance, swipe transitions, adaptive typography and overall experience.

[Short quote](refined-01-quote.jpg), [medium fact](refined-03-fact.jpg), [revealed trivia](refined-07-answer.jpg), [long reading](refined-10-long-reading.jpg), and [largest-text attribution](refined-overflow-05-complete-body-attribution.jpg) are actual simulator captures. The standard-sized concept captures used the synthetic `ConceptFixture`. The largest-text capture used `PagingFixture` on iPhone 17, iOS 27.2. The long fixture still scrolls after reaching the minimum body size.


The upper row of each comparison is cropped from the supplied board. The lower row is an actual iOS simulator capture of implementation `81b4ce06875438773e833e15e94132f9b86dc7e7`, using the external `ConceptFixture` and iOS 27.2. Cropping and scaling assemble comparisons without altering the individual captures.

- [Compact ready](compact-ready.png) and [interaction states](compact-states.png), iPhone SE third generation, 750 × 1334.
- [Standard ready](standard-ready.png) and [interaction states](standard-states.png), iPhone 17, 1206 × 2622.
- Individual JPEGs retain full simulator frames. Names 01–05 correspond to the five chapters, 06–10 to refresh, revealed answer, loading, error and long reading. [Standard default mock](standard-default-quote.jpg) and [trivia revisit](standard-default-trivia-revisit.jpg) use the restored production entry.
- [Asset provenance, sizes and hashes](assets.md).

Review found the board's framing has more generous phone margins, custom letterforms and stronger glow. System Georgia changes wrapping, and the narrower compact device moves the horizon relative to text. The board's joke uses a separately styled punchline, while the provider supplies one unstructured text field. The bucket-list checkbox is omitted. The visible back control, mock-mode caption and safe error message add practical information. These differences and the final artistic balance require owner approval.

The first compact pass revealed small pills and controls, and text crossing the joke's bright sun in an error state. The subsequent passes enlarged chrome, moved the retry action, adjusted individual horizon crops, and added a feathered scrim for longer or status-shifted text. The final captures above show those refinements. Background samples converted to sRGB at six nearby text-area points per chapter produced minimum estimated white-text contrast ratios of 10.84–17.99:1. This is a spot measurement of the captured short fixtures, not a contrast guarantee for every possible text position. Long and large text uses an opaque fallback.
