---
name: gortex-1-dirs-parseapiresponse
description: "Work in the . +1 dirs · parseApiResponse area — 3 symbols across 2 files (100% cohesion)"
---

# . +1 dirs · parseApiResponse

3 symbols | 2 files | 100% cohesion

## When to Use

Use this skill when working on files in:
- ``
- `src/api/ApiProvider.js`

## Key Files

| File | Symbols |
|------|---------|
| `` | stringify, parse |
| `src/api/ApiProvider.js` | parseApiResponse |

## How to Explore

```
analyze(operation:"communities", id:"community-1")
explore(operation:"context", task:"understand . +1 dirs · parseApiResponse", format:"gcx")
```

_`format: "gcx"` returns the [GCX1 compact wire format](../../docs/wire-format.md) — round-trippable, ~27% fewer tokens than JSON. Drop it for JSON output; agents using `@gortex/wire` or the Go `github.com/gortexhq/gcx-go` package decode either._
