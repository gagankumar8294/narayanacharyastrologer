import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "@/hooks/useTranslation";
import styles from "./FloatingWhatsApp.module.css";

export default function FloatingWhatsApp() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const phoneNumber = "918549803686";
  const defaultMessage = encodeURIComponent(
    "Namaste Brahmashree Narayanachary Ji,\n\nI would like to book an Astrology / Vaastu consultation. Please let me know the available timings."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp quick consultation" className={styles.floatWrapper}>
      {isOpen && (
        <div className={styles.chatPopup}>
          <div className={styles.popupHeader}>
            <div className={styles.avatar}>ॐ</div>
            <div>
              <div className={styles.name}>Brahma Sri Narayanacharya</div>
              <div className={styles.status}>● Available for Consultation</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeBtn}
              aria-label="Close WhatsApp chat popup"
            >
              ✕
            </button>
          </div>
          <div className={styles.popupBody}>
            <p className={styles.greeting}>
              {t.nav?.quickConsult || "Namaste! How can Achary Ji guide you today?"}
            </p>
            <span className={styles.timeTag}>Vedic Guidance & Remedies</span>
          </div>
          <div className={styles.popupFooter}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.startChatBtn}
            >
              <span>Continue to WhatsApp</span>
              <span>➔</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.floatBtn}
        aria-label="Open WhatsApp consultation"
        title="Consult Achary Ji on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.svgIcon}
        >
          <path d="M16.003 3C9.384 3 4 8.19 4 14.48c0 2.44.78 4.73 2.14 6.62L4 28l7.21-2.13c1.95 1.05 4.19 1.66 6.79 1.66 6.619 0 12.002-5.191 12.002-11.479S22.622 3 16.003 3zM15.99 23c-1.96 0-3.8-.49-5.44-1.39l-.39-.21-4.4 1.32 1.18-4.16-.25-.38C5.18 16.86 4.63 15.72 4.63 14.49 4.63 9.9 9.04 6 14.63 6c5.59 0 10.002 3.899 10.002 8.481 0 4.59-4.412 8.519-10.002 8.519zm5.79-5.21c-.79-.39-1.79-.99-2.07-1.1-.26-.13-.47-.2-.67.2-.2.39-.77 1.1-.95 1.33-.17.23-.34.26-.63.13-.29-.13-1.22-.44-2.32-1.41-.85-.74-1.42-1.65-1.59-1.93-.17-.29-.02-.44.13-.57.13-.13.29-.34.44-.51.15-.17.2-.29.31-.49.1-.2.05-.37-.02-.51-.07-.13-.67-1.63-.91-2.26-.23-.57-.46-.49-.67-.49h-.55c-.19 0-.5.07-.76.37-.26.3-1 1-1 2.44 0 1.44 1.03 2.84 1.17 3.04.14.2 2.03 3.1 5.01 4.35.7.3 1.24.48 1.66.61.7.23 1.34.2 1.85.12.56-.08 1.75-.71 2-1.4.24-.69.24-1.29.17-1.4-.08-.11-.28-.2-.58-.34z" />
        </svg>
        <span className={styles.btnLabel}>Consultation</span>
        <span className={styles.pulseRing}></span>
      </button>
    </aside>
  );
}
