import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../fireProductsConfig.js";

export const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
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
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {products.map(product => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><small><strong>Created At:</strong> {product.createdAt}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
};
