import React, { useState, useEffect } from "react";
import styles from './Blogs.module.css';
import style from './Blogcard.module.css';
import { db } from '../../firebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"; 
import { useRouter } from 'next/router';
import Spinner from "../Spinner/Spinner";
import ErrorBoundary from "../ErrorHandling/ErrorBoundary"; 

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("vaastu"); // Default category
    const router = useRouter();

    useEffect(() => {
        if (!selectedCategory) return;

        setLoading(true);
        
        // Fetch blogs based on selected category
        const blogsQuery = query(
            collection(db, "blogs"), 
            where("category", "==", selectedCategory),
            orderBy("createdOn", "desc")
        );

        const unsub = onSnapshot(blogsQuery, (snapshot) => {
            const blogs = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    sections: data.sections,
                    createdOn: data.createdOn ? data.createdOn.toDate() : null,
                    slug: data.slug || data.sections.find(section => section.type === "title").value.toLowerCase().replace(/ /g, '-')
                };
            });
            setBlogs(blogs);
            setLoading(false);
        });

        return () => unsub();
    }, [selectedCategory]); // Refetch when category changes

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleReadMore = (blog) => {
        router.push(`/blog/${blog.slug}`);
    };

    return (
        <>
        <ErrorBoundary>
            <section className={styles.blogs_Section}>
                <h2 className={styles.heading}>Blogs</h2>

                {/* Category Buttons */}
                <div className={styles.categoryButtons}>
                    {["vaastu", "astrology", "numerology"].map((category) => (
                        <button 
                            key={category} 
                            className={selectedCategory === category ? styles.activeButton : styles.button}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Show loading message while blogs are being fetched */}
                {loading ? (
                    <div>
                        <Spinner />
                        <p className={styles.loading_text}>Loading... Please wait</p>
                    </div>
                ) : (
                    <div className={style.blogList}>
                        {blogs.length > 0 ? (
                            blogs.map((blog) => {
                                const firstImage = blog.sections.find(section => section.type === "image");
                                const firstTitle = blog.sections.find(section => section.type === "title");

                                return (
                                    <div className={style.blogCard} key={blog.id}>
                                        {firstImage && (
                                            <img src={firstImage.value} alt="Blog Image - codeaspirant" />
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
                            })
                        ) : (
                            <p className={styles.noBlogs}>No blogs available for this category.</p>
                        )}
                    </div>
                )}
            </section>
        </ErrorBoundary>
        </>
    );
}

export default Blogs;