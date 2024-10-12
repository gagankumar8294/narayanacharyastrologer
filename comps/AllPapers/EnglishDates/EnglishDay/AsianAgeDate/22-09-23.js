import styles from "../../../english.module.css";

import React, { useEffect, useState } from "react";

const AsianAgeDay0 = () => {
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
      <iframe className={styles.iframe_dimensions} src="https://drive.google.com/file/d/1bgXSWUoIjE3DQyQz5ZONIuvlbw3oYF8F/preview" />
    </div>
  );
};

export default AsianAgeDay0;




// import { useEffect, useState } from "react";

// const AsianAgeDay0 = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   const openPDF = () => {
//     const pdfURL = "https://drive.google.com/file/d/1bgXSWUoIjE3DQyQz5ZONIuvlbw3oYF8F/preview";
//     window.open(pdfURL, "_self");
//   };

//   useEffect(() => {
//     const iframe = document.querySelector("iframe");

//     iframe.addEventListener("load", () => {
//       setIsLoading(false);
//     });

//     return () => {
//       iframe.removeEventListener("load", () => {
//         setIsLoading(false);
//       });
//     };
//   }, []);

//   return (
//     <div>
//       {isLoading && (
//         <div className="loading">
//           <span>Loading PDF...</span>
//         </div>
//       )}
//       <iframe src="https://drive.google.com/file/d/1bgXSWUoIjE3DQyQz5ZONIuvlbw3oYF8F/preview" />
//     </div>
//   );
// };

// export default AsianAgeDay0;

