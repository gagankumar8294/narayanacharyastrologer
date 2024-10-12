import React, { useState, useEffect } from 'react';
import styles from './Projects.module.css'; // Import the styles
import brandingWebsite from './branding-website.png';
import digitalAgencyWebsite from './digital-agency-website.png';
import portfolioWebsite from './portfolio-website.png';
import Image from 'next/image';

// Update image paths to imported images
const images = [
  {
    src: portfolioWebsite,
    alt: 'Portfolio Website',
    description: 'Portfolio Website',
    url: 'https://syedmujahid.vercel.app/',
    width: 600, // Adjust width as needed
    height: 400, // Adjust height as needed
  },
  {
    src: brandingWebsite,
    alt: 'Branding Website',
    description: 'Branding Website',
    url: 'https://bizzwizz.netlify.app/',
    width: 600,
    height: 400,
  },
  {
    src: digitalAgencyWebsite,
    alt: 'Digital Agency Website',
    url: 'https://digisolve-fawn.vercel.app/',
    description: 'Digital Agency Website',
    width: 600,
    height: 400,
  },
];

const Project = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Function to go to the next image
  const nextSlide = () => {
    setFade(false); // Start fade out
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(true); // Start fade in
    }, 500); // Adjust time to match CSS transition duration
  };

  // Function to go to the previous image
  const prevSlide = () => {
    setFade(false); // Start fade out
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setFade(true); // Start fade in
    }, 500); // Adjust time to match CSS transition duration
  };

  // Automatically change slides every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className={styles.project_section}>
      <h3 className={styles.service_heading}>Projects We Worked On</h3>
      <div className={styles.carousel}>
        <button className={styles.leftButton} onClick={prevSlide}>&lt;</button>
        <div className={styles.imageContainer}>
        <a href={images[currentIndex].url} target="_blank" rel="noopener noreferrer">
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            width={images[currentIndex].width}
            height={images[currentIndex].height}
            className={`${styles.image} ${fade ? styles.fadeIn : styles.fadeOut}`}
          />
          </a>
          <div className={styles.description}>{images[currentIndex].description}</div>
        </div>
        <button className={styles.rightButton} onClick={nextSlide}>&gt;</button>
      </div>
    </section>
  );
};

export default Project;