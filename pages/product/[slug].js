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

  const blogURL = `${window.location.origin}/product/${slug}`;
  const blogTitle = product?.sections?.find(section => section.type === "title")?.value || "Untitled Blog";


  return (
    <>
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
          {product.weight && <li className={styles.desc_li}>Weight: {product.weight} kg</li>}
          {product.length && <li className={styles.desc_li}>Length: {product.length} cm</li>}
          {product.width && <li className={styles.desc_li}>Width: {product.width} cm</li>}
        </ul>
      )}
      <p className={styles.description}>{product.description}</p>
      {/* <a href={product.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
        View Product
      </a> */}
    </section>

    {/* Social */}
    <section className={styles.so_sec}>
              <div className={styles.social}>
                <ul>
                  <li>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogURL)}`} target="_blank" rel="noopener noreferrer">
                      <svg className={styles.svg} version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <path d="M29 0h-26c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h13v-14h-4v-4h4v-2c0-3.306 2.694-6 6-6h4v4h-4c-1.1 0-2 0.9-2 2v2h6l-1 4h-5v14h9c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogURL)}&text=${encodeURIComponent(blogTitle)}`} target="_blank" rel="noopener noreferrer">
                      <svg className={styles.svg} version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <path d="M32 7.075c-1.175 0.525-2.444 0.875-3.769 1.031 1.356-0.813 2.394-2.1 2.887-3.631-1.269 0.75-2.675 1.3-4.169 1.594-1.2-1.275-2.906-2.069-4.794-2.069-3.625 0-6.563 2.938-6.563 6.563 0 0.512 0.056 1.012 0.169 1.494-5.456-0.275-10.294-2.888-13.531-6.862-0.563 0.969-0.887 2.1-0.887 3.3 0 2.275 1.156 4.287 2.919 5.463-1.075-0.031-2.087-0.331-2.975-0.819 0 0.025 0 0.056 0 0.081 0 3.181 2.263 5.838 5.269 6.437-0.55 0.15-1.131 0.231-1.731 0.231-0.425 0-0.831-0.044-1.237-0.119 0.838 2.606 3.263 4.506 6.131 4.563-2.25 1.762-5.075 2.813-8.156 2.813-0.531 0-1.050-0.031-1.569-0.094 2.913 1.869 6.362 2.95 10.069 2.95 12.075 0 18.681-10.006 18.681-18.681 0-0.287-0.006-0.569-0.019-0.85 1.281-0.919 2.394-2.075 3.275-3.394z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href={`https://t.me/share/url?url=${encodeURIComponent(blogURL)}&text=${encodeURIComponent(blogTitle)}`} target="_blank" rel="noopener noreferrer">
                      <svg className={styles.svg} version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <path d="M16 0c-8.838 0-16 7.162-16 16s7.162 16 16 16 16-7.163 16-16-7.163-16-16-16zM23.863 10.969l-2.625 12.369c-0.181 0.881-0.712 1.087-1.45 0.681l-4-2.956-1.919 1.869c-0.225 0.219-0.4 0.4-0.8 0.4-0.519 0-0.431-0.194-0.606-0.688l-1.363-4.475-3.956-1.231c-0.856-0.262-0.862-0.85 0.194-1.269l15.412-5.95c0.7-0.319 1.381 0.169 1.113 1.25z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href={`whatsapp://send?text=CodeAspirant blog post:%0A${encodeURIComponent(blogTitle)}%0A${encodeURIComponent(blogURL)}`} target="_blank" rel="noopener noreferrer">
                      <svg className={styles.svg} version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <path d="M27.281 4.65c-2.994-3-6.975-4.65-11.219-4.65-8.738 0-15.85 7.112-15.85 15.856 0 2.794 0.731 5.525 2.119 7.925l-2.25 8.219 8.406-2.206c2.319 1.262 4.925 1.931 7.575 1.931h0.006c0 0 0 0 0 0 8.738 0 15.856-7.113 15.856-15.856 0-4.238-1.65-8.219-4.644-11.219zM16.069 29.050v0c-2.369 0-4.688-0.637-6.713-1.837l-0.481-0.288-4.987 1.306 1.331-4.863-0.313-0.5c-1.325-2.094-2.019-4.519-2.019-7.012 0-7.269 5.912-13.181 13.188-13.181 3.519 0 6.831 1.375 9.319 3.862 2.488 2.494 3.856 5.8 3.856 9.325-0.006 7.275-5.919 13.188-13.181 13.188zM23.294 19.175c-0.394-0.2-2.344-1.156-2.706-1.288s-0.625-0.2-0.894 0.2c-0.262 0.394-1.025 1.288-1.256 1.556-0.231 0.262-0.462 0.3-0.856 0.1s-1.675-0.619-3.188-1.969c-1.175-1.050-1.975-2.35-2.206-2.744s-0.025-0.613 0.175-0.806c0.181-0.175 0.394-0.463 0.594-0.694s0.262-0.394 0.394-0.662c0.131-0.262 0.069-0.494-0.031-0.694s-0.894-2.15-1.219-2.944c-0.319-0.775-0.65-0.669-0.894-0.681-0.231-0.012-0.494-0.012-0.756-0.012s-0.694 0.1-1.056 0.494c-0.394 0.394-1.438 1.394-1.438 3.519 0 2.138 0.619 4.263 2.025 5.562 2.206 1.925 4.844 2.775 6.275 3.212 2.506 0.619 3.488 0.394 4.088 0.394 1.025 0 2.844-1.6 3.263-2.062 0.681-0.675 0.369-1.437 0.263-1.663z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:?subject=${encodeURIComponent(blogTitle)}&body=Check out this amazing blog post: ${encodeURIComponent(blogURL)}`} target="_blank" rel="noopener noreferrer">
                      <svg className={styles.svg} version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <path d="M29.333 0h-26.667c-1.833 0-3.333 1.5-3.333 3.333v25.333c0 1.833 1.5 3.333 3.333 3.333h26.667c1.833 0 3.333-1.5 3.333-3.333v-25.333c0-1.833-1.5-3.333-3.333-3.333zM29.333 28c0 0.067-0.067 0.133-0.133 0.133h-26.667c-0.067 0-0.133-0.067-0.133-0.133v-20.667l13.333 8.667 13.333-8.667v20.667zM16 17.667l-16-10.667h26.667l-10.667 10.667z"></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* community joine */}
            <div className={styles.community_div}>
              <section className={styles.community}>
              <h4>Join Our Community</h4>
              {/* <div className={styles.download_our_app}>
                <h3>Telegram Group</h3>
                <p>Discover special offers, top stories, upcoming events, and more.</p>
                <h5><a href='https://t.me/+AMw2eT97A885Yjhl'>Join Telegram</a></h5>
              </div> */}

              <div className={styles.download_our_app}>
                <h3>WhatsApp Group</h3>
                <p>Discover special offers, top stories, upcoming events, and more.</p>
                <h5><a href='https://chat.whatsapp.com/BOypJbJNmaJHgWtWfdrx3i'>Join Whatsapp</a></h5>
              </div>

              {/* <div className={styles.download_our_app}>
                <h3>Subscribe to our Daily newsletter</h3>
                <p>Join our editors every weekday evening as they steer you through the most significant news of the day.</p>
              </div> */}
            </section>
            </div>
    </>
    

    
    
  );
};

export default ProductDetail;
