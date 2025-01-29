import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../fireProductsConfig.js";

export const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
            createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleString() : "No Date",
          };
        });
        setNewProducts(productList);
      } catch (error) {
        console.error("Error fetching new products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % newProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [newProducts]);

  if (loading) {
    return <p>Loading new products...</p>;
  }

  return (
    <div>
      <h2>New Arrivals</h2>
      <div style={{
        display: "flex", 
        overflow: "hidden", 
        width: "100%", 
        position: "relative"
      }}>
        <div style={{
          display: "flex",
          transform: `translateX(-${currentIndex * 25}%)`,  // Corrected: backticks for template literal
          transition: "transform 0.5s ease-in-out",
          gap: "20px"
        }}>
          {newProducts.map(product => (
            <div key={product.id} style={{ minWidth: "25%", flexShrink: 0, textAlign: "center" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
