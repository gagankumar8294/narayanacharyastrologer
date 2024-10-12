const { getBlogSlugs } = require('./lib/getBlogSlugs');

module.exports = {
    siteUrl: 'https://codeaspirant.vercel.app',
    generateRobotsTxt: true, // (optional)
    changefreq: 'daily', // How frequently your website content changes
    priority: 0.7, // The priority of this URL relative to other URLs on your site
    sitemapSize: 5000, // Limit the number of URLs per sitemap file
    exclude: ['/blog/add'], // URLs that should not be included in the sitemap
    transform: async (config, path) => {
      return {
        loc: path, // The URL for this page
        changefreq: config.changefreq,
        priority: path === '/' ? 1.0 : config.priority, // Higher priority for the homepage
        lastmod: new Date().toISOString(), // The last modification date of this URL
      }
    },
    additionalPaths: async (config) => {
      const blogPaths = await getBlogSlugs(); // Function to fetch blog slugs dynamically
      return blogPaths.map((slug) => ({
        loc: `/blog/${slug}`,
        changefreq: 'daily',
        priority: 0.7,
      }));
    },
  };