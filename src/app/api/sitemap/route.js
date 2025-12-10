export const GET = async () => {
  const baseUrl = 'https://frametoque.online';

  const staticPages = [
    '',
    'about',
    'projects',
    'contact',
    'services',
    'terms',
    'privacy',
    'cookies'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map((page) => `
      <url>
        <loc>${baseUrl}/${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `)
      .join('')}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
};
