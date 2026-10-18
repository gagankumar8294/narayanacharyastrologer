import Image from 'next/image';
import Link from 'next/link';
import AutoTypingText from '../comps/AutoTypingText';
import DiwaliPromo from '@/comps/Diwali/Diwali';
import RecentProducts from '@/comps/Products/RecentProducts';
import StoreLocation from '@/comps/maps/StoreLocation';
import SEO from '@/comps/SEO/SEO';
import { useTranslation } from '@/hooks/useTranslation';
import c from "../public/homepage/c.png";
import styles from '../styles/Home.module.css';

const textList = [
  'Astrology & Jathaka Prediction',
  'Vaastu Shastra Consultation',
  'Numerology & Name Correction',
  'Kundali Matchmaking & Remedies'
];

const serviceIcons = ['♈', '🏠', '🔢', '💑', '💎', '🕉️'];

export default function Home() {
  const { t } = useTranslation();

  const whatsappAppointmentUrl = "https://wa.me/918549803686?text=" + encodeURIComponent(
    "Hello Brahmashree Narayanachary Vishwakarma Ji,\n\nI need an appointment for Astrology prediction and Vaastu consultation. Please let me know the available dates and timings."
  );

  return (
    <div className={styles.homeContainer}>
      <SEO
        title="Narayanachary - Professional Astrologer & Vaastu Expert in Bangalore"
        description="Consult Brahma Sri Narayanacharya for authentic Vedic astrology, horoscope reading, Vaastu Shastra solutions, and numerology. 8+ years experience in Bangalore."
        keywords="Bangalore astrologer, best astrologer in Bangalore, Vaastu Shastra expert Bangalore, horoscope prediction, Jathaka matching, Kundali milan, numerology, Brahma Sri Narayanacharya"
        canonical="https://www.narayanacharyastrologer.com/"
      />

      {/* ================= HERO SECTION ================= */}
      <section className={styles.heroSection}>
        <div className={styles.heroCosmicStars}></div>
        <div className={styles.heroContentWrapper}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <span>✦</span> {t.hero?.badge || "Vedic Astrology & Vaastu Expert"}
            </div>

            <h1 className={styles.heroMainTitle}>
              {t.hero?.titlePrefix || "Welcome to"}
              <span className={styles.titleHighlight}>
                {t.hero?.titleHighlight || "Achary's Predictions"}
              </span>
            </h1>

            {/* Dynamic Animated Typing Text */}
            <div className={styles.typingWrapper}>
              <span className={styles.typingIndicator}>|</span>
              <AutoTypingText
                textList={textList}
                typingDelay={80}
                erasingDelay={30}
                pauseDelay={1600}
              />
            </div>

            <p className={styles.heroSubtitle}>
              {t.hero?.subtitle ||
                "With over 8 years of experience in astrology, numerology, and Vaastu Shastra, Brahma Sri Narayanacharya offers proven guidance and authentic remedies for a happy, prosperous life."}
            </p>

            <div className={styles.heroCtaRow}>
              <a
                href={whatsappAppointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroPrimaryBtn}
              >
                <span>{t.hero?.bookBtn || "Book Consultation"}</span>
                <span>➔</span>
              </a>

              <Link href="#services" className={styles.heroSecondaryBtn}>
                {t.hero?.exploreBtn || "Explore Services"}
              </Link>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.imageAuraCard}>
              <Image
                src={c}
                alt="Brahma Sri Narayanacharya - Astrologer in Bangalore"
                width={360}
                height={460}
                className={styles.astrologerImg}
                priority
              />
              <div className={styles.floatingExperienceBadge}>
                <span className={styles.badgeStar}>★</span>
                <div>
                  <div className={styles.badgeNum}>8+ Years</div>
                  <div className={styles.badgeTxt}>Vedic Sadhana</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS / TRUST BAR ================= */}
      <section className={styles.statsSection} aria-label="Key Milestones">
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{t.stats?.experience || "8+ Years"}</div>
            <div className={styles.statLabel}>{t.stats?.experienceLabel || "Vedic Experience"}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{t.stats?.clients || "5,000+"}</div>
            <div className={styles.statLabel}>{t.stats?.clientsLabel || "Consultations"}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{t.stats?.languages || "4 Languages"}</div>
            <div className={styles.statLabel}>{t.stats?.languagesLabel || "Multi-Lingual Support"}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{t.stats?.accuracy || "99%"}</div>
            <div className={styles.statLabel}>{t.stats?.accuracyLabel || "Client Satisfaction"}</div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>
            {t.services?.sectionBadge || "Sacred Offerings"}
          </span>
          <h2 className={styles.sectionTitle}>
            {t.services?.title || "Comprehensive Astrology & Remedial Services"}
          </h2>
          <p className={styles.sectionSubtitle}>
            {t.services?.subtitle ||
              "Ancient Vedic wisdom combined with precise planetary calculations to resolve life's deepest challenges."}
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {(t.services?.items || []).map((srv, idx) => (
            <div key={srv.id || idx} className={styles.serviceCard}>
              <div>
                <div className={styles.serviceIconCircle}>
                  {serviceIcons[idx % serviceIcons.length]}
                </div>
                <h3 className={styles.serviceCardTitle}>{srv.title}</h3>
                <p className={styles.serviceCardDesc}>{srv.desc}</p>
              </div>
              <a
                href={whatsappAppointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.serviceActionLink}
              >
                <span>Consult on this Service</span>
                <span>➔</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className={styles.whyUsSection}>
        <div className={styles.sectionHeader} style={{ marginBottom: "40px" }}>
          <span className={styles.sectionBadge} style={{ background: "rgba(212,175,55,0.15)", borderColor: "var(--color-gold)", color: "var(--color-gold-light)" }}>
            {t.whyUs?.badge || "Why Choose Achary"}
          </span>
          <h2 className={styles.sectionTitle} style={{ color: "#ffffff" }}>
            {t.whyUs?.title || "Trusted Spiritual Guidance You Can Rely On"}
          </h2>
        </div>

        <div className={styles.whyUsGrid}>
          {(t.whyUs?.reasons || []).map((reason, idx) => (
            <div key={idx} className={styles.whyCard}>
              <div className={styles.whyIcon}>✦</div>
              <h4 className={styles.whyTitle}>{reason.title}</h4>
              <p className={styles.whyDesc}>{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DIWALI PROMO / SEASONAL ================= */}
      <section>
        <DiwaliPromo />
      </section>

      {/* ================= CLIENT TESTIMONIALS ================= */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>
            {t.testimonials?.badge || "Testimonials"}
          </span>
          <h2 className={styles.sectionTitle}>
            {t.testimonials?.title || "What Seekers Say About Our Guidance"}
          </h2>
        </div>

        <div className={styles.testimonialsGrid}>
          {(t.testimonials?.items || []).map((item, idx) => (
            <div key={idx} className={styles.testiCard}>
              <div className={styles.starsRow}>★★★★★</div>
              <p className={styles.testiQuote}>“{item.quote}”</p>
              <div className={styles.testiAuthorBox}>
                <div className={styles.authorAvatar}>
                  {item.author.charAt(0)}
                </div>
                <div>
                  <div className={styles.authorName}>{item.author}</div>
                  <div className={styles.authorLocation}>{item.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RECENT SACRED PRODUCTS ================= */}
      <section>
        <RecentProducts />
      </section>

      {/* ================= OFFICE LOCATION MAP ================= */}
      <section className={styles.mapWrapper}>
        <h3 className={styles.mapHeading}>Visit Our Spiritual Center in Bangalore</h3>
        <StoreLocation />
      </section>
    </div>
  );
}
