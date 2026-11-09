// comps/Common/ImageWithSkeleton.js
import React, { useState, useEffect } from 'react';
import styles from './ImageWithSkeleton.module.css';
import { DiyaIcon } from './Icons';

const ImageWithSkeleton = ({
  src,
  alt = 'Astrology Article Banner',
  className = '',
  wrapperClassName = '',
  priority = false,
  aspectRatio,
  showEmblem = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src || '/homepage/c.png');

  // If src changes externally, reset loaded state
  useEffect(() => {
    setImgSrc(src || '/homepage/c.png');
    setIsLoaded(false);
  }, [src]);

  return (
    <div
      className={`${styles.skeletonContainer} ${wrapperClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Animated Shimmer Loader */}
      {!isLoaded && (
        <>
          <div className={styles.skeletonShimmer} />
          {showEmblem && (
            <div className={styles.skeletonEmblem}>
              <DiyaIcon size={32} color="rgba(255, 104, 1, 0.35)" />
            </div>
          )}
        </>
      )}

      {/* Actual Image */}
      <img
        src={imgSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`${styles.image} ${className} ${isLoaded ? styles.imageVisible : styles.imageHidden}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (imgSrc !== '/homepage/c.png') {
            setImgSrc('/homepage/c.png');
          }
          setIsLoaded(true);
        }}
      />
    </div>
  );
};

export default ImageWithSkeleton;
