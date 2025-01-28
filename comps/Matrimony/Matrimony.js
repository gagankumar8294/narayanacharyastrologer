import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { matrimonialDb } from '@/fireConfig';
import styles from './matrimonyList.module.css';

export default function Matrimony() {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    siblings: [],
    age: '',
    mobile: '',
    bornTime: '',
    sex: '',
    placeOfBirth: '',
    caste: '',
    staying: '',
    qualification: '',
    work: '',
    rashi: '',
    nakshatra: '',
    height: '',
    profilePhoto: '',
    extraPhotos: []
  });

  const [siblingInput, setSiblingInput] = useState('');
  const [datePopup, setDatePopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ year: '', month: '', day: '' });
  const db = getFirestore(matrimonialDb);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const reader = new FileReader();

    if (name === 'profilePhoto') {
      reader.onload = () => {
        setFormData({ ...formData, profilePhoto: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else if (name === 'extraPhotos') {
      const extraPhotos = [];
      Array.from(files).forEach((file) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          extraPhotos.push(fileReader.result);
          if (extraPhotos.length === files.length) {
            setFormData({ ...formData, extraPhotos });
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  };

  const handleAddSibling = () => {
    if (siblingInput.trim()) {
      setFormData({ ...formData, siblings: [...formData.siblings, siblingInput] });
      setSiblingInput('');
    }
  };

  const handleDateSelection = (year, month, day) => {
    setFormData({ ...formData, age: `${year}-${month}-${day}` });
    setDatePopup(false);
  };

  const handleSexSelect = (sex) => {
    setFormData({ ...formData, sex });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profilePhoto) {
      alert('Profile photo is mandatory.');
      return;
    }

    try {
      await addDoc(collection(db, 'matrimonialuserdata'), {
        ...formData
      });

      alert('Form submitted successfully!');
      setFormData({
        name: '',
        fatherName: '',
        motherName: '',
        siblings: [],
        age: '',
        mobile: '',
        bornTime: '',
        sex: '',
        placeOfBirth: '',
        caste: '',
        staying: '',
        qualification: '',
        work: '',
        rashi: '',
        nakshatra: '',
        height: '',
        profilePhoto: '',
        extraPhotos: []
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Father's Name:</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Mother's Name:</label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Siblings:</label>
          <input
            type="text"
            value={siblingInput}
            onChange={(e) => setSiblingInput(e.target.value)}
            className={styles.input}
          />
          <button
            type="button"
            onClick={handleAddSibling}
            className={styles.button}
          >
            Add Sibling
          </button>
          <ul className={styles.siblingList}>
            {formData.siblings.map((sibling, index) => (
              <li key={index} className={styles.siblingItem}>
                {sibling}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Age:</label>
          <input
            type="text"
            readOnly
            value={formData.age}
            onClick={() => setDatePopup(true)}
            className={styles.input}
            required
          />
          {datePopup && (
            <div className={styles.datePopup}>
              <label className={styles.label}>Year:</label>
              <input
                type="number"
                value={selectedDate.year}
                onChange={(e) =>
                  setSelectedDate({ ...selectedDate, year: e.target.value })
                }
                className={styles.input}
              />
              <label className={styles.label}>Month:</label>
              <input
                type="number"
                value={selectedDate.month}
                onChange={(e) =>
                  setSelectedDate({ ...selectedDate, month: e.target.value })
                }
                className={styles.input}
              />
              <label className={styles.label}>Day:</label>
              <input
                type="number"
                value={selectedDate.day}
                onChange={(e) =>
                  setSelectedDate({ ...selectedDate, day: e.target.value })
                }
                className={styles.input}
              />
              <button
                type="button"
                onClick={() =>
                  handleDateSelection(
                    selectedDate.year,
                    selectedDate.month,
                    selectedDate.day
                  )
                }
                className={styles.button}
              >
                Select Date
              </button>
            </div>
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Mobile Number:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Born Time:</label>
          <input
            type="time"
            name="bornTime"
            value={formData.bornTime}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Sex:</label>
          <button
            type="button"
            onClick={() => handleSexSelect('Male')}
            className={styles.button}
          >
            Male
          </button>
          <button
            type="button"
            onClick={() => handleSexSelect('Female')}
            className={styles.button}
          >
            Female
          </button>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Place of Birth:</label>
          <input
            type="text"
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Profile Photo (Mandatory):</label>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
