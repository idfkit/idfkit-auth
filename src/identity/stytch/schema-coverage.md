# Style coverage of the sign-in widget (identity-2026.1)

Schema: `@stytch/core` 2.66.1, `StyleConfig`, read on 2026-10-30.

## Set

| Property | Value (dark theme) |
| -------- | ------------------ |
| `container.backgroundColor` | `#0c1222` |
| `container.borderColor` | `#141d35` |
| `container.borderRadius` | `16px` |
| `container.width` | `400px` |
| `colors.primary` | `#e2e8f0` |
| `colors.secondary` | `#94a3b8` |
| `colors.accent` | `#3b82f6` |
| `colors.success` | `#22c55e` |
| `colors.warning` | `#f59e0b` |
| `colors.error` | `#ef4444` |
| `buttons.primary.backgroundColor` | `#3b82f6` |
| `buttons.primary.textColor` | `#060a14` |
| `buttons.primary.borderColor` | `#3b82f6` |
| `buttons.primary.borderRadius` | `10px` |
| `buttons.secondary.backgroundColor` | `#0f1629` |
| `buttons.secondary.textColor` | `#e2e8f0` |
| `buttons.secondary.borderColor` | `#141d35` |
| `buttons.secondary.borderRadius` | `10px` |
| `buttons.disabled.backgroundColor` | `#0f1629` |
| `buttons.disabled.textColor` | `#64748b` |
| `buttons.disabled.borderColor` | `#141d35` |
| `buttons.disabled.borderRadius` | `10px` |
| `inputs.backgroundColor` | `#060a14` |
| `inputs.textColor` | `#e2e8f0` |
| `inputs.placeholderColor` | `#64748b` |
| `inputs.borderColor` | `#141d35` |
| `inputs.borderRadius` | `10px` |
| `fontFamily` | `Inter, system-ui, "-apple-system", "Segoe UI", Roboto, sans-serif` |
| `hideHeaderText` | `False` |
| `logo.logoImageUrl` | `https://github.com/idfkit/idfkit-brand/releases/download/identity-2026.1/lockup-on-dark.svg` |

## Not expressible

Parts of the standard the schema has no property for. Each is an Exception under `auth` in `touchpoints.toml` (FR-026).

| Part | Why |
| ---- | --- |
| `marks/mark.svg` | the widget takes a logo image by URL; the mark cannot be inlined in currentColor or sized by the page |
| `font.family.code` | the schema takes one fontFamily for all text; code and labels cannot be set in the label face |
| `font.weight.semibold` | the schema takes a family, not weights; buttons and headings render at the widget's own weights |
| `color.role.focus` | the widget draws its own focus ring; the schema exposes no focus colour |
| `color.role.link` | links inside the widget take the provider's default; the schema exposes no link colour |
| `family_links` | the widget renders no navigation; the page around it carries the family links |
| `ownership` | the widget renders its own footer; the page around it carries the ownership line |
| `motion.duration.base` | the widget's transitions are the provider's; the schema exposes no motion |
| `elevation.raised` | the widget's container has no shadow property |
| `space.2` | the widget's internal spacing is the provider's; the schema exposes only the container width |
