import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { matrimonialDb } from './firebaseConfig'; // Import Firestore from your firebaseConfig.js

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

  const handleSexSelect = (selectedSex) => {
    setFormData({ ...formData, sex: selectedSex });
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Father's Name:</label>
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Mother's Name:</label>
          <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Siblings:</label>
          <input
            type="text"
            value={siblingInput}
            onChange={(e) => setSiblingInput(e.target.value)}
          />
          <button type="button" onClick={handleAddSibling}>Add Sibling</button>
          <ul>
            {formData.siblings.map((sibling, index) => (
              <li key={index}>{sibling}</li>
            ))}
          </ul>
        </div>
        <div>
          <label>Age:</label>
          <input
            type="text"
            readOnly
            value={formData.age}
            onClick={() => setDatePopup(true)}
            required
          />
          {datePopup && (
            <div>
              <label>Year:</label>
              <input
                type="number"
                value={selectedDate.year}
                onChange={(e) => setSelectedDate({ ...selectedDate, year: e.target.value })}
              />
              <label>Month:</label>
              <input
                type="number"
                value={selectedDate.month}
                onChange={(e) => setSelectedDate({ ...selectedDate, month: e.target.value })}
              />
              <label>Day:</label>
              <input
                type="number"
                value={selectedDate.day}
                onChange={(e) => setSelectedDate({ ...selectedDate, day: e.target.value })}
              />
              <button type="button" onClick={() => handleDateSelection(selectedDate.year, selectedDate.month, selectedDate.day)}>Select Date</button>
            </div>
          )}
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Born Time:</label>
          <input
            type="time"
            name="bornTime"
            value={formData.bornTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Sex:</label>
          <button type="button" onClick={() => handleSexSelect('Male')}>Male</button>
          <button type="button" onClick={() => handleSexSelect('Female')}>Female</button>
        </div>
        <div>
          <label>Place of Birth:</label>
          <input
            type="text"
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Caste:</label>
          <input
            type="text"
            name="caste"
            value={formData.caste}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Currently Staying:</label>
          <input
            type="text"
            name="staying"
            value={formData.staying}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Qualification:</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Work:</label>
          <input
            type="text"
            name="work"
            value={formData.work}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Rashi:</label>
          <select
            name="rashi"
            value={formData.rashi}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Rashi</option>
            <option value="Aries">Aries</option>
            <option value="Taurus">Taurus</option>
            {/* Add other rashis */}
          </select>
        </div>
        <div>
          <label>Nakshatra:</label>
          <select
            name="nakshatra"
            value={formData.nakshatra}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Nakshatra</option>
            <option value="Ashwini">Ashwini</option>
            <option value="Bharani">Bharani</option>
            {/* Add other nakshatras */}
          </select>
        </div>
        <div>
          <label>Height:</label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Profile Photo (Mandatory):</label>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label>Extra Photos (Optional):</label>
          <input
            type="file"
            name="extraPhotos"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
