// pages/api/blogs/[slug].js
import https from 'https';

const API_KEY = 'AIzaSyDKC2KCUP9OM8yRebstpKUsJoHktWDnHrI';
const FIRESTORE_BASE = 'https://firestore.googleapis.com/v1/projects/narayana-astrologer/databases/(default)/documents/blogs?pageSize=100&key=' + API_KEY;

// Server cache for full blogs
let fullBlogCache = {
  data: null,
  timestamp: 0,
};
const CACHE_TTL_MS = 60 * 1000;

function fetchRawBlogs() {
  return new Promise((resolve, reject) => {
    https.get(FIRESTORE_BASE, { headers: { 'User-Agent': 'NextJS-Astrologer/1.0' } }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(raw);
          const docs = json.documents || [];
          
          const parsed = docs.map(doc => {
            const id = doc.name.split('/').pop();
            const fields = doc.fields || {};
            const slug = fields.slug?.stringValue || '';
            const category = fields.category?.stringValue || 'astrology';
            const createdOnStr = fields.createdOn?.timestampValue || null;
            
            const rawSections = fields.sections?.arrayValue?.values || [];
            const sections = rawSections.map(s => {
              const f = s.mapValue?.fields || {};
              return {
                type: f.type?.stringValue || '',
                value: f.value?.stringValue || '',
                alt: f.alt?.stringValue || '',
              };
            });
            
            return {
              id,
              slug,
              category,
              createdOn: createdOnStr,
              sections,
            };
          });
          
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { slug } = req.query;
  if (!slug) {
    return res.status(400).json({ message: 'Missing slug parameter' });
  }

  try {
    const now = Date.now();
    let blogs = fullBlogCache.data;

    if (!blogs || (now - fullBlogCache.timestamp > CACHE_TTL_MS)) {
      blogs = await fetchRawBlogs();
      fullBlogCache = {
        data: blogs,
        timestamp: now,
      };
    }

    const decodedSlug = decodeURIComponent(slug).trim().toLowerCase();
    const blog = blogs.find(b => 
      b.slug?.toLowerCase() === decodedSlug ||
      decodeURIComponent(b.slug || '').toLowerCase() === decodedSlug
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Pick 3 related blogs
    const relatedBlogs = blogs
      .filter(b => b.slug !== blog.slug && b.slug)
      .slice(0, 3)
      .map(b => ({
        id: b.id,
        slug: b.slug,
        title: b.sections.find(s => s.type === 'title')?.value || b.slug.replace(/-/g, ' '),
        imageUrl: b.sections.find(s => s.type === 'image')?.value || '/homepage/c.png',
        imageAlt: b.sections.find(s => s.type === 'image')?.alt || '',
      }));

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

    return res.status(200).json({
      blog,
      relatedBlogs,
    });
  } catch (error) {
    console.error('Error in /api/blogs/[slug]:', error);
    return res.status(500).json({
      message: 'Failed to fetch blog post',
      error: error.message,
    });
  }
}
