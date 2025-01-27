// import { useState } from 'react';
// export default function Matrimony() {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     preferences: '',
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Upload image to Cloudinary
//       const imageData = new FormData();
//       imageData.append('image', formData.image);
//       const imageRes = await axios.post('/api/upload', imageData);

//       // Send data to Google Sheets
//       const dataRes = await axios.post('/api/google-sheets', {
//         name: formData.name,
//         age: formData.age,
//         preferences: formData.preferences,
//         imageUrl: imageRes.data.imageUrl,
//       });

//       alert(dataRes.data.message);
//       setFormData({ name: '', age: '', preferences: '', image: null });
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <div>
//         <label>Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Age:</label>
//         <input
//           type="number"
//           name="age"
//           value={formData.age}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label>Preferences:</label>
//         <textarea
//           name="preferences"
//           value={formData.preferences}
//           onChange={handleChange}
//           required
//         ></textarea>
//       </div>
//       <div>
//         <label>Upload Image:</label>
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
