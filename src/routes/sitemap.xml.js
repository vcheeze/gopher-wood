const render = () => `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
      <loc>http://www.gopherwoodclinic.org/</loc>
      <lastmod>2020-07-18T19:54:36+00:00</lastmod>
    </url>
  </urlset>
`;

export function get(req, res, next) {
  res.setHeader('Cache-Control', `max-age=0, s-max-age=${600}`); // 10 minutes
  res.setHeader('Content-Type', 'application/rss+xml');
  // let categories = {};
  // posts.forEach(post => {
  //   post.categories.forEach((category) => {
  //     categories[category.slug] = category;
  //   });
  // });


  const feed = render();
  res.end(feed);
}
