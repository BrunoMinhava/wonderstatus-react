import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Wonderstatus';
const BASE_URL = 'https://www.wonderstatus.pt';

export default function PageMeta({ title, description, path, image }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Laboratório, Água e Oceanografia`;
  const canonical = `${BASE_URL}${path || ''}`;
  const ogImage = image || `${BASE_URL}/assets/logos/wonderstatus-logo.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
