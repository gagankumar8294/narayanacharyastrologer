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
                <span className={styles.contactIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <div>
                  <strong className={styles.contactLabel}>Location:</strong>
                  <p className={styles.contactText}>Near Chelur Road, Chintamani, Karnataka, India</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
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
                <span className={styles.contactIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </span>
                <div>
                  <strong className={styles.contactLabel}>WhatsApp Support:</strong>
                  <p>
                    <a
                      href={whatsappAppointmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappActionLink}
                    >
                      Instant WhatsApp Chat ➔
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