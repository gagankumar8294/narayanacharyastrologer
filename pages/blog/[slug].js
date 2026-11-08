// pages/blog/[slug].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import styles from '../../styles/Blog.module.css';
import SEO from '@/comps/SEO/SEO';
import Spinner from '@/comps/Spinner/Spinner';

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

    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'blogs'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const blogData = querySnapshot.docs[0].data();
          setBlog(blogData);

          if (blogData.createdOn) {
            const dateObj = blogData.createdOn.toDate ? blogData.createdOn.toDate() : new Date(blogData.createdOn.seconds * 1000);
            const formatted = dateObj.toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
            setPostDate(formatted);
          }
        } else {
          setBlog(null);
        }

        // Fetch 3 related blogs
        try {
          const qRelated = query(collection(db, 'blogs'), limit(6));
          const relatedSnap = await getDocs(qRelated);
          const related = relatedSnap.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((b) => b.slug !== slug && b.slug)
            .slice(0, 3);
          setRelatedBlogs(related);
        } catch (err) {
          console.warn('Could not fetch related blogs:', err);
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.blogPageWrapper}>
        <div className={styles.loadingContainer}>
          <Spinner />
          <p>Loading article, please wait...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className={styles.blogPageWrapper}>
        <div className={styles.blogContainer} style={{ textAlign: 'center', paddingTop: '60px' }}>
          <h2 style={{ color: 'var(--color-primary, #ff6801)', marginBottom: '16px' }}>Article Not Found</h2>
          <p style={{ color: 'var(--text-muted, #5e5a6f)', marginBottom: '24px' }}>
            The article you are looking for does not exist or may have been moved.
          </p>
          <Link href="/blog" className={styles.consultBtn}>
            ← Back to All Articles
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

  // Check if paragraph is a sacred mantra or panchanga box
  const renderParagraphContent = (value, key) => {
    if (!value || !value.trim()) return null;

    const trimmed = value.trim();

    // Sacred mantra detection (e.g. Sanskrit stotra, Baliraja namastubhyam, closing sloka)
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
            Articles
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{blogTitle}</span>
        </nav>

        {/* Article Header */}
        <header className={styles.articleHeader}>
          <div className={styles.categoryBadge}>
            <span>✦</span>
            <span>{blog.category ? blog.category.toUpperCase() : 'VEDIC ASTROLOGY'}</span>
          </div>

          <h1 className={styles.mainHeading}>{blogTitle}</h1>

          {/* Author & Meta Bar */}
          <div className={styles.authorMetaBar}>
            <div className={styles.authorLeft}>
              <img
                src="/homepage/c.png"
                alt="Brahma Sri Narayanacharya"
                className={styles.authorAvatar}
              />
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>Brahma Sri Narayanacharya</span>
                <div className={styles.metaRow}>
                  {postDate && <span>{postDate}</span>}
                  <span className={styles.metaDot}>•</span>
                  <span>{readTimeMinutes} min read</span>
                  <span className={styles.metaDot}>•</span>
                  <span>ಚಿಂತಾಮಣಿ / ಬೆಂಗಳೂರು</span>
                </div>
              </div>
            </div>

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

        {/* Featured Banner Image */}
        {firstImage && (
          <div className={styles.featuredImageWrapper}>
            <img
              src={firstImage.value}
              alt={firstImage.alt || blogTitle}
              className={styles.featuredImage}
            />
            {firstImage.alt && firstImage.alt.trim() !== '' && (
              <div className={styles.imageCaption}>{firstImage.alt}</div>
            )}
          </div>
        )}

        {/* Article Body Content */}
        <div className={styles.articleBody}>
          {sections.map((section, index) => {
            // Skip the title section (already rendered in the hero header)
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

              case 'content':
              case 'paragraph':
                return renderParagraphContent(section.value, index);

              case 'link':
                const linkUrl =
                  section.value.startsWith('http://') || section.value.startsWith('https://')
                    ? section.value
                    : `https://${section.value}`;
                return (
                  <p key={index} className={styles.paragraph}>
                    <a
                      href={linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.articleLink}
                    >
                      {section.linkText || section.value} ↗
                    </a>
                  </p>
                );

              case 'image':
                return (
                  <div key={index} className={styles.inlineImageContainer}>
                    <img
                      src={section.value}
                      alt={section.alt || 'Article visual'}
                      className={styles.inlineImage}
                    />
                    {section.alt && (
                      <div className={styles.imageCaption}>{section.alt}</div>
                    )}
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>

        {/* Social Sharing Section */}
        <section className={styles.shareSection}>
          <h4 className={styles.shareTitle}>ಈ ಲೇಖನವನ್ನು ನಿಮ್ಮ ಸ್ನೇಹಿತರು & ಕುಟುಂಬದೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಿ</h4>
          <ul className={styles.shareButtonsList}>
            <li>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.shareBtn} ${styles.shareWhatsApp}`}
              >
                <svg viewBox="0 0 32 32">
                  <path d="M27.281 4.65c-2.994-3-6.975-4.65-11.219-4.65-8.738 0-15.85 7.112-15.85 15.856 0 2.794 0.731 5.525 2.119 7.925l-2.25 8.219 8.406-2.206c2.319 1.262 4.925 1.931 7.575 1.931h0.006c0 0 0 0 0 0 8.738 0 15.856-7.113 15.856-15.856 0-4.238-1.65-8.219-4.644-11.219zM16.069 29.050v0c-2.369 0-4.688-0.637-6.713-1.837l-0.481-0.288-4.987 1.306 1.331-4.863-0.313-0.5c-1.325-2.094-2.019-4.519-2.019-7.012 0-7.269 5.912-13.181 13.188-13.181 3.519 0 6.831 1.375 9.319 3.862 2.488 2.494 3.856 5.8 3.856 9.325-0.006 7.275-5.919 13.188-13.181 13.188z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </li>

            <li>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogURL)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.shareBtn} ${styles.shareFacebook}`}
              >
                <svg viewBox="0 0 32 32">
                  <path d="M29 0h-26c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h13v-14h-4v-4h4v-2c0-3.306 2.694-6 6-6h4v4h-4c-1.1 0-2 0.9-2 2v2h6l-1 4h-5v14h9c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3z" />
                </svg>
                <span>Facebook</span>
              </a>
            </li>

            <li>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogURL)}&text=${encodeURIComponent(blogTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.shareBtn} ${styles.shareTwitter}`}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>X (Twitter)</span>
              </a>
            </li>

            <li>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(blogURL)}&text=${encodeURIComponent(blogTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.shareBtn} ${styles.shareTelegram}`}
              >
                <svg viewBox="0 0 32 32">
                  <path d="M16 0c-8.838 0-16 7.162-16 16s7.162 16 16 16 16-7.163 16-16-7.163-16-16-16zM23.863 10.969l-2.625 12.369c-0.181 0.881-0.712 1.087-1.45 0.681l-4-2.956-1.919 1.869c-0.225 0.219-0.4 0.4-0.8 0.4-0.519 0-0.431-0.194-0.606-0.688l-1.363-4.475-3.956-1.231c-0.856-0.262-0.862-0.85 0.194-1.269l15.412-5.95c0.7-0.319 1.381 0.169 1.113 1.25z" />
                </svg>
                <span>Telegram</span>
              </a>
            </li>

            <li>
              <button
                type="button"
                onClick={handleCopyLink}
                className={`${styles.shareBtn} ${styles.shareCopy}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
            </li>
          </ul>
        </section>

        {/* Author Profile Card & Consultation CTA */}
        <section className={styles.authorCard}>
          <img
            src="/homepage/c.png"
            alt="Brahma Sri Narayanacharya"
            className={styles.authorCardAvatar}
          />
          <div className={styles.authorCardContent}>
            <h3 className={styles.authorCardTitle}>Brahma Sri Narayanacharya</h3>
            <p className={styles.authorCardSubtitle}>
              ವೇದ ಜ್ಯೋತಿಷ್ಯ ಹಾಗೂ ವಾಸ್ತು ಪರಿಣಿತರು • ಶ್ರೀ ನಾಗಸಾಯಿ ಜ್ಯೋತಿಷ್ಯಾಲಯ
            </p>
            <p className={styles.authorCardBio}>
              ಜಾತಕ ಪರಿಶೀಲನೆ, ವಿವಾಹ ಹೊಂದಾಣಿಕೆ, ವಾಸ್ತು ದೋಷ ನಿವಾರಣೆ, ವ್ಯಾಪಾರ-ವ್ಯವಹಾರ ಅಭಿವೃದ್ಧಿ ಹಾಗೂ ಮುಹೂರ್ತ ನಿರ್ಣಯಕ್ಕಾಗಿ
              ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ ಸಮಾಲೋಚನೆ ಪಡೆಯಿರಿ.
            </p>
            <a
              href="https://wa.me/918549803686?text=Namaskara%20Guruji,%20I%20read%20your%20article%20and%20would%20like%20to%20consult."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.consultBtn}
            >
              <span>ಸಮಾಲೋಚನೆಗೆ ಸಂಪರ್ಕಿಸಿ (Consult Guruji)</span>
              <span>➔</span>
            </a>
          </div>
        </section>

        {/* Community Banner */}
        <section className={styles.communityCard}>
          <h3>ದೈನಂದಿನ ಪಂಚಾಂಗ & ಧಾರ್ಮಿಕ ಅಪ್ಡೇಟ್ಸ್</h3>
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

        {/* Related / Recent Articles */}
        {relatedBlogs.length > 0 && (
          <section className={styles.relatedSection}>
            <h3 className={styles.relatedHeading}>ಇನ್ನಷ್ಟು ಪ್ರಮುಖ ಲೇಖನಗಳು (More Articles)</h3>
            <div className={styles.relatedGrid}>
              {relatedBlogs.map((item) => {
                const itemImg = item.sections?.find((s) => s.type === 'image');
                const itemTitle =
                  item.sections?.find((s) => s.type === 'title')?.value ||
                  item.slug?.replace(/-/g, ' ');

                return (
                  <Link
                    href={`/blog/${encodeURIComponent(item.slug)}`}
                    key={item.id}
                    className={styles.relatedCard}
                  >
                    <div className={styles.relatedCardImageWrapper}>
                      <img
                        src={itemImg ? itemImg.value : '/homepage/c.png'}
                        alt={itemTitle}
                        className={styles.relatedCardImage}
                      />
                    </div>
                    <div className={styles.relatedCardBody}>
                      <h4 className={styles.relatedCardTitle}>{itemTitle}</h4>
                      <span className={styles.relatedCardLink}>
                        <span>ಓದಿ (Read)</span>
                        <span>➔</span>
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
