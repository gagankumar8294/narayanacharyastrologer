import React, { useState, useRef, useEffect } from "react";
import styles from './Blogs.module.css';
import style from './Blogcard.module.css';
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } from "firebase/firestore"; // Import query and orderBy
import { useRouter } from 'next/router';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const titleRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        // Create a query that orders documents by 'createdOn' field in descending order
        const blogsQuery = query(collection(db, "blogs"), orderBy("createdOn", "desc"));

        // Use the ordered query with onSnapshot
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
            setLoading(false); // Set loading to false once blogs are fetched
        });

        return () => unsub();
    }, []);

    const handleReadMore = (blog) => {
        router.push(`/blog/${blog.slug}`);
    };

    return (
        <>
            <section className={styles.blogs_Section}>
                <h2 className={styles.heading}>Blogs</h2>

                {/* Show loading message while blogs are being fetched */}
                {loading ? (
                    <div>
                        <p className={styles.loading_text}>Loading... Please wait</p>
                    </div>
                ) : (
                
                <div className={style.blogList}>
                    {blogs.map((blog) => {
                        const firstImage = blog.sections.find(section => section.type === "image");
                        const firstTitle = blog.sections.find(section => section.type === "title");

                        return (
                            <div className={style.blogCard} key={blog.id}>
                                {/* {firstImage && firstImage.value && (
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
                                </button> */}
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