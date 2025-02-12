import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../fireProductsConfig';
import Image from 'next/image';
import styles from '../../comps/Products/products.module.css';

const ProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', slug);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <section className={styles.productDetail}>
      <h1 className={styles.title}>{product.name}</h1>
      <Image src={product.image} alt={product.name} width={600} height={400} className={styles.image} />
      <p className={styles.description}>{product.description}</p>
      <a href={product.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
        View Product
      </a>
    </section>
  );
};

export default ProductDetail;
