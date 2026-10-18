import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import styles from "./footer.module.css";

const Footer = () => {
  const { t } = useTranslation();

  const servicesList = [
    { name: "Jathaka & Horoscope", href: "/#services" },
    { name: "Vaastu Shastra", href: "/#services" },
    { name: "Numerology & Name Correction", href: "/#services" },
    { name: "Kundali Matchmaking", href: "/#services" },
    { name: "Gemstone Guidance", href: "/#services" },
    { name: "Dosha Nivarana", href: "/#services" },
  ];

  const quickLinks = [
    { name: t.nav?.home || "Home", href: "/" },
    { name: t.nav?.about || "About Achary", href: "/about" },
    { name: t.nav?.services || "Services", href: "/#services" },
    { name: t.nav?.blog || "Blog & Articles", href: "/blog" },
    { name: t.nav?.contact || "Contact", href: "/contact" },
  ];

  const whatsappAppointmentUrl = "https://wa.me/918549803686?text=" + encodeURIComponent(
    "Hello Brahmashree Narayanachary Ji, I would like to consult with you."
  );

  return (
    <footer className={styles.footerRoot}>
      {/* Decorative Golden Astro Border */}
      <div className={styles.goldAuraBar}></div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Brand & Bio */}
          <div className={styles.brandCol}>
            <div className={styles.logoRow}>
              <div className={styles.omBadge}>ॐ</div>
              <div>
                <h3 className={styles.brandTitle}>NARAYANACHARY</h3>
                <p className={styles.brandSubtitle}>VEDIC ASTROLOGER & VAASTU VIDWAN</p>
              </div>
            </div>
            <p className={styles.aboutDesc}>
              {t.footer?.aboutText ||
                "Brahma Sri Narayanacharya offers authoritative Vedic astrology, Vaastu Shastra, horoscope matching, and numerology consultations to guide you towards peace and prosperity."}
            </p>
            <div className={styles.trustBadges}>
              <span className={styles.badgeItem}>✦ 8+ Years Vedic Sadhana</span>
              <span className={styles.badgeItem}>✦ Authentic Vishwakarma Lineage</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colHeading}>{t.footer?.quickLinks || "Quick Links"}</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.name} className={styles.listItem}>
                  <Link href={link.href} className={styles.footerLink}>
                    <span className={styles.arrowIcon}>›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className={styles.servicesCol}>
            <h4 className={styles.colHeading}>{t.footer?.servicesTitle || "Key Services"}</h4>
            <ul className={styles.linkList}>
              {servicesList.map((srv) => (
                <li key={srv.name} className={styles.listItem}>
                  <Link href={srv.href} className={styles.footerLink}>
                    <span className={styles.arrowIcon}>›</span> {srv.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Appointments */}
          <div className={styles.contactCol}>
            <h4 className={styles.colHeading}>{t.footer?.reachUs || "Contact & Center"}</h4>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <div>
                  <strong className={styles.contactLabel}>Location:</strong>
                  <p className={styles.contactText}>Bangalore, Karnataka, India</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <strong className={styles.contactLabel}>Direct Consultation:</strong>
                  <p>
                    <a href="tel:+918549803686" className={styles.phoneLink}>
                      +91 85498 03686
                    </a>
                  </p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>💬</span>
                <div>
                  <strong className={styles.contactLabel}>WhatsApp Support:</strong>
                  <p>
                    <a
                      href={whatsappAppointmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappActionLink}
                    >
                      Instant WhatsApp Chat ➜
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Disclaimer */}
        <div className={styles.bottomBar}>
          <div className={styles.copyrightText}>
            © {new Date().getFullYear()} Brahma Sri Narayanachary Astrologer. {t.footer?.rights || "All rights reserved."}
          </div>
          <div className={styles.spiritualNotice}>
            <span>Shree Gurubhyo Namaha</span> ✦ <span>Lokah Samastah Sukhino Bhavantu</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;