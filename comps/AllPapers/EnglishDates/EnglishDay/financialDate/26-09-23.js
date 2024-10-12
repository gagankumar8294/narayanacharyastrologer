import React, { useEffect, useState } from "react";
import styles from "../../../english.module.css";

const FinancialExpress4 = () => {
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
      "https://drive.google.com/file/d/1z7GLszu1rT60MPnKVmDskWqZneTOX1XH/preview"
      />
    </div>
  );
};

export default FinancialExpress4;