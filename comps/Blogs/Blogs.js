import React, { useState, useEffect } from "react";
import styles from './Blogcard.module.css';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Spinner from "../Spinner/Spinner";
import ErrorBoundary from "../ErrorHandling/ErrorBoundary";

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const router = useRouter();

    useEffect(() => {
        try {
            const blogsQuery = query(collection(db, "blogs"), orderBy("createdOn", "desc"));

            const unsub = onSnapshot(blogsQuery, (snapshot) => {
                const fetchedBlogs = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const sections = data.sections || [];
                    const titleObj = sections.find(s => s.type === "title");
                    const titleVal = titleObj?.value || "";

                    // Find first readable paragraph for snippet
                    const firstParagraph = sections.find(s => s.type === "paragraph" && s.value && s.value.length > 20)?.value || "";
                    const snippet = firstParagraph
                        .replace(/[#*🪔💠🌺📍📅▪]/g, '')
                        .replace(/\s+/g, ' ')
                        .trim();

                    return {
                        id: doc.id,
                        sections: sections,
                        category: data.category || "astrology",
                        snippet: snippet.length > 110 ? snippet.substring(0, 110) + '...' : snippet,
                        createdOn: data.createdOn?.toDate ? data.createdOn.toDate() : null,
                        slug: data.slug || titleVal.toLowerCase().replace(/ /g, '-')
                    };
                });
                setBlogs(fetchedBlogs);
                setLoading(false);
            });

            return () => unsub();
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        }
    }, []);

    const categories = [
        { key: "all", label: "All Articles" },
        { key: "astrology", label: "Vedic Astrology" },
        { key: "vaastu", label: "Vaastu Shastra" },
        { key: "numerology", label: "Numerology" },
        { key: "yantra-mantra-tantra", label: "Yantra & Mantra" },
    ];

    const filteredBlogs = selectedCategory === "all"
        ? blogs
        : blogs.filter(b => b.category?.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <ErrorBoundary>
            <section className={styles.blogs_Section}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.heading}>Articles & Insights</h1>
                    <p className={styles.subheading}>
                        Explore authentic Vedic wisdom, festival muhurthas, horoscope guidance, and Vaastu remedies by Brahma Sri Narayanacharya.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className={styles.filterBar}>
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            type="button"
                            onClick={() => setSelectedCategory(cat.key)}
                            className={`${styles.filterPill} ${selectedCategory === cat.key ? styles.filterPillActive : ''}`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading ? (
                    <div>
                        <Spinner />
                        <p className={styles.loading_text}>Loading articles... Please wait</p>
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No articles found under this category.</p>
                    </div>
                ) : (
                    <div className={styles.blogList}>
                        {filteredBlogs.map((blog) => {
                            const firstImage = blog.sections.find(section => section.type === "image");
                            const firstTitle = blog.sections.find(section => section.type === "title");
                            const titleText = firstTitle ? firstTitle.value : "Astrology Article";
                            const formattedDate = blog.createdOn ? blog.createdOn.toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            }) : null;

                            return (
                                <Link
                                    href={`/blog/${encodeURIComponent(blog.slug)}`}
                                    className={styles.blogCard}
                                    key={blog.id}
                                >
                                    <div className={styles.cardImageWrapper}>
                                        <img
                                            src={firstImage ? firstImage.value : "/homepage/c.png"}
                                            alt={titleText}
                                        />
                                        {formattedDate && (
                                            <span className={styles.cardDateBadge}>
                                                {formattedDate}
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.cardBody}>
                                        <div>
                                            <span className={styles.cardTag}>
                                                {blog.category ? blog.category.replace(/-/g, ' ') : "Vedic Astrology"}
                                            </span>
                                            <h3>{titleText}</h3>
                                            {blog.snippet && (
                                                <p className={styles.cardSnippet}>{blog.snippet}</p>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            className={styles.readMore}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.push(`/blog/${encodeURIComponent(blog.slug)}`);
                                            }}
                                        >
                                            <span>Read Full Article</span>
                                            <span>➔</span>
                                        </button>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </section>
        </ErrorBoundary>
    );
}

export default Blogs;
