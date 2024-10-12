import React, { useEffect, useState } from "react";
import styles from "../../../english.module.css";

const TheTrubine2 = () => {
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
      "https://drive.google.com/file/d/1jEaz0F_0R1_a_zjHxrm-h5cWiMjEBOSk/preview" />
    </div>
  );
};

export default TheTrubine2;