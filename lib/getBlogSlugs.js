let db;
try {
    const fb = require('../firebaseConfig');
    db = fb.db;
} catch (e) {
    console.warn('Firebase config loading warning in sitemap:', e.message);
}
const { collection, getDocs } = require('firebase/firestore');

const getBlogSlugs = async () => {
    const blogSlugs = [];
    if (!db) return blogSlugs;
    try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const slug = data.slug || doc.id;
            blogSlugs.push(slug);
        });
    } catch (err) {
        console.warn('Could not fetch dynamic blog slugs for sitemap:', err.message);
    }
    return blogSlugs;
};

module.exports = { getBlogSlugs };