// pages/api/blogs/index.js
import https from 'https';

const API_KEY = 'AIzaSyDKC2KCUP9OM8yRebstpKUsJoHktWDnHrI';
const FIRESTORE_BASE = 'https://firestore.googleapis.com/v1/projects/narayana-astrologer/databases/(default)/documents/blogs?pageSize=100&key=' + API_KEY;

// Server-side in-memory cache to make repeated requests instantaneous (< 5ms)
let memoryCache = {
  data: null,
  timestamp: 0,
};
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

function fetchAllBlogsFromFirestore() {
  return new Promise((resolve, reject) => {
    https.get(FIRESTORE_BASE, { headers: { 'User-Agent': 'NextJS-Astrologer/1.0' } }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(raw);
          const docs = json.documents || [];
          
          const parsed = docs.map((doc) => {
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
            
            const titleObj = sections.find(s => s.type === 'title');
            const title = titleObj?.value || slug.replace(/-/g, ' ');
            
            const imageObj = sections.find(s => s.type === 'image');
            const imageUrl = imageObj?.value || '/homepage/c.png';
            const imageAlt = imageObj?.alt || title;
            
            const firstParagraph = sections.find(s => s.type === 'paragraph' && s.value && s.value.length > 20)?.value || '';
            const snippet = firstParagraph
              .replace(/[#*🪔💠🌺📍📅▪]/g, '')
              .replace(/\s+/g, ' ')
              .trim();
            
            return {
              id,
              slug,
              title,
              category,
              snippet: snippet.length > 115 ? snippet.substring(0, 115) + '...' : snippet,
              imageUrl,
              imageAlt,
              createdOn: createdOnStr,
              hasCustomImage: imageUrl.startsWith('/images/'),
            };
          });
          
          // Sort descending by date (or prioritize featured banners)
          parsed.sort((a, b) => {
            const dateA = a.createdOn ? new Date(a.createdOn).getTime() : 0;
            const dateB = b.createdOn ? new Date(b.createdOn).getTime() : 0;
            return dateB - dateA;
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

  const {
    limit = 6,
    skip = 0,
    category = 'all',
  } = req.query;

  const parsedLimit = Math.min(Math.max(parseInt(limit, 10) || 6, 1), 30);
  const parsedSkip = Math.max(parseInt(skip, 10) || 0, 0);

  try {
    const now = Date.now();
    let allBlogs = memoryCache.data;

    if (!allBlogs || (now - memoryCache.timestamp > CACHE_TTL_MS)) {
      allBlogs = await fetchAllBlogsFromFirestore();
      memoryCache = {
        data: allBlogs,
        timestamp: now,
      };
    }

    // Filter by category if requested
    let filtered = allBlogs;
    if (category && category.toLowerCase() !== 'all') {
      const catLower = category.toLowerCase().trim();
      filtered = allBlogs.filter(b => b.category?.toLowerCase() === catLower);
    }

    const total = filtered.length;
    const paginated = filtered.slice(parsedSkip, parsedSkip + parsedLimit);
    const hasMore = (parsedSkip + parsedLimit) < total;

    // Cache header for browsers & CDN
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

    return res.status(200).json({
      blogs: paginated,
      total,
      skip: parsedSkip,
      limit: parsedLimit,
      hasMore,
    });
  } catch (error) {
    console.error('Error in /api/blogs:', error);
    return res.status(500).json({
      message: 'Failed to fetch blogs',
      error: error.message,
    });
  }
}
