import React, { useEffect, useState } from "react";
import styles from "../../../english.module.css";

const TheTrubine7 = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const iframe = document.querySelector("iframe");

    const loadHandler = () => {
      setIsLoading(false);
    };

    iframe.addEventListener("load", loadHandler);

    return () => {
      iframe.removeEventListener("load", loadHandler);
    };
  }, []);

  return (
    <div>
      {isLoading && (
        <div className="loading">
          <span>Loading PDF...</span>
        </div>
      )}
      <iframe className={styles.iframe_dimensions} src=
      "https://drive.google.com/file/d/1R7BA6SV9CYsq67zn3VvkXVEff9n3AyAh/preview"
      />
    </div>
  );
};

export default TheTrubine7;