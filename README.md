# DentFlow Marketing Site

Static marketing site for DentFlow — a multi-channel AI assistant (WhatsApp,
Instagram, Messenger, web widget) for dental clinics in Northern Cyprus (KKTC),
a product of Koby Soft. Plain HTML/CSS/JS, no build step, no framework,
no backend — deploys straight to Vercel from GitHub.

Built to match the structure, design system and TR/EN toggle pattern of
Koby Soft's other marketing site, [RentFlow](https://rentflow.com.tr), with
DentFlow's blue branding in place of RentFlow's lime-green.

## Pages

- `index.html` — Home: hero, features, regional band, demo teaser, trust strip.
- `dentflow.html` — "DentFlow Nedir?": 16 features grouped by category.
- `demo.html` — Live demo page: links out to the test clinic (Dr. Aslan Diş
  Polikliniği) running the DentFlow widget.
- `hakkimizda.html` — About Koby Soft, listing all three Koby Soft products
  (DentFlow, RentFlow, TrueGuard Labs).
- `iletisim.html` — Contact page with a form (posts to `/api/contact`, falls
  back to a `mailto:` link if that endpoint doesn't exist yet).
- `kvkk.html` — Turkish KVKK / privacy notice for this marketing site's own
  data collection (explicitly scoped separately from patient conversations
  handled by the DentFlow assistant itself, which are governed by each
  subscribing clinic's own policy).

## Structure

```
css/base.css   Shared design system (colors, layout, components)
js/site.js     Shared TR/EN i18n + mobile nav toggle logic
favicon.svg    Placeholder blue tooth-mark icon
assets/img/logos/  Koby Soft + TrueGuard Labs logos (shared sibling-product assets)
```

Each page keeps a small `<style>` block for page-specific layout (hero
variants, page-specific components) and a `window.pageTranslations` object
with that page's TR/EN copy, loaded before the shared `js/site.js`.

## Branding — placeholder, to be swapped

There is no real DentFlow logo file in this repo yet. The nav/footer "logo"
is an inline SVG mark (a simple blue tooth shape) plus a text wordmark —
swap both for the real logo once available. The blue accent
(`--blue: #3aa8ff`, `--blue-dim: #2286e0` in `css/base.css`) is a
placeholder; update to match the real DentFlow brand hex once provided.

## Live demo link

Every "Canlı Demo" / "Live Demo" CTA points to:

```
https://draslandis-demo.testsitehub.com
```

(the "Dr. Aslan Diş Polikliniği" test clinic site — see the separate
`dentflow-demo-site` repo). Search `draslandis-demo.testsitehub.com` across
the HTML files if this URL changes.

## Deploying

1. Push this repo to GitHub.
2. In Vercel: **New Project → Import Git Repository** → select this repo.
3. Framework preset: **Other**. No build command or output directory needed.
4. Deploy, then attach the real domain under **Project → Settings → Domains**
   once purchased.

No environment variables, no Railway, no server.
