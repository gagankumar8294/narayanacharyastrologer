import styles from "./maps.module.css";

const StoreLocation = () => {
    return (
        <div className={styles.mapContainer}>
            <iframe
                className={styles.iframe_div}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d187.07451947499195!2d78.07728!3d13.507891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb21b005e275fc1%3A0xf86a76edfb7fe78e!2sNarayanaChary%20Astrologer!5e3!3m2!1sen!2sin!4v1700000000000"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Narayanachary Astrologer Location in Bangalore"
            ></iframe>
        </div>
    );
};
  
  export default StoreLocation;
  