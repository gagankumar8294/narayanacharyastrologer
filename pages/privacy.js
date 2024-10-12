import React from 'react';
import styles from "../styles/Blog.module.css";
import { useState, useEffect } from 'react';

const PrivacyPolicy = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server-side
  }

  return (
    <div style={{ paddingTop: "150px" }}>
      <h1 className={styles.main_heading}>Privacy Policy</h1>
      <p className={styles.paragraph}>
        Welcome to CodeAspirant! This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.
      </p>

      <h2 className={styles.h2_heading}>Information We Collect</h2>
      <p className={styles.paragraph}>
        We collect information using cookies, log files, web beacons, and other similar technologies to improve your experience. The types of information we collect include your IP address, browser type, internet service provider, and more.
      </p>

      <h2 className={styles.h2_heading}>How We Use Your Information</h2>
      <p className={styles.paragraph}>
        We use your personal information to communicate with you, provide services, and improve our website's content and layout.
      </p>

      <h2 className={styles.h2_heading}>Sharing Your Information</h2>
      <p className={styles.paragraph}>
        We may share your information with third parties for marketing, advertising, or other purposes with your consent.
      </p>

      <h2 className={styles.h2_heading}>Your Rights</h2>
      <p className={styles.paragraph}>
        If you are a European resident, you have the right to access, correct, or delete your personal information. If you would like to exercise this right, please contact us.
      </p>

      <h2 className={styles.h2_heading}>Changes to This Policy</h2>
      <p className={styles.paragraph}>
        We may update this Privacy Policy from time to time. The updated version will be posted on our website with the updated date.
      </p>

      <h2 className={styles.h2_heading}>Contact Us</h2>
      <p className={styles.paragraph}>
        For more information about our privacy practices, please contact us by email at privacy@codeaspirant.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;