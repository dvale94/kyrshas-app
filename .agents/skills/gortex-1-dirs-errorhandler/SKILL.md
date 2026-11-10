---
name: gortex-1-dirs-errorhandler
description: "Work in the . +1 dirs · errorHandler area — 3 symbols across 2 files (100% cohesion)"
---

# . +1 dirs · errorHandler

3 symbols | 2 files | 100% cohesion

## When to Use

Use this skill when working on files in:
- ``
- `src/api/axiosConfigs.js`

## Key Files

| File | Symbols |
|------|---------|
| `` | reject, error |
| `src/api/axiosConfigs.js` | errorHandler |

## Entry Points

- `src/api/axiosConfigs.js::errorHandler`

## How to Explore

```
analyze(operation:"communities", id:"community-2")
explore(operation:"context", task:"understand . +1 dirs · errorHandler", format:"gcx")
relations(operation:"usages", target:{symbol:"src/api/axiosConfigs.js::errorHandler"}, format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
