import { useRouter } from "next/router";

import styles from "./DiwaliPromo.module.css";

export default function DiwaliPromo() {

    const router = useRouter();

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.sparkle}></div>

        <h3 className={styles.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffb347" stroke="#ffffff" strokeWidth="1.5">
            <path d="M12 2c1.5 3 4 5 4 8a4 4 0 0 1-8 0c0-3 2.5-5 4-8z"></path>
            <path d="M4 14c0 4 3.5 7 8 7s8-3 8-7H4z"></path>
          </svg>
          ದೀಪಾವಳಿ ವಿಶೇಷ ಉಳಿತಾಯ ನಿಧಿ
        </h3>

        <p className={styles.text}>
          ದೀಪಾವಳಿಗೆ ಹಣ ಸಂಗ್ರಹ, ಪಟಾಕಿ ಖರ್ಚು, ಕುಟುಂಬದ ಉತ್ಸವ ಯೋಜನೆ —
          ಎಲ್ಲವನ್ನೂ ಒಂದೇ ಕಡೆ ಸುಲಭವಾಗಿ ನೋಡಿ.
        </p>

        <button
            className={styles.button}
            onClick={() => router.push("/diwali")}
            >
            ದೀಪಾವಳಿ ವಿವರಗಳನ್ನು ನೋಡಿ ➜
        </button>

      </div>
    </section>
  );
}
