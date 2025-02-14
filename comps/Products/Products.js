
// import React, { useState, useEffect } from "react";
// import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
// import { db } from "../../fireProductsConfig";
// import styles from "./products.module.css";

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     image: "",
//     name: "",
//     price: "",
//     description: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [editProductId, setEditProductId] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
//       const productList = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(productList);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           image: reader.result,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       if (editProductId) {
//         // Confirm before updating
//         const confirmUpdate = window.confirm("Are you sure you want to update this product?");
//         if (!confirmUpdate) {
//           setLoading(false);
//           return;
//         }

//         const productRef = doc(db, "products", editProductId);
//         await updateDoc(productRef, { ...formData });
//         setSuccess("Product updated successfully!");
//         setEditProductId(null);
//       } else {
//         const docRef = await addDoc(collection(db, "products"), {
//           ...formData,
//           createdAt: new Date(),
//         });
//         setSuccess(`Product added successfully with ID: ${docRef.id}`);
//       }

//       setFormData({ image: "", name: "", price: "", description: "" });
//     } catch (err) {
//       setError("Error saving product: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🗑️ Delete Function with Confirmation
//   const handleDelete = async (productId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this product?");
//     if (!confirmDelete) return;

//     try {
//       await deleteDoc(doc(db, "products", productId));
//       setSuccess("Product deleted successfully!");
//     } catch (err) {
//       setError("Error deleting product: " + err.message);
//     }
//   };

//   // ✏️ Edit Function
//   const handleEdit = (product) => {
//     setFormData({
//       image: product.image,
//       name: product.name,
//       price: product.price,
//       description: product.description,
//     });
//     setEditProductId(product.id);
//   };

//   return (
//     <div style={{ paddingTop: "100px" }}>
//       <div className={styles.container}>
//         <h2 className={styles.title}>
//           {editProductId ? "Edit Product" : "Add New Product"}
//         </h2>

//         {error && <p className={styles.error}>{error}</p>}
//         {success && <p className={styles.success}>{success}</p>}

//         <form onSubmit={handleSubmit} className={styles.form}>
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className={styles.input}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Product Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Price</label>
//             <input
//               type="text"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className={styles.textarea}
//               rows="4"
//               required
//             ></textarea>
//           </div>

//           <button type="submit" className={styles.button} disabled={loading}>
//             {loading ? "Saving..." : editProductId ? "Update Product" : "Add Product"}
//           </button>

//           {editProductId && (
//             <button
//               type="button"
//               className={styles.cancelButton}
//               onClick={() => {
//                 setFormData({ image: "", name: "", price: "", description: "" });
//                 setEditProductId(null);
//               }}
//             >
//               Cancel
//             </button>
//           )}
//         </form>

//         {/* Product List */}
//         <div className={styles.productList}>
//           <h3>Product List</h3>
//           {products.length === 0 ? (
//             <p>No products added yet.</p>
//           ) : (
//             products.map((product) => (
//               <div key={product.id} className={styles.productItem}>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className={styles.productImage}
//                 />
//                 <div className={styles.productDetails}>
//                   <p className={styles.productName}>{product.name}</p>
//                   <button
//                     className={styles.editButton}
//                     onClick={() => handleEdit(product)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className={styles.deleteButton}
//                     onClick={() => handleDelete(product.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;import React, { useState, useEffect } from "react";

// import React, { useState, useEffect } from "react";
// import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
// import { db } from "../../fireProductsConfig";
// import styles from "./products.module.css";

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     image: "",
//     name: "",
//     price: "",
//     description: "",
//     slug: "",  // Added slug field
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [editProductId, setEditProductId] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
//       const productList = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(productList);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "slug") {
//       const formattedSlug = value
//         .toLowerCase()
//         .replace(/[^a-z0-9\s-]/g, "")  // Remove special characters
//         .trim()
//         .replace(/\s+/g, "-");  // Replace spaces with hyphens

//       setFormData({
//         ...formData,
//         slug: formattedSlug,
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({
//           ...formData,
//           image: reader.result,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       if (editProductId) {
//         const confirmUpdate = window.confirm("Are you sure you want to update this product?");
//         if (!confirmUpdate) {
//           setLoading(false);
//           return;
//         }

//         const productRef = doc(db, "products", editProductId);
//         await updateDoc(productRef, { ...formData });
//         setSuccess("Product updated successfully!");
//         setEditProductId(null);
//       } else {
//         const docRef = await addDoc(collection(db, "products"), {
//           ...formData,
//           createdAt: new Date(),
//         });
//         setSuccess(`Product added successfully with ID: ${docRef.id}`);
//       }

//       setFormData({ image: "", name: "", price: "", description: "", slug: "" });
//     } catch (err) {
//       setError("Error saving product: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (productId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this product?");
//     if (!confirmDelete) return;

//     try {
//       await deleteDoc(doc(db, "products", productId));
//       setSuccess("Product deleted successfully!");
//     } catch (err) {
//       setError("Error deleting product: " + err.message);
//     }
//   };

//   const handleEdit = (product) => {
//     setFormData({
//       image: product.image,
//       name: product.name,
//       price: product.price,
//       description: product.description,
//       slug: product.slug || "",  // Load slug if available
//     });
//     setEditProductId(product.id);
//   };

//   return (
//     <div style={{ paddingTop: "100px" }}>
//       <div className={styles.container}>
//         <h2 className={styles.title}>
//           {editProductId ? "Edit Product" : "Add New Product"}
//         </h2>

//         {error && <p className={styles.error}>{error}</p>}
//         {success && <p className={styles.success}>{success}</p>}

//         <form onSubmit={handleSubmit} className={styles.form}>
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className={styles.input}
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Product Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Slug</label>
//             <input
//               type="text"
//               name="slug"
//               value={formData.slug}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             />
//             <small className={styles.helpText}>Slug will be formatted automatically.</small>
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Price</label>
//             <input
//               type="text"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className={styles.textarea}
//               rows="4"
//               required
//             ></textarea>
//           </div>

//           <button type="submit" className={styles.button} disabled={loading}>
//             {loading ? "Saving..." : editProductId ? "Update Product" : "Add Product"}
//           </button>

//           {editProductId && (
//             <button
//               type="button"
//               className={styles.cancelButton}
//               onClick={() => {
//                 setFormData({ image: "", name: "", price: "", description: "", slug: "" });
//                 setEditProductId(null);
//               }}
//             >
//               Cancel
//             </button>
//           )}
//         </form>

//         <div className={styles.productList}>
//           <h3>Product List</h3>
//           {products.length === 0 ? (
//             <p>No products added yet.</p>
//           ) : (
//             products.map((product) => (
//               <div key={product.id} className={styles.productItem}>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className={styles.productImage}
//                 />
//                 <div className={styles.productDetails}>
//                   <p className={styles.productName}>{product.name}</p>
//                   <p className={styles.productSlug}>Slug: {product.slug}</p>
//                   <button
//                     className={styles.editButton}
//                     onClick={() => handleEdit(product)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className={styles.deleteButton}
//                     onClick={() => handleDelete(product.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;


import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../fireProductsConfig";
import styles from "./products.module.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
    slug: "",
    weight: "",
    length: "",
    width: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "slug") {
      const formattedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      setFormData({
        ...formData,
        slug: formattedSlug,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (editProductId) {
        const confirmUpdate = window.confirm("Are you sure you want to update this product?");
        if (!confirmUpdate) {
          setLoading(false);
          return;
        }

        const productRef = doc(db, "products", editProductId);
        await updateDoc(productRef, { ...formData });
        setSuccess("Product updated successfully!");
        setEditProductId(null);
      } else {
        const docRef = await addDoc(collection(db, "products"), {
          ...formData,
          createdAt: new Date(),
        });
        setSuccess(`Product added successfully with ID: ${docRef.id}`);
      }

      setFormData({ image: "", name: "", price: "", description: "", slug: "", weight: "", length: "", width: "" });
    } catch (err) {
      setError("Error saving product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", productId));
      setSuccess("Product deleted successfully!");
    } catch (err) {
      setError("Error deleting product: " + err.message);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      image: product.image,
      name: product.name,
      price: product.price,
      description: product.description,
      slug: product.slug || "",
      weight: product.weight || "",
      length: product.length || "",
      width: product.width || "",
    });
    setEditProductId(product.id);
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {editProductId ? "Edit Product" : "Add New Product"}
        </h2>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Slug</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} className={styles.input} required />
            <small className={styles.helpText}>Slug will be formatted automatically.</small>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Price</label>
            <input type="text" name="price" value={formData.price} onChange={handleChange} className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className={styles.textarea} rows="4" required></textarea>
          </div>

          {/* New fields for weight, length, and width */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Weight (kg)</label>
            <input type="text" name="weight" value={formData.weight} onChange={handleChange} className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Length (cm)</label>
            <input type="text" name="length" value={formData.length} onChange={handleChange} className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Width (cm)</label>
            <input type="text" name="width" value={formData.width} onChange={handleChange} className={styles.input} />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Saving..." : editProductId ? "Update Product" : "Add Product"}
          </button>

          {editProductId && (
            <button type="button" className={styles.cancelButton} onClick={() => {
                setFormData({ image: "", name: "", price: "", description: "", slug: "", weight: "", length: "", width: "" });
                setEditProductId(null);
              }}>
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
