const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

const guides = [
  ['whitepages', 'Whitepages'],
  ['beenverified', 'BeenVerified'],
  ['truepeoplesearch', 'TruePeopleSearch'],
  ['intelius', 'Intelius'],
  ['mylife', 'MyLife'],
  ['spokeo', 'Spokeo'],
  ['nuwber', 'Nuwber'],
  ['usphonebook', 'USPhoneBook'],
  ['thatsthem', 'ThatsThem'],
  ['cyberbackgroundchecks', 'CyberBackgroundChecks'],
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function test(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

function attribute(html, name) {
  const match = html.match(new RegExp(`<meta[^>]+name="${name}"[^>]+content="([^"]+)"`, 'i'));
  return match?.[1] ?? null;
}

function localTarget(href) {
  if (!href.startsWith('/') || href.startsWith('//')) return null;
  const parsed = new URL(href, 'https://www.tacitalabs.com');
  let pathname = decodeURIComponent(parsed.pathname);
  if (pathname === '/') pathname = '/index.html';
  else if (pathname.endsWith('/')) pathname += 'index.html';
  return {
    file: path.join(publicDir, pathname.replace(/^\/+/, '')),
    anchor: parsed.hash ? parsed.hash.slice(1) : null,
  };
}

test('broker data and content define the expected ten guides', () => {
  const brokerData = read('data/infobreaker_brokers.toml');
  assert.equal((brokerData.match(/^\[\[brokers\]\]$/gm) || []).length, guides.length);
  for (const [slug, name] of guides) {
    assert.match(brokerData, new RegExp(`id = "${slug}"`));
    assert.match(brokerData, new RegExp(`name = "${name}"`));
    const sourcePath = path.join(root, 'content', `remove-from-${slug}.md`);
    assert.ok(fs.existsSync(sourcePath), `missing source page for ${name}`);
    const source = fs.readFileSync(sourcePath, 'utf8');
    assert.match(source, new RegExp(`broker: "${slug}"`));
    assert.ok(source.split(/\s+/).length >= 300, `${name} guide is too thin`);
  }
});

test('hub and every guide are indexed with unique metadata', () => {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const descriptions = new Set();
  const titles = new Set();
  const pageNames = ['data-broker-removal-guides', ...guides.map(([slug]) => `remove-from-${slug}`)];

  for (const pageName of pageNames) {
    const file = path.join(publicDir, `${pageName}.html`);
    assert.ok(fs.existsSync(file), `missing generated ${pageName}.html`);
    const html = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(html, /noindex/i, `${pageName} must remain indexable`);
    assert.match(html, new RegExp(`<link rel=canonical href=https://www\\.tacitalabs\\.com/${pageName}\\.html>`));
    assert.match(sitemap, new RegExp(`https://www\\.tacitalabs\\.com/${pageName}\\.html`));
    assert.match(html, /application\/ld\+json/);

    const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1];
    const description = attribute(html, 'description')
      || (html.match(/<meta name=description content="([^"]+)"/i) || [])[1];
    assert.ok(title && !titles.has(title), `duplicate or missing title for ${pageName}`);
    assert.ok(description && !descriptions.has(description), `duplicate or missing description for ${pageName}`);
    assert.ok(description.length >= 80 && description.length <= 190, `${pageName} description length is ${description.length}`);
    titles.add(title);
    descriptions.add(description);
  }
});

test('guide pages expose the evidence workflow and avoid prohibited claims', () => {
  const prohibited = [
    /guaranteed removal/i,
    /remove you from (?:the entire|all of the) internet/i,
    /permanent removal/i,
    /fully automatic/i,
    /set it and forget it/i,
  ];

  for (const [slug, name] of guides) {
    const html = fs.readFileSync(path.join(publicDir, `remove-from-${slug}.html`), 'utf8');
    assert.match(html, new RegExp(`<h1>[^<]*${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i'));
    assert.match(html, /Find<\/span>/);
    assert.match(html, /Request<\/span>/);
    assert.match(html, /Human step<\/span>/);
    assert.match(html, /Verify<\/span>/);
    assert.match(html, /A request is not a removal/i);
    assert.match(html, /href=\/infobreaker\.html#downloads/);
    for (const pattern of prohibited) assert.doesNotMatch(html, pattern);
  }
});

test('all local links and anchors from the guide set resolve', () => {
  const pages = [
    path.join(publicDir, 'data-broker-removal-guides.html'),
    ...guides.map(([slug]) => path.join(publicDir, `remove-from-${slug}.html`)),
  ];
  for (const page of pages) {
    const html = fs.readFileSync(page, 'utf8');
    const hrefs = [...html.matchAll(/\shref=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi)]
      .map(match => match[1] || match[2] || match[3]);
    for (const href of hrefs) {
      const target = localTarget(href);
      if (!target) continue;
      assert.ok(fs.existsSync(target.file), `${path.basename(page)} has missing link ${href}`);
      if (!target.anchor) continue;
      const targetHtml = fs.readFileSync(target.file, 'utf8');
      const decoded = decodeURIComponent(target.anchor);
      assert.ok(
        targetHtml.includes(`id=${decoded}`) || targetHtml.includes(`id="${decoded}"`),
        `${path.basename(page)} has missing anchor ${href}`,
      );
    }
  }
});

console.log(`verified ${guides.length} broker guides plus the guide hub`);
