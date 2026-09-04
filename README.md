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
favicon.png    App-icon-style favicon, generated from the real DentFlow mark
assets/img/logos/
  dentflow-mark.png     Real DentFlow logo (nav, footer, product card, favicon)
  kobysoft-mark.png     Real Koby Soft icon mark (About page)
  kobysoft-logo.png / kobysoft-logo-white.png  Koby Soft wordmark lockups (light/dark bg)
  trueguardlabs-logo.png  TrueGuard Labs logo (shared sibling-product asset)
```

Each page keeps a small `<style>` block for page-specific layout (hero
variants, page-specific components) and a `window.pageTranslations` object
with that page's TR/EN copy, loaded before the shared `js/site.js`.

## Branding

The nav/footer/favicon use the real DentFlow logo (`assets/img/logos/dentflow-mark.png`),
clipped to a rounded-square with CSS (`border-radius` on `.logo-mark` / `.df-mark`
in `css/base.css`) since the source PNG has a flat white background rather than
transparency. The blue accent (`--blue: #3aa8ff`, `--blue-dim: #2286e0` in
`css/base.css`) was picked to match the logo's ribbon color — nudge it in that
file if you get an exact brand hex later.

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

## TODO

- Review the site (privacy notice, cookie/consent handling for GTM, data
  collection language) for UK/EU law conformance (GDPR / UK GDPR), not just
  Turkish KVKK.
