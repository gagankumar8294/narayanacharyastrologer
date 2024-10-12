// components/SplashScreen.js
import React from 'react';
import styles from './SplashScreen.module.css'; // For styling

const SplashScreen = () => {
  return (
    <div className={styles.splashScreen}>
      <h1 className={styles.logoText}>CodeAspirant</h1>
      <img 
        src="/loading.gif" // path to your GIF file
        alt="Loading..."
        className={styles.loadingGif}
      />
      {/* Add other media if needed */}
    </div>
  );
};

export default SplashScreen;
