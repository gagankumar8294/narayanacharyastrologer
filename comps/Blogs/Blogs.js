import React, { useState, useRef, useEffect } from "react";
import styles from './Blogs.module.css';
import style from './Blogcard.module.css';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"; // Import query and orderBy
import { useRouter } from 'next/router';
import Spinner from "../Spinner/Spinner";

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState(""); // Selected category state

    const handleCategoryFilter = (e) => {
        setSelectedCategory(e.target.value); // Update selected category
    };

    useEffect(() => {
        // Create a query that orders documents by 'createdOn' in descending order
        const blogsQuery = query(
            collection(db, "blogs"),
            orderBy("createdOn", "desc")
        );

        // Fetch and listen to blogs
        const unsub = onSnapshot(blogsQuery, (snapshot) => {
            const blogs = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    sections: data.sections,
                    createdOn: data.createdOn ? data.createdOn.toDate() : null,
                    slug: data.slug || data.sections.find(section => section.type === "title").value.toLowerCase().replace(/ /g, '-'),
                    category: data.category || "", // Retrieve category
                };
            });
            setBlogs(blogs);
            setLoading(false); // Update loading state
        });

        return () => unsub(); // Cleanup listener on unmount
    }, []);

    const handleReadMore = (blog) => {
        router.push(`/blog/${blog.slug}`); // Navigate to blog details page
    };

    const filteredBlogs = selectedCategory
        ? blogs.filter((blog) => blog.category === selectedCategory) // Filter by selected category
        : blogs;

    return (
        <>
            <section className={styles.blogs_Section}>
                <h2 className={styles.heading}>Blogs</h2>
                <div className={styles.filter}>
                    <select
                        className={styles.input}
                        value={selectedCategory}
                        onChange={handleCategoryFilter}
                    >
                        <option value="">All Categories</option>
                        <option value="astrology">Astrology</option>
                        <option value="numerology">Numerology</option>
                        <option value="vaastu">Vaastu</option>
                        <option value="yantra-mantra-tantra">Yantra Mantra Tantra</option>
                    </select>
                </div>
                {loading ? (
                    <div>
                        <Spinner />
                        <p className={styles.loading_text}>Loading... Please wait</p>
                    </div>
                ) : (
                    <div className={style.blogList}>
                        {filteredBlogs.map((blog) => {
                            const firstImage = blog.sections.find(section => section.type === "image");
                            const firstTitle = blog.sections.find(section => section.type === "title");

                            return (
                                <div className={style.blogCard} key={blog.id}>
                                    {firstImage && (
                                        <img
                                            src={firstImage.value}
                                            alt="Blog Image - codeaspirant"
                                        />
                                    )}
                                    {firstTitle && <h3>{firstTitle.value}</h3>}
                                    <button
                                        onClick={() => handleReadMore(blog)}
                                        className={style.readMore}
                                    >
                                        Read More
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </>
    );
}

export default Blogs;
