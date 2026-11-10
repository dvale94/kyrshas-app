---
name: gortex-2-dirs
description: "Work in the . +2 dirs area — 5 symbols across 3 files (93% cohesion)"
---

# . +2 dirs

5 symbols | 3 files | 93% cohesion

## When to Use

Use this skill when working on files in:
- ``
- `src/screens/HomeScreen/birthdayData/data.js`
- `src/screens/HomeScreen/useHomescreen.js`

## Key Files

| File | Symbols |
|------|---------|
| `` | all, push |
| `src/screens/HomeScreen/birthdayData/data.js` | getBirthdayData, onRefresh |
| `src/screens/HomeScreen/useHomescreen.js` | fetchData |

## Entry Points

- `src/screens/HomeScreen/useHomescreen.js::fetchData`
- `src/screens/HomeScreen/birthdayData/data.js::onRefresh@72`

## How to Explore

```
analyze(operation:"communities", id:"community-5")
explore(operation:"context", task:"understand . +2 dirs", format:"gcx")
relations(operation:"usages", target:{symbol:"src/screens/HomeScreen/useHomescreen.js::fetchData"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
