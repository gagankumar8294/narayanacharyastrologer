import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from '@/hooks/useTranslation';
import { DiyaIcon, SparkleIcon } from '@/comps/Common/Icons';
import styles from "./navbar.module.css";

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, changeLanguage } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [router.asPath]);

  const languageIcons = {
    kannada: '/icons/kannada-ka.svg',
    telugu: '/icons/telugu-t.svg',
    hindi: '/icons/hindi-hi.svg',
    english: '/icons/english-e.svg'
  };

  const languageLabels = {
    kannada: 'ಕನ್ನಡ',
    telugu: 'తెలుగు',
    hindi: 'हिन्दी',
    english: 'English'
  };

  const handleLanguageSelect = (langKey) => {
    changeLanguage(langKey);
    setIsDropdownOpen(false);
  };

  const isBlogRoute = router.pathname.startsWith('/blog');

  const navLinks = [
    { label: t.nav?.home || 'Home', href: '/' },
    { label: t.nav?.about || 'About', href: '/about' },
    { label: t.nav?.services || 'Services', href: '/#services' },
    { label: t.nav?.blog || 'Blog & Articles', href: '/blog', isBlog: true },
    { label: t.nav?.contact || 'Contact', href: '/contact' },
  ];

  const whatsappAppointmentUrl = "https://wa.me/918549803686?text=" + encodeURIComponent(
    "Hello Brahmashree Narayanachary Vishwakarma Ji, I would like to book an appointment for an Astrology / Vaastu consultation."
  );

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* Brand Logo - Clean Typography */}
        <Link href="/" className={styles.brandLink}>
          <div className={styles.brandText}>
            <span className={styles.brandName}>NARAYANACHARY</span>
            <span className={styles.brandTagline}>VEDIC ASTROLOGER & VAASTU</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navMenuList}>
            {navLinks.map((item) => {
              const isItemActive = item.isBlog ? isBlogRoute : router.pathname === item.href;
              return (
                <li key={item.href} className={styles.navItem}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${isItemActive ? styles.activeNavLink : ''} ${item.isBlog ? styles.blogNavLink : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions: Language Switcher & WhatsApp CTA */}
        <div className={styles.navActions}>
          {/* Language Selector Dropdown */}
          <div className={styles.languageWrapper}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={styles.languageSelectorBtn}
              aria-label="Change Language"
              aria-expanded={isDropdownOpen}
            >
              <img
                src={languageIcons[language] || languageIcons.kannada}
                alt="Selected Language"
                className={styles.langIcon}
              />
              <span className={styles.langName}>{languageLabels[language] || 'ಕನ್ನಡ'}</span>
              <span className={styles.dropdownArrow}>▾</span>
            </button>

            {isDropdownOpen && (
              <div className={styles.languageDropdownMenu}>
                {Object.keys(languageLabels).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleLanguageSelect(key)}
                    className={`${styles.dropdownOption} ${language === key ? styles.dropdownOptionActive : ''}`}
                  >
                    <img src={languageIcons[key]} alt={languageLabels[key]} className={styles.langOptionIcon} />
                    <span>{languageLabels[key]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Book Consultation Header CTA */}
          <a
            href={whatsappAppointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.consultationBtn}
          >
            <SparkleIcon size={12} color="var(--color-gold-light)" />
            <span>{t.nav?.bookAppointment || 'Book Consultation'}</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            className={styles.mobileHamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileDrawer}>
            <ul className={styles.mobileMenuList}>
              {navLinks.map((item) => {
                const isItemActive = item.isBlog ? isBlogRoute : router.pathname === item.href;
                return (
                  <li key={item.href} className={styles.mobileNavItem}>
                    <Link
                      href={item.href}
                      className={`${styles.mobileNavLink} ${isItemActive ? styles.mobileActiveNavLink : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.isBlog && <DiyaIcon size={16} color="var(--color-primary)" style={{ marginRight: '8px' }} />}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className={styles.mobileActionBox}>
              <a
                href={whatsappAppointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileCtaBtn}
              >
                {t.nav?.bookAppointment || 'Book Consultation'} (WhatsApp)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBar;