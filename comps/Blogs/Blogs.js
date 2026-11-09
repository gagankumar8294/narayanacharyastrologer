// comps/Blogs/Blogs.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Blogcard.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ErrorBoundary from '../ErrorHandling/ErrorBoundary';
import ImageWithSkeleton from '../Common/ImageWithSkeleton';
import BlogCardSkeleton from './BlogCardSkeleton';
import { ArrowRightIcon, SparkleIcon } from '../Common/Icons';

const PAGE_SIZE = 6;

const CATEGORIES = [
  { key: 'all', label: 'All Articles' },
  { key: 'astrology', label: 'Vedic Astrology' },
  { key: 'vaastu', label: 'Vaastu Shastra' },
  { key: 'numerology', label: 'Numerology' },
  { key: 'yantra-mantra-tantra', label: 'Yantra & Mantra' },
];

function Blogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const sentinelRef = useRef(null);
  const observerRef = useRef(null);
  const skipRef = useRef(0);

  // Fetch blogs from optimized API route
  const fetchBlogs = useCallback(async (skipToFetch, categoryToFetch, isAppend = false) => {
    try {
      if (isAppend) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const params = new URLSearchParams({
        limit: PAGE_SIZE.toString(),
        skip: skipToFetch.toString(),
        category: categoryToFetch,
      });

      const res = await fetch(`/api/blogs?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const newItems = data.blogs || [];

      if (isAppend) {
        setBlogs(prev => [...prev, ...newItems]);
      } else {
        setBlogs(newItems);
      }

      setHasMore(data.hasMore);
      setTotalCount(data.total || 0);
      skipRef.current = skipToFetch + newItems.length;
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // When category changes, reset and fetch page 0
  useEffect(() => {
    skipRef.current = 0;
    fetchBlogs(0, selectedCategory, false);
  }, [selectedCategory, fetchBlogs]);

  // Load more handler
  const handleLoadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;
    fetchBlogs(skipRef.current, selectedCategory, true);
  }, [loading, loadingMore, hasMore, selectedCategory, fetchBlogs]);

  // IntersectionObserver for Fetch-on-Scroll (Infinite Scroll)
  useEffect(() => {
    if (!sentinelRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first && first.isIntersecting && hasMore && !loading && !loadingMore) {
          handleLoadMore();
        }
      },
      { rootMargin: '300px' } // trigger 300px before reaching the bottom
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasMore, loading, loadingMore, handleLoadMore]);

  return (
    <ErrorBoundary>
      <section className={styles.blogs_Section}>
        {/* Header */}
        <div className={styles.headerContainer}>
          <h1 className={styles.heading}>Articles & Insights</h1>
          <p className={styles.subheading}>
            Explore authentic Vedic wisdom, festival muhurthas, horoscope guidance, and Vaastu remedies by Brahma Sri Narayanacharya.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterBar}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                if (selectedCategory !== cat.key) {
                  setSelectedCategory(cat.key);
                }
              }}
              className={`${styles.filterPill} ${selectedCategory === cat.key ? styles.filterPillActive : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Initial Loading Skeletons */}
        {loading ? (
          <div className={styles.blogList}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No articles found under this category.</p>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <div className={styles.blogList}>
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
                    className={styles.blogCard}
                    key={blog.id}
                  >
                    {/* Image with Skeleton Loader */}
                    <div className={styles.cardImageWrapper}>
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

                    {/* Card Content (renders immediately) */}
                    <div className={styles.cardBody}>
                      <div>
                        <span className={styles.cardTag}>
                          {blog.category ? blog.category.replace(/-/g, ' ') : 'Vedic Astrology'}
                        </span>
                        <h3>{blog.title}</h3>
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
                        <ArrowRightIcon size={14} />
                      </button>
                    </div>
                  </Link>
                );
              })}

              {/* Skeletons while loading the next page */}
              {loadingMore && (
                <>
                  <BlogCardSkeleton key="more-skeleton-1" />
                  <BlogCardSkeleton key="more-skeleton-2" />
                  <BlogCardSkeleton key="more-skeleton-3" />
                </>
              )}
            </div>

            {/* Sentinel for Infinite Scroll */}
            <div ref={sentinelRef} style={{ height: '1px' }} />

            {/* Manual Load More Button fallback */}
            {hasMore && !loadingMore && (
              <div className={styles.loadMoreWrapper}>
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className={styles.loadMoreBtn}
                >
                  <span>Load More Articles</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* All articles viewed notice */}
            {!hasMore && blogs.length > 0 && (
              <div className={styles.endOfBlogs}>
                <SparkleIcon size={12} color="var(--color-primary)" />
                <span style={{ margin: '0 8px' }}>You have viewed all {totalCount} articles</span>
                <SparkleIcon size={12} color="var(--color-primary)" />
              </div>
            )}
          </>
        )}
      </section>
    </ErrorBoundary>
  );
}

export default Blogs;
