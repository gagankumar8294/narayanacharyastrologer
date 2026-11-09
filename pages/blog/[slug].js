// pages/blog/[slug].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Blog.module.css';
import SEO from '@/comps/SEO/SEO';
import ImageWithSkeleton from '@/comps/Common/ImageWithSkeleton';
import { DiyaIcon, ArrowRightIcon, ArrowLeftIcon, CheckIcon, SparkleIcon } from '@/comps/Common/Icons';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

// In-memory client cache for visited articles
const clientCache = new Map();

const BlogDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postDate, setPostDate] = useState('');
  const [origin, setOrigin] = useState('');
  const [copied, setCopied] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (!slug) return;

    // Check client in-memory cache first for instant 0ms rendering
    if (clientCache.has(slug)) {
      const cached = clientCache.get(slug);
      setBlog(cached.blog);
      setRelatedBlogs(cached.relatedBlogs || []);
      setLoading(false);
      if (cached.blog?.createdOn) {
        formatBlogDate(cached.blog.createdOn);
      }
      return;
    }

    const fetchBlogData = async () => {
      setLoading(true);

      // Strategy 1: Fetch via high-speed server-cached API route
      try {
        const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.blog) {
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs || []);
            clientCache.set(slug, { blog: data.blog, relatedBlogs: data.relatedBlogs });
            if (data.blog.createdOn) {
              formatBlogDate(data.blog.createdOn);
            }
            setLoading(false);
            return;
          }
        }
      } catch (apiErr) {
        console.warn('API route fetch failed, falling back to client Firestore:', apiErr);
      }

      // Strategy 2: Fallback to direct Firestore client SDK query
      try {
        const q = query(collection(db, 'blogs'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const blogData = querySnapshot.docs[0].data();
          setBlog(blogData);
          if (blogData.createdOn) {
            formatBlogDate(blogData.createdOn);
          }

          // Asynchronously fetch related blogs without blocking main content
          fetchRelatedClientSide(slug);
          clientCache.set(slug, { blog: blogData, relatedBlogs: [] });
        } else {
          setBlog(null);
        }
      } catch (err) {
        console.error('Error fetching blog from Firestore:', err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedClientSide = async (currentSlug) => {
      try {
        const qRelated = query(collection(db, 'blogs'), limit(6));
        const relatedSnap = await getDocs(qRelated);
        const related = relatedSnap.docs
          .map((doc) => {
            const d = doc.data();
            const s = d.sections || [];
            return {
              id: doc.id,
              slug: d.slug,
              title: s.find((x) => x.type === 'title')?.value || d.slug?.replace(/-/g, ' '),
              imageUrl: s.find((x) => x.type === 'image')?.value || '/homepage/c.png',
              imageAlt: s.find((x) => x.type === 'image')?.alt || '',
            };
          })
          .filter((b) => b.slug !== currentSlug && b.slug)
          .slice(0, 3);
        setRelatedBlogs(related);
      } catch (e) {
        console.warn('Could not fetch related blogs:', e);
      }
    };

    fetchBlogData();
  }, [slug]);

  const formatBlogDate = (dateVal) => {
    let dateObj;
    if (typeof dateVal === 'string') {
      dateObj = new Date(dateVal);
    } else if (dateVal?.toDate) {
      dateObj = dateVal.toDate();
    } else if (dateVal?.seconds) {
      dateObj = new Date(dateVal.seconds * 1000);
    }
    if (dateObj && !isNaN(dateObj.getTime())) {
      const formatted = dateObj.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setPostDate(formatted);
    }
  };

  // Full Article Skeleton Loading Screen
  if (loading) {
    return (
      <div className={styles.blogPageWrapper}>
        <div className={styles.skeletonPage} aria-busy="true" aria-label="Loading article">
          <div className={styles.skeletonBreadcrumb} />
          <div className={styles.skeletonCategoryPill} />
          <div className={styles.skeletonMainTitle} />
          <div className={styles.skeletonMainTitleShort} />
          <div className={styles.skeletonMetaBar}>
            <div className={styles.skeletonAvatar} />
            <div className={styles.skeletonMetaText} />
          </div>
          <div className={styles.skeletonBannerBox} />
          <div className={styles.skeletonParagraphLine} />
          <div className={styles.skeletonParagraphLine} style={{ width: '92%' }} />
          <div className={styles.skeletonParagraphLine} style={{ width: '85%' }} />
          <div className={styles.skeletonCardBox} />
          <div className={styles.skeletonParagraphLine} />
          <div className={styles.skeletonParagraphLine} style={{ width: '96%' }} />
          <div className={styles.skeletonParagraphLine} style={{ width: '70%' }} />
        </div>
      </div>
    );
  }

  // Not Found State
  if (!blog) {
    return (
      <div className={styles.blogPageWrapper}>
        <div className={styles.blogContainer} style={{ textAlign: 'center', paddingTop: '60px' }}>
          <h2 style={{ color: 'var(--color-primary, #ff6801)', marginBottom: '16px' }}>Article Not Found</h2>
          <p style={{ color: 'var(--text-muted, #5e5a6f)', marginBottom: '24px' }}>
            The article you are looking for does not exist or may have been moved.
          </p>
          <Link href="/blog" className={styles.consultBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeftIcon size={14} />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  const sections = blog.sections || [];
  const firstTitle = sections.find((s) => s.type === 'title')?.value;
  const blogTitle = firstTitle || blog.slug?.replace(/-/g, ' ') || 'Vedic Astrology Article';
  const firstImage = sections.find((s) => s.type === 'image');
  const firstImageIndex = sections.findIndex((s) => s.type === 'image');

  // Estimate read time
  const totalWords = sections
    .filter((s) => s.value && typeof s.value === 'string')
    .map((s) => s.value.length)
    .reduce((a, b) => a + b, 0);
  const readTimeMinutes = Math.max(2, Math.round(totalWords / 450));

  const blogURL = origin ? `${origin}/blog/${encodeURIComponent(slug)}` : '';
  const shareText = `*${blogTitle}*\nRead this article by Brahma Sri Narayanacharya:\n${blogURL}`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(blogURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getCleanDescription = () => {
    const firstParagraph = sections.find((s) => s.type === 'paragraph' && s.value && s.value.length > 30);
    if (firstParagraph) {
      return firstParagraph.value.substring(0, 160).replace(/\n/g, ' ') + '...';
    }
    return `Read ${blogTitle} by Brahma Sri Narayanacharya. Vedic astrology insights, rituals, and auspicious muhurthas.`;
  };

  // Render paragraph content, mantras, or sacred announcement cards
  const renderParagraphContent = (value, key) => {
    if (!value || !value.trim()) return null;

    const trimmed = value.trim();

    // Sacred mantra detection
    const isMantra =
      trimmed.includes('ಬಲಿರಾಜ ನಮಸ್ತುಭ್ಯಂ') ||
      trimmed.includes('ಯಮಂ ತರ್ಪಯಾಮಿ') ||
      trimmed.includes('॥ ಭಾರತೀಯ ರಮಣ') ||
      (trimmed.startsWith('॥') && trimmed.endsWith('॥'));

    if (isMantra) {
      return (
        <div key={key} className={styles.mantraCard}>
          <div className={styles.mantraText}>{value}</div>
        </div>
      );
    }

    // Panchanga / Muhurtha / Sacred Announcement Box
    const isSacredBox =
      trimmed.startsWith('*🕉️') ||
      trimmed.includes('📍 ಸ್ಥಳ:') ||
      trimmed.includes('🪔 ಲಕ್ಷ್ಮಿ ಪೂಜೆಯ ಶುಭ ಮುಹೂರ್ತ') ||
      trimmed.includes('💠 ದೀಪಾವಳಿ ವಿಶೇಷ ಸಂಚಿಕೆ') ||
      trimmed.includes('ಪ್ರದೋಷಕಾಲ:') ||
      trimmed.includes('ವೃಷಭ ಸ್ಥಿರ ಲಗ್ನ:');

    if (isSacredBox) {
      return (
        <div key={key} className={styles.sacredBox}>
          <div className={styles.sacredBoxText}>{value}</div>
        </div>
      );
    }

    return (
      <p key={key} className={styles.paragraph}>
        {value}
      </p>
    );
  };

  const ogImageUrl = firstImage?.value
    ? firstImage.value.startsWith('http')
      ? firstImage.value
      : `${origin}${firstImage.value}`
    : `${origin}/homepage/c.png`;

  return (
    <div className={styles.blogPageWrapper}>
      <SEO
        title={`${blogTitle} | Narayanacharya Astrologer`}
        description={getCleanDescription()}
        canonical={`https://www.narayanacharyastrologer.com/blog/${slug}`}
        ogImage={ogImageUrl}
        ogType="article"
      />

      <article className={styles.blogContainer}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/blog" className={styles.breadcrumbLink}>
            Blog
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{blogTitle}</span>
        </nav>

        {/* Hero Header */}
        <header className={styles.articleHeader}>
          <span className={styles.categoryBadge}>
            <DiyaIcon size={14} color="var(--color-primary)" />
            <span style={{ marginLeft: '6px' }}>{blog.category ? blog.category.replace(/-/g, ' ') : 'Vedic Astrology'}</span>
          </span>
          <h1 className={styles.mainHeading}>{blogTitle}</h1>

          {/* Author and Metadata Bar */}
          <div className={styles.authorMetaBar}>
            <div className={styles.authorLeft}>
              <div className={styles.authorAvatar}>
                <img src="/homepage/guruji.png" alt="Brahma Sri Narayanacharya" />
              </div>
              <div className={styles.authorDetails}>
                <span className={styles.authorName}>Brahma Sri Narayanacharya</span>
                <span className={styles.metaSubtext}>
                  Vedic Astrologer & Vaastu Expert • Chintamani
                </span>
              </div>
            </div>

            <div className={styles.metaRight}>
              {postDate && (
                <span className={styles.metaItem}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {postDate}
                </span>
              )}
              <span className={styles.metaItem}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {readTimeMinutes} min read
              </span>
            </div>
          </div>

          {/* Quick WhatsApp Share Button in Header */}
          <div style={{ marginTop: '16px' }}>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickShareBtn}
            >
              <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                <path d="M27.281 4.65c-2.994-3-6.975-4.65-11.219-4.65-8.738 0-15.85 7.112-15.85 15.856 0 2.794 0.731 5.525 2.119 7.925l-2.25 8.219 8.406-2.206c2.319 1.262 4.925 1.931 7.575 1.931h0.006c0 0 0 0 0 0 8.738 0 15.856-7.113 15.856-15.856 0-4.238-1.65-8.219-4.644-11.219z" />
              </svg>
              <span>Share on WhatsApp</span>
            </a>
          </div>
        </header>

        {/* Featured Banner with High-Performance Skeleton Loader */}
        {firstImage && (
          <div className={styles.featuredImageWrapper}>
            <ImageWithSkeleton
              src={firstImage.value}
              alt={firstImage.alt || blogTitle}
              className={styles.featuredImage}
              aspectRatio="16/9"
              priority={true}
            />
            {firstImage.alt && firstImage.alt.trim() !== '' && (
              <div className={styles.imageCaption}>{firstImage.alt}</div>
            )}
          </div>
        )}

        {/* Article Body Content */}
        <div className={styles.articleBody}>
          {sections.map((section, index) => {
            // Skip the title section (already rendered in header)
            if (section.type === 'title') {
              return null;
            }

            // Skip the first image (already rendered as the featured banner)
            if (section.type === 'image' && index === firstImageIndex) {
              return null;
            }

            switch (section.type) {
              case 'h1':
                return (
                  <h1 key={index} className={styles.h1}>
                    {section.value}
                  </h1>
                );

              case 'h2':
                return (
                  <h2 key={index} className={styles.h2}>
                    {section.value}
                  </h2>
                );

              case 'h3':
                return (
                  <h3 key={index} className={styles.h3}>
                    {section.value}
                  </h3>
                );

              case 'image':
                return (
                  <div key={index} className={styles.inlineImageWrapper}>
                    <ImageWithSkeleton
                      src={section.value}
                      alt={section.alt || blogTitle}
                      className={styles.inlineImage}
                      aspectRatio="16/9"
                      priority={false}
                    />
                    {section.alt && section.alt.trim() !== '' && (
                      <div className={styles.imageCaption}>{section.alt}</div>
                    )}
                  </div>
                );

              case 'paragraph':
              case 'p':
                return renderParagraphContent(section.value, index);

              default:
                if (section.value && typeof section.value === 'string' && section.value.trim() !== '') {
                  return renderParagraphContent(section.value, index);
                }
                return null;
            }
          })}
        </div>

        {/* Social Share Bar */}
        <div className={styles.shareSection}>
          <span className={styles.shareLabel}>Share this sacred wisdom:</span>
          <div className={styles.shareButtonsList}>
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.shareBtn} ${styles.shareWhatsApp}`}
              title="Share on WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                <path d="M27.281 4.65c-2.994-3-6.975-4.65-11.219-4.65-8.738 0-15.85 7.112-15.85 15.856 0 2.794 0.731 5.525 2.119 7.925l-2.25 8.219 8.406-2.206c2.319 1.262 4.925 1.931 7.575 1.931h0.006c0 0 0 0 0 0 8.738 0 15.856-7.113 15.856-15.856 0-4.238-1.65-8.219-4.644-11.219z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogURL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.shareBtn} ${styles.shareFacebook}`}
              title="Share on Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>

            {/* X / Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blogTitle)}&url=${encodeURIComponent(blogURL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.shareBtn} ${styles.shareTwitter}`}
              title="Share on X (Twitter)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X</span>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(blogURL)}&text=${encodeURIComponent(blogTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.shareBtn} ${styles.shareTelegram}`}
              title="Share on Telegram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.922z" />
              </svg>
              <span>Telegram</span>
            </a>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className={`${styles.shareBtn} ${styles.shareCopy}`}
              title="Copy Article Link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{copied ? <><CheckIcon size={14} /> Link Copied!</> : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Guruji Author Card */}
        <section className={styles.authorCard}>
          <div className={styles.authorCardAvatarWrapper}>
            <img
              src="/homepage/guruji.png"
              alt="Brahma Sri Narayanacharya"
              className={styles.authorCardAvatar}
            />
          </div>
          <div className={styles.authorCardContent}>
            <h3 className={styles.authorCardTitle}>Brahma Sri Narayanacharya</h3>
            <p className={styles.authorCardSubtitle}>
              Renowned Vedic Astrologer & Vaastu Expert • Chintamani, Karnataka
            </p>
            <p className={styles.authorCardBio}>
              Over 25+ years of providing authentic Vedic astrology consultations, Jathaka Kundali analysis,
              accurate life predictions, Vaastu Shastra solutions, and dosha shanti pariharas with divine blessings.
            </p>
            <Link href="/contact" className={styles.consultBtn}>
              <span>Book Personal Consultation</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        </section>

        {/* WhatsApp Community Banner */}
        <section className={styles.communityCard}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <DiyaIcon size={22} color="#ffd976" />
            <span>Join Our Vedic Astrology WhatsApp Community</span>
          </h3>
          <p>
            ನಮ್ಮ ವಾಟ್ಸಾಪ್ ಕಮ್ಯೂನಿಟಿಗೆ ಸೇರಿಕೊಂಡು ನಿತ್ಯ ಪಂಚಾಂಗ, ಹಬ್ಬಗಳ ಶುಭ ಮುಹೂರ್ತಗಳು ಮತ್ತು ಜ್ಯೋತಿಷ್ಯ ಸಲಹೆಗಳನ್ನು ನಿಮ್ಮ
            ಮೊಬೈಲ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಪಡೆಯಿರಿ.
          </p>
          <a
            href="https://chat.whatsapp.com/IEEk7CbRplX4fGAUZK5Dt7"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.joinWaBtn}
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
              <path d="M27.281 4.65c-2.994-3-6.975-4.65-11.219-4.65-8.738 0-15.85 7.112-15.85 15.856 0 2.794 0.731 5.525 2.119 7.925l-2.25 8.219 8.406-2.206c2.319 1.262 4.925 1.931 7.575 1.931h0.006c0 0 0 0 0 0 8.738 0 15.856-7.113 15.856-15.856 0-4.238-1.65-8.219-4.644-11.219z" />
            </svg>
            <span>Join WhatsApp Community</span>
          </a>
        </section>

        {/* Related / Recent Articles with Skeleton Loaders */}
        {relatedBlogs.length > 0 && (
          <section className={styles.relatedSection}>
            <h3 className={styles.relatedHeading}>ಇನ್ನಷ್ಟು ಪ್ರಮುಖ ಲೇಖನಗಳು (More Articles)</h3>
            <div className={styles.relatedGrid}>
              {relatedBlogs.map((item) => {
                const itemImg = item.imageUrl || item.sections?.find((s) => s.type === 'image')?.value || '/homepage/c.png';
                const itemTitle =
                  item.title ||
                  item.sections?.find((s) => s.type === 'title')?.value ||
                  item.slug?.replace(/-/g, ' ');

                return (
                  <Link
                    href={`/blog/${encodeURIComponent(item.slug)}`}
                    key={item.id}
                    className={styles.relatedCard}
                  >
                    <div className={styles.relatedCardImageWrapper}>
                      <ImageWithSkeleton
                        src={itemImg}
                        alt={itemTitle}
                        aspectRatio="16/10"
                        priority={false}
                      />
                    </div>
                    <div className={styles.relatedCardBody}>
                      <h4 className={styles.relatedCardTitle}>{itemTitle}</h4>
                      <span className={styles.relatedCardLink}>
                        <span>ಓದಿ (Read)</span>
                        <ArrowRightIcon size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};

export default BlogDetail;
