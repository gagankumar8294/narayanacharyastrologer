// Spinner.js
import styles from './Spinner.module.css'; // Assuming styles are in Spinner.module.css

const Spinner = () => {
    return (
        <div className={styles.spinner_container}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default Spinner;
