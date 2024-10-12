const { db } = require('../firebaseConfig'); // Adjust the path according to your folder structure
const { collection, getDocs } = require('firebase/firestore');

const getBlogSlugs = async () => {
    const blogSlugs = [];
    const querySnapshot = await getDocs(collection(db, 'blogs'));
    querySnapshot.forEach((doc) => {
        blogSlugs.push(doc.id);
    });
    return blogSlugs;
};

module.exports = { getBlogSlugs };