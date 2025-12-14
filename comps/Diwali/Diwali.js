import Link from "next/link";
import styles from "./DiwaliPromo.module.css";

export default function DiwaliPromo() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.sparkle}></div>

        <h3 className={styles.title}>
          🪔 ದೀಪಾವಳಿ ವಿಶೇಷ ಉಳಿತಾಯ ನಿಧಿ
        </h3>

        <p className={styles.text}>
          ದೀಪಾವಳಿಗೆ ಹಣ ಸಂಗ್ರಹ, ಪಟಾಕಿ ಖರ್ಚು, ಕುಟುಂಬದ ಉತ್ಸವ ಯೋಜನೆ —
          ಎಲ್ಲವನ್ನೂ ಒಂದೇ ಕಡೆ ಸುಲಭವಾಗಿ ನೋಡಿ.
        </p>

        <Link href="/diwali" passHref legacyBehavior>
            <a className={styles.button}>
                ದೀಪಾವಳಿ ವಿವರಗಳನ್ನು ನೋಡಿ ➜
            </a>
        </Link>

      </div>
    </section>
  );
}
