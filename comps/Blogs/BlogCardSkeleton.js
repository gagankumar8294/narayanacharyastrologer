// comps/Blogs/BlogCardSkeleton.js
import React from 'react';
import styles from './Blogcard.module.css';

const BlogCardSkeleton = () => {
  return (
    <div className={styles.skeletonCard} aria-hidden="true">
      <div className={styles.skeletonImage} />
      <div className={styles.cardBody}>
        <div>
          <div className={styles.skeletonTag} />
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonTitleShort} />
          <div className={styles.skeletonText} />
          <div className={styles.skeletonTextShort} />
        </div>
        <div className={styles.skeletonButton} />
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
