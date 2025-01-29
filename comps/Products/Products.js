// import React, { useState } from "react";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import fireProductConfig from "../../fireProductsConfig.js" // Adjust the path as necessary
// import styles from "./products.module.css"; // Import the CSS module

// // Initialize Firebase app and Firestore
// const app = initializeApp(fireProductConfig);
// const db = getFirestore(app);

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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       // Add the product data to Firestore
//       const docRef = await addDoc(collection(db, "products"), {
//         image: formData.image,
//         name: formData.name,
//         price: formData.price,
//         description: formData.description,
//         createdAt: new Date(),
//       });

//       setSuccess(`Product added successfully with ID: ${docRef.id}`);
//       setFormData({ image: "", name: "", price: "", description: "" });
//     } catch (err) {
//       setError("Error adding product: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
    // <div className={styles.container}>
    //   <h2 className={styles.title}>Add New Product</h2>

    //   {error && <p className={styles.error}>{error}</p>}
    //   {success && <p className={styles.success}>{success}</p>}

    //   <form onSubmit={handleSubmit} className={styles.form}>
    //     <div className={styles.formGroup}>
    //       <label className={styles.label}>Image URL</label>
    //       <input
    //         type="text"
    //         name="image"
    //         value={formData.image}
    //         onChange={handleChange}
    //         className={styles.input}
    //         required
    //       />
    //     </div>

    //     <div className={styles.formGroup}>
    //       <label className={styles.label}>Product Name</label>
    //       <input
    //         type="text"
    //         name="name"
    //         value={formData.name}
    //         onChange={handleChange}
    //         className={styles.input}
    //         required
    //       />
    //     </div>

    //     <div className={styles.formGroup}>
    //       <label className={styles.label}>Price</label>
    //       <input
    //         type="text"
    //         name="price"
    //         value={formData.price}
    //         onChange={handleChange}
    //         className={styles.input}
    //         required
    //       />
    //     </div>

    //     <div className={styles.formGroup}>
    //       <label className={styles.label}>Description</label>
    //       <textarea
    //         name="description"
    //         value={formData.description}
    //         onChange={handleChange}
    //         className={styles.textarea}
    //         rows="4"
    //         required
    //       ></textarea>
    //     </div>

    //     <button
    //       type="submit"
    //       className={styles.button}
    //       disabled={loading}
    //     >
    //       {loading ? "Adding..." : "Add Product"}
    //     </button>
    //   </form>
    // </div>
//   );
// };

// export default AddProduct;

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../fireProductsConfig"; // Ensure correct path
import styles from "./products.module.css"; // Import the CSS module

const AddProduct = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result, // Store Base64 image data
        });
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Store the image data directly in Firestore
      const docRef = await addDoc(collection(db, "products"), {
        ...formData,
        createdAt: new Date(),
      });

      setSuccess(`Product added successfully with ID: ${docRef.id}`);
      setFormData({ image: "", name: "", price: "", description: "" });
    } catch (err) {
      setError("Error adding product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className={styles.container}>
        <h2 className={styles.title}>Add New Product</h2>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
