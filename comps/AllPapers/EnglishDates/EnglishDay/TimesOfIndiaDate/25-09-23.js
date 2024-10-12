import React, { useEffect, useState } from "react";
import styles from "../../../english.module.css";

const TheTimesOfIndiaDay3 = () => {
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
      "https://drive.google.com/file/d/1CE1GDbf2x7KpLUxQn0DjWoL-asxDX27N/preview" />
    </div>
  );
};

export default TheTimesOfIndiaDay3;