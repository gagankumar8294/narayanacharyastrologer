import { useRouter } from "next/router";

import styles from "./DiwaliPromo.module.css";

export default function DiwaliPromo() {

    const router = useRouter();

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
