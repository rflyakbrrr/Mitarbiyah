import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

// React 19 hoists these elements into the document head.
export function SEO({
  title,
  description,
  keywords,
  noIndex = false,
  image,
}: {
  title: string;
  description: string;
  keywords?: string;
  noIndex?: boolean;
  image?: string;
}) {
  const { pathname } = useLocation();
  const fullTitle = `${title} | ${siteConfig.name}`;
  const canonical = siteConfig.url ? `${siteConfig.url}${pathname}` : '';
  const defaultKeywords =
    'mitarbiyah, MI tarbiyah islamiyah, tarbiyah islamiyah, sekolah islam tangerang, madrasah tangerang, pendidikan islam banten, sekolah quran tangerang';
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords ?? defaultKeywords} />
      <meta name="author" content={siteConfig.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta name="robots" content={noIndex ? 'noindex, follow' : 'index, follow'} />
      {canonical && (
        <>
          <link rel="canonical" href={canonical} />
          <meta property="og:url" content={canonical} />
          <meta
            property="og:image"
            content={`${siteConfig.url}${image ?? '/images/2-1280.webp'}`}
          />
        </>
      )}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: siteConfig.name,
          alternateName: ['MI Tarbiyah Islamiyah', 'Tarbiyah Islamiyah', 'MI Tarbiyah'],
          ...(siteConfig.url ? { url: siteConfig.url } : {}),
          ...(siteConfig.url
            ? { logo: `${siteConfig.url}/images/GG.png` }
            : {}),
          description:
            "Sekolah Islam yang memadukan pendidikan Al-Qur\u2019an, pembinaan akhlak, dan pengembangan akademik di Kota Tangerang, Banten.",
          telephone: siteConfig.contact.phone ? `+62${siteConfig.contact.phone.replace(/^0/, '')}` : undefined,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Jl. Adi Sucipto RT. 02/08',
            addressLocality: 'Belendung, Benda',
            addressRegion: 'Kota Tangerang, Banten',
            postalCode: '15123',
            addressCountry: 'ID',
          },
          identifier: [
            { '@type': 'PropertyValue', name: 'NPSN', value: '69727523' },
            { '@type': 'PropertyValue', name: 'NSM', value: '111236710052' },
          ],
        })}
      </script>
    </>
  );
}

