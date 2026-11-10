---
name: gortex-screens-homescreen-1-dirs
description: "Work in the screens/HomeScreen +1 dirs area — 6 symbols across 3 files (90% cohesion)"
---

# screens/HomeScreen +1 dirs

6 symbols | 3 files | 90% cohesion

## When to Use

Use this skill when working on files in:
- ``
- `src/screens/HomeScreen/HomeScreen.js`
- `src/screens/HomeScreen/useHomescreen.js`

## Key Files

| File | Symbols |
|------|---------|
| `` | catch, values |
| `src/screens/HomeScreen/HomeScreen.js` | handleSplashScreen, HomeScreen, Item |
| `src/screens/HomeScreen/useHomescreen.js` | useHomeScreen |

## Entry Points

- `src/screens/HomeScreen/HomeScreen.js::HomeScreen`
- `src/screens/HomeScreen/useHomescreen.js::useHomeScreen`
- `src/screens/HomeScreen/HomeScreen.js::handleSplashScreen`

## Connected Communities

- **. +2 dirs** (1 cross-edges)

## How to Explore

```
analyze(operation:"communities", id:"community-6")
explore(operation:"context", task:"understand screens/HomeScreen +1 dirs", format:"gcx")
relations(operation:"usages", target:{symbol:"src/screens/HomeScreen/HomeScreen.js::HomeScreen"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
