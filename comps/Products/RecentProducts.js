import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../fireProductsConfig';
import Image from 'next/image';
import styles from './RecentProductsModern.module.css';
import { useRouter } from 'next/router';

const RecentProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          slug: doc.data().slug || doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.warn('Note: Could not fetch products from Firestore:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return null;
  }

  if (products.length === 0) {
    return null; // Don't show empty section if no products exist in Firebase
  }

  return (
    <section className={styles.productSection}>
      <div className={styles.headingWrapper}>
        <span className={styles.badge}>Spiritual Remedies</span>
        <h2 className={styles.heading}>Sacred Products & Yantras</h2>
        <p className={styles.subtitle}>
          Consecrated Yantras, Rudrakshas, and Gemstones energized through Vedic rituals.
        </p>
      </div>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => router.push(`/product/${product.slug}`)}
          >
            <div className={styles.imageWrapper}>
              <img
                src={product.image || '/homepage/c.png'}
                alt={product.name || 'Sacred Astrological Product'}
                className={styles.productImage}
              />
            </div>
            <div className={styles.cardBody}>
              <div>
                <span className={styles.productTag}>Energized Item</span>
                <h3 className={styles.productName}>{product.name}</h3>
              </div>
              <button className={styles.actionBtn}>
                <span>View Details & Order</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.viewAllContainer}>
        <button className={styles.viewAllBtn} onClick={() => router.push('/product')}>
          Explore All Sacred Products ➔
        </button>
      </div>
    </section>
  );
};

export default RecentProducts;
