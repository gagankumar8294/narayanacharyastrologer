import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig.js'; // Ensure correct path
import Image from 'next/image';
import styles from './Projects.module.css';

const RecentBlogs = () => {

  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 764);
    };

    handleResize(); // Set the initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch the 3 most recent products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (products.length > 0) {
      const slideInterval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
          setFade(true);
        }, 500);
      }, 5000);

      return () => clearInterval(slideInterval);
    }
  }, [products]);

  if (products.length === 0) {
    return <p>Loading products...</p>;
  }

  return (
    <>
      {isLargeScreen ? ( 
      <section className={styles.project_section}>
        <h3 className={styles.service_heading}>Recent Products</h3>
        <div className={styles.carousel}>
          <button className={styles.leftButton} onClick={() => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)}>&lt;</button>
          <div className={styles.imageContainer}>
            <a href={products[currentIndex].url} target="_blank" rel="noopener noreferrer">
              <Image
                src={products[currentIndex].image}
                alt={products[currentIndex].name}
                width={600}
                height={400}
                className={`${styles.image} ${fade ? styles.fadeIn : styles.fadeOut}`}
              />
            </a>
            <div className={styles.description}>{products[currentIndex].description}</div>
          </div>
          <button className={styles.rightButton} onClick={() => setCurrentIndex((prev) => (prev + 1) % products.length)}>&gt;</button>
        </div>
      </section>
    ) : ( <h2>mobile width</h2>) }
    </>
    
  );
};

export default RecentBlogs;