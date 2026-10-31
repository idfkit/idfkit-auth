<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/idfkit/idfkit-brand/identity-2026.3/marks/mark-on-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/idfkit/idfkit-brand/identity-2026.3/marks/mark-on-light.svg">
    <img alt="idfkit" width="72" src="https://raw.githubusercontent.com/idfkit/idfkit-brand/identity-2026.3/marks/tile.png">
  </picture>
</p>

# idfkit-auth

The sign-in page for the hosted idfkit services, built on the provider's hosted widget.

[idfkit](https://idfkit.com) · [Developers](https://developers.idfkit.com) · [EnergyPlus docs](https://docs.idfkit.com) · [Envelop](https://app.idfkit.com) · [MCP](https://mcp.idfkit.com) · [Shoebox](https://shoebox.idfkit.com) · [GitHub](https://github.com/idfkit)

[![Release](https://img.shields.io/github/v/release/idfkit/idfkit-auth)](https://github.com/idfkit/idfkit-auth/releases) [![Build](https://github.com/idfkit/idfkit-auth/actions/workflows/check-identity.yml/badge.svg)](https://github.com/idfkit/idfkit-auth/actions/workflows/check-identity.yml) [![License](https://img.shields.io/github/license/idfkit/idfkit-auth)](https://github.com/idfkit/idfkit-auth)

## What the host does

`auth.idfkit.com` is the sign-in page of the hosted idfkit services. It is a React and Vite front end around the Stytch hosted widget: `/` offers email magic links and Google sign-in, `/authenticate` completes the magic-link or OAuth token exchange, `/oauth/authorize` serves the OAuth consent screen for connected applications, and `/billing` shows the signed-in account's balance and ledger. The page renders the idfkit identity at the level `package.json` declares (`idfkit.identity`): the derivation is vendored under `src/identity/`, the widget is configured from `src/identity/stytch/styles.json` and `styles.light.json`, and `npm run check` fails on any colour, font family or easing written outside that directory.

Commands: `npm run dev` serves the page on port 3000, `npm run build` type-checks and builds, `npm run check` runs the design-rule lint.
