// comps/Blogs/RecentBlogs.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageWithSkeleton from '../Common/ImageWithSkeleton';
import { SparkleIcon, ArrowRightIcon, DiyaIcon } from '../Common/Icons';
import styles from './RecentBlogs.module.css';

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchRecent() {
      try {
        const res = await fetch('/api/blogs?limit=3&skip=0');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.blogs) {
            setBlogs(data.blogs);
          }
        }
      } catch (err) {
        console.warn('Could not fetch recent blogs for homepage:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRecent();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!loading && blogs.length === 0) {
    return null; // Don't render empty section
  }

  return (
    <section className={styles.recentBlogsSection} aria-label="Latest Astrological Articles">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>
            <SparkleIcon size={12} color="var(--color-primary)" />
            <span style={{ marginLeft: '6px' }}>ಜ್ಯೋತಿಷ್ಯ ಲೇಖನಗಳು & ಪಂಚಾಂಗ (Vedic Blog)</span>
          </span>
          <h2 className={styles.sectionTitle}>
            Latest Astrological Insights & Festival Guides
          </h2>
          <p className={styles.sectionSubtitle}>
            Explore authentic Vedic wisdom, festival muhurthas, horoscope guidance, and Vaastu remedies by Brahma Sri Narayanacharya.
          </p>
        </div>

        {/* 3 Featured Blog Cards */}
        <div className={styles.cardsGrid}>
          {blogs.map((blog) => {
            const formattedDate = blog.createdOn
              ? new Date(blog.createdOn).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : null;

            return (
              <Link
                href={`/blog/${encodeURIComponent(blog.slug)}`}
                key={blog.id}
                className={styles.card}
              >
                <div className={styles.imageWrapper}>
                  <ImageWithSkeleton
                    src={blog.imageUrl}
                    alt={blog.imageAlt || blog.title}
                    aspectRatio="16/10"
                    priority={false}
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
                      {blog.category ? blog.category.replace(/-/g, ' ') : 'Vedic Astrology'}
                    </span>
                    <h3 className={styles.cardTitle}>{blog.title}</h3>
                    {blog.snippet && (
                      <p className={styles.cardSnippet}>{blog.snippet}</p>
                    )}
                  </div>

                  <span className={styles.readMoreLink}>
                    <span>Read Full Article</span>
                    <ArrowRightIcon size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Big CTA Button linking directly to /blog */}
        <div className={styles.ctaContainer}>
          <Link href="/blog" className={styles.viewAllBtn}>
            <span>View All Articles & Muhurthas (Blog)</span>
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
