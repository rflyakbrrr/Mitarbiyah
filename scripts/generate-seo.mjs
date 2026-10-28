import { writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';

const origin = (
  process.env.VITE_SITE_URL || loadEnv('production', process.cwd(), 'VITE_').VITE_SITE_URL
)?.replace(/\/$/, '');
const routes = [
  '/',
  '/profil',
  '/visi-misi',
  '/program',
  '/guru',
  '/fasilitas',
  '/berita',
  '/galeri',
  '/ppdb',
  '/kontak',
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
  ? routes.map((route) => `<url><loc>${origin}${route}</loc></url>`).join('\n')
  : '';
await writeFile(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`,
);
await writeFile(
  'public/robots.txt',
  `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`,
);
if (!origin)
  console.log('Set VITE_SITE_URL to populate the production sitemap and canonical URLs.');
