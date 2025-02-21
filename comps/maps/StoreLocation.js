import styles from "./maps.module.css";

const StoreLocation = () => {
    return (
        <>
        <h3 className={styles.visit_heading}>Visit our Office</h3>
            <iframe
            className={styles.iframe_div}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d187.07451947499195!2d78.07728!3d13.507891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb21b005e275fc1%3A0xf86a76edfb7fe78e!2sNarayanaChary%20Astrologer!5e3!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </>
      
    );
  };
  
  export default StoreLocation;
  