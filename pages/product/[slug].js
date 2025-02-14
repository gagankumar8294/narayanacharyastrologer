import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
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
        console.log("Fetching product with slug:", slug); // Debugging

        const q = query(collection(db, 'products'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const productData = querySnapshot.docs[0].data();
          setProduct({ id: querySnapshot.docs[0].id, ...productData });
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
      <Image src={product.image} alt={product.name} width={600} height={400} className={styles.image} />
      <h1 className={styles.title}>{product.name}</h1>
      <p className={styles.price_tag} style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: "bold" }}>
        ₹ {product.price} <span className={styles.price_span}>- contact us for best price</span>
      </p>
      <h3 className={styles.h3_description}>Description</h3>
      {/* Conditional bullet points */}
      {(product.weight || product.length || product.width) && (
        <ul className={styles.productSpecs}>
          {product.weight && <li>Weight: {product.weight} kg</li>}
          {product.length && <li>Length: {product.length} cm</li>}
          {product.width && <li>Width: {product.width} cm</li>}
        </ul>
      )}
      <p className={styles.description}>{product.description}</p>
      {/* <a href={product.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
        View Product
      </a> */}
    </section>
  );
};

export default ProductDetail;
