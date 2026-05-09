# Hugo site

This repo is a [Hugo](https://gohugo.io/) site. Every page is a plain
markdown file with a few lines of front matter; everything else is
normal `## headings`, paragraphs, lists, links, and images. A small
shortcode library (cards, eyebrows, buttons, carousel, split rows)
covers the parts that need richer rendering.

## Quick reference

```sh
hugo server          # local dev at http://localhost:1313/
hugo                 # one-shot build to ./public/
hugo --gc --minify   # what GitHub Actions runs
```

## What's in the repo

```
hugo.toml                          # site config (baseURL, menus, markup options)
archetypes/default.md              # `hugo new <path>` scaffold
content/                           # markdown source files
  _index.md                        # home page
  about.md
  beta-testing.md
  download.md
  privacy.md
  tracking-methodology.md
layouts/                           # templates + shortcodes
  _default/
    baseof.html                    # <html>/<head>/<body> shell
    single.html                    # subpage layout
    _markup/render-image.html      # img render hook (size hints via ?w=...)
  index.html                       # home page layout
  partials/
    site-header.html               # brand lockup + nav menu
    toc.html                       # table-of-contents partial (when toc:true)
  shortcodes/
    eyebrow.html                   # small caps muted kicker
    brandline.html                 # italic muted brand line
    button.html                    # rounded primary/secondary CTAs
    card.html                      # one rounded panel
    split-begin.html, split-card.html, split-end.html  # side-by-side cards
    carousel.html, carousel-slide.html                  # image carousel
static/                            # passthrough assets (copied verbatim to public/)
  CNAME                            # GitHub Pages custom domain
  favicon.ico, assets/             # site images + favicons
  urlstrip/                        # release notes + rules JSON (CDN endpoints)
  markdown-site.css                # the site's stylesheet
  markdown-site.js                 # carousel JS
.github/workflows/hugo.yml         # CI: build with Hugo, deploy to Pages
.gitignore                         # ignores /public/, /resources/, .hugo_build.lock
```

## Editing content

Each page looks like this:

```markdown
---
title: "Page title - Tacita Labs"     # browser tab + <title>
description: "..."                    # SEO + Open Graph
url: "/about.html"                    # forces output filename (preserves
                                      # existing live-site URLs)
toc: true                             # optional, default off; renders a
                                      # Contents box at the top of the page
---

# Page heading

Lede paragraph or whatever you want.

## Section heading

Normal markdown body. **Bold**, *italic*, `inline code`, [links](url),
bullet lists, numbered lists, code fences, images, tables --- all of it
works the way you'd expect from any markdown processor.

- list item one
- list item two

## Another section

More markdown.
```

## Shortcodes (reusable styled bits)

For things that don't fit neatly into vanilla markdown, the site ships
four small shortcodes:

### `{{< eyebrow >}}` --- small caps muted text

Renders as a small uppercase muted line. When placed immediately above
an h1/h2/h3 (with a blank line between), it sits tight to that heading
so the two read as one unit. When placed below content, it acts as a
small "footer" caption.

```markdown
{{< eyebrow >}}URLSTRIP{{< /eyebrow >}}

# Remove tracking junk from links.

...

{{< eyebrow >}}Runs locally - no account - free{{< /eyebrow >}}
```

### `{{< brandline >}}` --- italic muted brand line

Same tight-to-heading behavior, italic muted text. Used for the
Latin/English brand mantra under the URLSTRIP eyebrow:

```markdown
{{< brandline >}}<span lang="la">Silentium servat</span> - silence protects.{{< /brandline >}}
```

### `{{% card %}}` --- a single rounded card

Same look as a split-card, but standalone (no begin/end wrappers
needed). Use this for one-off panels.

```markdown
{{% card %}}
## Contact {#contact}

For product questions, feedback, or general inquiries, reach out at
[hello@tacitalabs.com](mailto:hello@tacitalabs.com).
{{% /card %}}
```

Note the `{{%` (percent) delimiters, not `{{<` -- that's what tells
Hugo to process the inner body as markdown. For two or more cards
side-by-side, use the `split-begin` / `split-card` / `split-end` group
below instead.

### `{{< split-begin >}}` / `{{% split-card %}}` / `{{< split-end >}}` --- side-by-side cards

Three small shortcodes that wrap content in a side-by-side row of cards,
matching the hero layout of the original site (left column with title +
buttons, right column with the URL comparison panel).

```markdown
{{< split-begin >}}

{{% split-card %}}
{{< eyebrow >}}URLSTRIP{{< /eyebrow >}}

# Remove tracking junk from links.

URLStrip strips known tracking parameters before you open a link...

{{< button href="#downloads" style="primary" >}}Download URLStrip{{< /button >}}
{{< button href="#how" style="secondary" >}}See how it works{{< /button >}}
{{% /split-card %}}

{{% split-card %}}
{{< eyebrow >}}WHAT URLSTRIP DOES{{< /eyebrow >}}

A normal link often arrives with extra tracking parameters attached to
it. URLStrip removes the known junk and keeps the destination intact.

> `https://example.com/article?utm_source=newsletter&...`

> `https://example.com/article`

Same destination. Less junk attached to it.
{{% /split-card %}}

{{< split-end >}}
```

Important details:

- **Use `{{%` (not `{{<`) on `split-card`.** The `%` delimiter tells
  Hugo to render the inner body as markdown -- without it, the
  paragraphs/headings/buttons inside the card stay as literal text.
- **Always put a blank line between `split-begin`/`split-end` and the
  cards inside.** Goldmark only treats them as separate blocks when
  there's whitespace between them.
- **More than two cards work.** Drop a third or fourth `split-card` in
  and they distribute evenly. The CSS uses `auto-fit` so cards wrap to
  multiple rows on narrow viewports and stack to one column under 700px.
- **The row breaks out of the 720px column** so two real cards get
  enough room to breathe (capped at 1120px wide, matching the original
  site's container).

### `{{< carousel >}}` / `{{< carousel-slide >}}` --- image carousel with prev/next + dots

Wrap one or more `carousel-slide` shortcodes inside a `carousel` to get
a click-through image carousel that matches the original site's
screenshot strip. Each slide has an image, alt text, and an optional
caption. The dot navigation under the carousel is generated by JS.

```markdown
{{< carousel >}}
  {{< carousel-slide src="/assets/macos-welcome.png"
                      alt="URLStrip macOS welcome screen"
                      caption="macOS onboarding and first-run explanation." >}}
  {{< carousel-slide src="/assets/ios-clean-home.png"
                      alt="URLStrip iPhone home screen"
                      caption="iPhone home view with quick cleanup and local visibility." >}}
  {{< carousel-slide src="/assets/ios-stats-overview.png"
                      alt="URLStrip iPhone statistics overview"
                      caption="Local-only statistics help users understand what URLStrip is removing." >}}
{{< /carousel >}}
```

Args on `carousel-slide`:

| arg | required | what |
|-----|----------|------|
| `src` | yes | path to the image |
| `alt` | yes | accessible description |
| `caption` | no | text shown below the image |

Args on `carousel`:

| arg | required | what |
|-----|----------|------|
| `aria-label` | no | label for the carousel region (default "Image carousel") |

Multiple carousels per page is fine -- each one is initialized
independently by the small carousel script in
`static/markdown-site.js`. Keyboard navigation: focus the carousel and
use ← / → arrow keys.

### `{{< button >}}` --- rounded CTA button

Two styles, matching the original site:

```markdown
{{< button href="#downloads" style="primary" >}}Download URLStrip{{< /button >}}
{{< button href="#how" style="secondary" >}}See how it works{{< /button >}}
```

`primary` is filled dark, `secondary` is outlined. Two buttons placed on
consecutive lines (no blank line between) sit side-by-side in a single
row. Add a blank line between groups to wrap to a new row. Use
`target="_blank"` to open the link in a new tab.

### Important: blank lines around shortcodes

Goldmark wraps consecutive shortcode outputs in a `<p>`, which breaks
the tight-spacing CSS. **Always put a blank line between two
block-level shortcodes** (eyebrow, brandline) so each becomes its own
HTML block:

```markdown
{{< eyebrow >}}URLSTRIP{{< /eyebrow >}}

{{< brandline >}}Silentium servat - silence protects.{{< /brandline >}}

# Remove tracking junk from links.
```

Buttons are inline (`<a>`) so consecutive button shortcodes can sit on
adjacent lines without the blank line and will still render as a row.

## Table of contents

Add `toc: true` to a page's front matter to render a contents box at
the top of the page. It pulls h2 and h3 headings from the body
automatically (configured in `hugo.toml` under `[markup.tableOfContents]`):

```markdown
---
title: "..."
toc: true
---

# Page heading

## A section            ← appears in TOC
### A subsection        ← appears in TOC
#### Won't appear       ← only h2/h3 listed
```

To change the levels site-wide, edit `hugo.toml`:

```toml
[markup.tableOfContents]
  startLevel = 2
  endLevel = 3
  ordered = false
```

## Site styling

This is intentionally a "content first, style later" pass. The existing
`static/styles.css` will still apply to elements with classes that match
(the nav header, brand lockup, body typography, links, code blocks), but
the elaborate card/grid/section layouts from the old site are gone. Pages
will look more like a clean prose document than the original landing page
until styling is added back.

When you're ready to make it pretty, the natural next steps are:

1. Decide which layouts/components you actually want back (e.g. download
   cards on the download page, hero on the home page, FAQ grid).
2. Add CSS that targets element selectors (`article > h2`, `article ul`,
   etc.) rather than class-driven selectors, so the markdown stays clean.
3. If a few specific bits genuinely need structured rendering (e.g. the
   carousel on the old home page), bring them back as Hugo shortcodes
   that wrap a small bit of markdown -- not as front-matter blocks.

## Local dev

Install Hugo (extended) once:

```sh
brew install hugo            # macOS
# or download from https://github.com/gohugoio/hugo/releases
```

Then from the repo root:

```sh
hugo server
```

Open <http://localhost:1313/>. The server live-reloads on every save in
`content/`, `layouts/`, or `static/`.

To produce a one-shot build (what GitHub Actions runs):

```sh
hugo --gc --minify
```

Output lands in `public/`. That directory is gitignored.

## Deployment (GitHub Pages)

The Hugo build is deployed by `.github/workflows/hugo.yml`. Every push
to `main` rebuilds the site and publishes it.

For the Pages source to work, *Settings → Pages → Source* in the GitHub
UI must be set to **GitHub Actions** (not "Deploy from a branch"). The
`static/CNAME` keeps `www.tacitalabs.com` pointed at the new build.

After a deploy, sanity-check:

- `https://www.tacitalabs.com/` (home)
- `https://www.tacitalabs.com/download.html`
- `https://www.tacitalabs.com/urlstrip/releases/desktop.json`
- `https://www.tacitalabs.com/urlstrip/rules/2026.05.04.2/manifest.json`

The JSON endpoints under `/urlstrip/` are critical -- the URLStrip app
fetches those, so make sure they 200 with the right bodies after every
release update.

## URL behavior

`uglyURLs = true` in `hugo.toml` makes Hugo emit `/about.html`,
`/download.html`, etc. -- matching the existing live-site URLs so any
external link/bookmark/search-engine entry pointing at `*.html` keeps
working. The `url:` field in each subpage's front matter pins the output
filename explicitly.

If you ever want to switch to extension-less URLs (`/about/`):

1. Remove `uglyURLs = true` from `hugo.toml`.
2. Remove the `url: "/about.html"` lines from each `content/*.md`.
3. Add `aliases: ["/about.html"]` to each so the old `.html` URLs
   redirect to the new pretty URLs.
4. Update internal links in the markdown bodies (e.g. `/download.html`
   becomes `/download/`).

## Adding a new page

```sh
hugo new content/whatever.md
```

That stamps `archetypes/default.md` into a new file. Set `title:`,
`description:`, and `url: "/whatever.html"` in the front matter, then
write the body.

