import { writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';

const origin = (
  process.env.VITE_SITE_URL || loadEnv('production', process.cwd(), 'VITE_').VITE_SITE_URL
)?.replace(/\/$/, '');

const today = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/',          changefreq: 'weekly',  priority: '1.0' },
  { path: '/profil',    changefreq: 'monthly', priority: '0.8' },
  { path: '/visi-misi', changefreq: 'monthly', priority: '0.7' },
  { path: '/program',   changefreq: 'monthly', priority: '0.8' },
  { path: '/guru',      changefreq: 'monthly', priority: '0.7' },
  { path: '/fasilitas', changefreq: 'monthly', priority: '0.7' },
  { path: '/berita',    changefreq: 'weekly',  priority: '0.8' },
  { path: '/galeri',    changefreq: 'monthly', priority: '0.6' },
  { path: '/ppdb',      changefreq: 'weekly',  priority: '0.9' },
  { path: '/kontak',    changefreq: 'monthly', priority: '0.7' },
];

if (origin) {
  const parsed = new URL(origin);
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.origin !== origin) {
    throw new Error(
      'VITE_SITE_URL must be an HTTP(S) origin without a path, query, or credentials.',
    );
  }
}

const urls = origin
  ? routes
      .map(
        ({ path, changefreq, priority }) =>
          `<url><loc>${origin}${path}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`,
      )
      .join('\n')
  : '';

await writeFile(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
await writeFile(
  'public/robots.txt',
  `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`,
);
if (!origin)
  console.log('Set VITE_SITE_URL to populate the production sitemap and canonical URLs.');

