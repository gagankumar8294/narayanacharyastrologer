
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './PopupForm.module.css'; // Import the CSS module

const PopupForm = () => {
  const [showForm, setShowForm] = useState(false);

  //router 
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000); // Show the form after 3 seconds

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleNavigateToPaper = () => {
    router.push('/newspaper/'); // Navigate to pages/paper
  };

  return (
    <>
      <div className={`${styles.popup} ${showForm ? styles.show : ''}`}>
        {/* <div className={styles['popup-content']}> */}
        <div className={styles.popup_content}>
          <button className={styles.closeBtn} onClick={handleCloseForm}>
            &times;
          </button>
          {/* <h2>Subscribe to our Newsletter</h2>
          <form>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required />
            <button type="submit">Subscribe</button>
          </form> */}
          <h2>DAILY NEWSPAPERS</h2>
          <p className={styles.click_here} onClick={handleNavigateToPaper}>CLICK HERE</p>
        </div>
      </div>
    </> 
  );
};

export default PopupForm;