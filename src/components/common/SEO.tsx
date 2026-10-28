import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

// React 19 hoists these elements into the document head.
export function SEO({
  title,
  description,
  noIndex = false,
  image,
}: {
  title: string;
  description: string;
  noIndex?: boolean;
  image?: string;
}) {
  const { pathname } = useLocation();
  const fullTitle = `${title} | ${siteConfig.name}`;
  const canonical = siteConfig.url ? `${siteConfig.url}${pathname}` : '';
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />
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
          ...(siteConfig.url ? { url: siteConfig.url } : {}),
        })}
      </script>
    </>
  );
}
