import Image from "next/image";
import Link from "next/link";
import SEO from "@/comps/SEO/SEO";
import { useTranslation } from "@/hooks/useTranslation";
import c from "../public/homepage/c.png";
import styles from "../styles/About.module.css";

export default function About() {
  const { t } = useTranslation();

  const whatsappAppointmentUrl = "https://wa.me/918549803686?text=" + encodeURIComponent(
    "Hello Brahmashree Narayanachary Ji, I visited your About page and would like to schedule a personal consultation."
  );

  return (
    <div className={styles.aboutPage}>
      <SEO
        title="About Brahma Sri Narayanacharya - Astrologer & Vaastu Expert"
        description="Learn about Brahma Sri Narayanacharya's 8+ years of dedicated Vedic astrology practice, Vishwakarma lineage, and ethical approach to cosmic predictions in Bangalore."
        canonical="https://www.narayanacharyastrologer.com/about"
      />

      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroCosmicStars}></div>
        <div className={styles.bannerContent}>
          <div className={styles.photoWrapper}>
            <Image
              src={c}
              alt="Brahma Sri Narayanacharya - Vedic Astrologer"
              width={360}
              height={460}
              className={styles.astrologerPhoto}
              priority
            />
          </div>

          <div>
            <span className={styles.bannerBadge}>Vedic Astrologer Profile</span>
            <h1 className={styles.bannerTitle}>
              {t.about?.title || "Brahma Sri Narayanacharya"}
            </h1>
            <p className={styles.bannerRole}>
              {t.about?.role || "Master Astrologer, Vaastu Vidwan & Numerologist"}
            </p>

            <p className={styles.bannerBio}>
              {t.about?.bio1 ||
                "With over 8 years of intensive astrological practice and deep ancestral roots in Vishwakarma Vedic lineage, Brahma Sri Narayanacharya has touched thousands of lives across Karnataka, Andhra Pradesh, Telangana, and globally."}
            </p>

            <p className={styles.bannerBio}>
              {t.about?.bio2 ||
                "His approach harmonizes timeless Vedic Jyotish principles, Prashna Shastra, Vaastu Vijnana, and ancient sound vibration numerology to deliver actionable, life-transforming solutions without superstitious fear."}
            </p>

            <div className={styles.bannerActions}>
              <a
                href={whatsappAppointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryCta}
              >
                <span>Book Personal Consultation</span>
                <span>➔</span>
              </a>
              <Link href="/#services" className={styles.primaryCta} style={{ background: "rgba(255,255,255,0.12)", boxShadow: "none" }}>
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <div className={styles.container}>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6801" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <h3 className={styles.valueTitle}>Vedic Precision</h3>
            <p className={styles.valueDesc}>
              Calculations based on classical texts including Brihat Parashara Hora Shastra, Jaimini Sutras, and Muhurtha Chintamani.
            </p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6801" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3 className={styles.valueTitle}>Compassionate Guidance</h3>
            <p className={styles.valueDesc}>
              No fear-mongering or exorbitant rituals. Simple, accessible remedies that bring genuine peace of mind.
            </p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6801" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className={styles.valueTitle}>Strict Confidentiality</h3>
            <p className={styles.valueDesc}>
              Every birth chart, family circumstance, and consultation is kept completely confidential with absolute respect.
            </p>
          </div>
        </div>

        {/* Vishwakarma Lineage */}
        <div className={styles.lineageBox}>
          <h2 className={styles.lineageTitle}>Sacred Vishwakarma Heritage</h2>
          <p className={styles.lineageText}>
            Hailing from the sacred Vishwakarma artisan-scholar tradition, Brahma Sri Narayanacharya brings inherited intuitive clarity to structural Vaastu, directional geometry, and planetary energy balance. His consultations help individuals align their inner energy (Horoscope) with their outer dwelling (Vaastu).
          </p>
        </div>
      </div>
    </div>
  );
}