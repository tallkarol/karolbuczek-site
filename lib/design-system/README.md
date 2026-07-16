# Design system — 7-slot color kernel

Portable, framework-agnostic core of the color-configurator. Pure TypeScript (no
Next.js / app / brand imports) so it can be lifted into a standalone package. The
`/color-sampler` route is the studio UI on top of it; production routes consume
only the static CSS variables this kernel generates.

## The model (tiered)

| Tier | Roles | Purpose |
|---|---|---|
| **Core** (required) | `primary` · `background` · `surface` · `neutral` | Minimum viable palette (4 colors). |
| **Brand** (optional) | `secondary` · `accent` · `inverse` | May repeat from primary for simpler schemes — first-class, not a hack. |
| **Functional** (status) | `success` · `warning` · `danger` · `info` | Themeable defaults (green/amber/red/blue). Not part of the 7-color Coolors import. |

The 7 brand slots map 1:1 to the Coolors URL order (`primary, secondary, accent,
background, surface, inverse, neutral`). Status colors are a separate config with
built-in defaults (`DEFAULT_STATUS_COLORS`).

## How tokens are produced

`paletteToCssVars(system, mode)` derives the **entire** CSS variable set from the
7 slots + status config:

- **Primitive scale** (`--navy-*`, `--olive-*`, `--chiffon-*`, `--slate-*`) — slot hue+sat held, lightness set. Legacy names kept as aliases.
- **Semantic tokens** (`--background`, `--foreground`, `--heading`, `--card`, `--primary`, `--secondary`, `--accent`, `--muted`, `--border*`, `--ring`, `--popover`, …).
- **Status tokens** (`--success`/`--warning`/`--danger`/`--info` + `-foreground`). `--destructive` aliases `--danger`.
- **Per-environment legible foregrounds** (`--on-<role>`, `--on-<role>-muted`) consumed by the `kb-section-*` bands.

Every **foreground-on-background** token is routed through `legibleForeground()`
(WCAG contrast + OKLCH lightness search): it keeps the preferred hue/chroma and
only nudges lightness until the pair clears **WCAG 2.1 AA** (4.5 normal / 3.0
large). For the default brand palette this is a no-op; for arbitrary or simpler
palettes it auto-remediates so text stays legible. See `contrast.ts`.

## Environment utilities (in `app/globals.css`)

One class per role sets a band background and locally remaps `--foreground`,
`--heading`, `--muted-foreground`, `--accent`, `--card`, `--border` so nested
content re-themes automatically:

`kb-section-{primary|secondary|accent|background|surface|neutral|inverse}`,
`kb-hero-inverse`, `kb-surface-{inverse|elevated|selected|app}` (+ `tk-*` aliases).

## Usage rules (consuming components)

- **Page canvas** → `bg-background text-foreground`.
- **Branded bands** → one `kb-section-{role}`; children inherit, don't set text colors.
- **Dark heroes / CTAs / footers** → `kb-hero-inverse` / `kb-section-inverse` / `kb-surface-inverse`, text via `text-text-inverse` (never primitive `chiffon`/`cream`).
- **Cards** → `bg-card` + `border-border`.
- **Buttons / badges** → semantic variants / status tones only.
- **Never** hardcode `navy-*`, `olive-*`, `chiffon-*`, `cream`, or raw hex in components. Semantic tokens invert automatically in dark mode — stop hand-writing `dark:` primitive pairs.

## Single source of truth

`app/globals.css` is **generated**. The 7 slots + status defaults live in
`DEFAULT_COLOR_SYSTEM` / `DEFAULT_STATUS_COLORS`; `scripts/generate-tokens.ts`
emits the derived `:root`/`.dark` block between markers.

```bash
npx tsx scripts/generate-tokens.ts          # re-generate globals.css
npx tsx scripts/generate-tokens.ts --check  # CI: fail if stale
```

To re-theme the whole app: change the 7 slot hexes (and/or status colors), run
the generator. Everything re-derives, contrast-checked.

## Files

- `roles`/`system` (`palette.ts`) — role model, `ColorSystem`, create/parse/swap, Coolors I/O, status config.
- `palette.ts` `paletteToCssVars` — the derivation.
- `contrast.ts` — WCAG contrast + OKLCH `legibleForeground` (culori).
- `index.ts` — barrel.

## Extraction path (future, not built)

Lift `lib/design-system/` out as the package kernel; vendor the generic `ui/*`
primitives and abstract `next/link` + `next-themes` behind props so the sampler
becomes the studio UI; parameterize the default palette; ship `generate-tokens`
as a CLI. Publishing / multi-site config API is out of scope for the POC.
