import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';
import styles from "./navbar.module.css";

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const { changeLanguage } = useContext(LanguageContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('kannada'); // Default to Kannada
  
  // Language icons (replace with actual SVG icons if needed)
  const languageIcons = {
    kannada: '/icons/kannada-ka.svg',  // KA SVG icon
    telugu: '/icons/telugu-t.svg',     // T SVG icon
    english: '/icons/english-e.svg'    // E SVG icon
  };

  const languageNames = {
    kannada: 'ಕನ್ನಡ',   // Kannada text
    telugu: 'తెలుగు',    // Telugu text
    english: 'English'   // English text
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    changeLanguage(language); // Update the language in context
    setIsDropdownOpen(false); // Close the dropdown after selection
  };
  
  return (
    <div>
      <nav className="nav_bar">
        <div className="nav_container">
        <div className={styles.call_to_action}>
  <h3>
    <a href="tel:+91854980686" className={styles.link}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={styles.icon}
        style={{ width: '24px', height: '24px', marginRight: '8px' }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75v10.5c0 1.242 1.008 2.25 2.25 2.25h15c1.242 0 2.25-1.008 2.25-2.25V6.75c0-1.242-1.008-2.25-2.25-2.25h-15c-1.242 0-2.25 1.008-2.25 2.25zM7.5 6.75v10.5M12 6.75v10.5M16.5 6.75v10.5"
        />
      </svg>
      Call to Narayanachary: <span>+91 854980686</span>
    </a>
  </h3>
  <h3>
    <a
      href="https://wa.me/918549803686?text=Hello%20Narayanachary,%20I%27m%20here%20to%20enquire%20about%20horoscope%20predictions"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={styles.icon}
        style={{ width: '24px', height: '24px', marginRight: '8px' }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 9.75h-4.5M9.75 17.25h-.009m-.491-7.5a1.5 1.5 0 101.5-1.5v-.75h.75v.75a1.5 1.5 0 101.5 1.5v.75h-.75v-.75h-.75v.75a1.5 1.5 0 101.5 1.5v.75h-.75v-.75a1.5 1.5 0 10-1.5-1.5v-.75h-.75v.75z"
        />
      </svg>
      WhatsApp: Book Appointment
    </a>
  </h3>
</div>
  
                <div className={styles.logo_language_switcher}>
                  <Link href="/" className='logo_border'>
                    <div className='logo_cover'>
                      <h1 className={styles.na}>NARAYANACHARY</h1>
                      <h1 className={styles.nb}>ASTROLOGER</h1>
                    </div>
                  </Link>
                  {/* Language Switcher */}
                  <div className={styles.language_switcher}>
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={styles.language_button}>
                    <img src={languageIcons[selectedLanguage]} alt="Language Icon" className={styles.language_icon} />
                    <span className={styles.language_name}>{languageNames[selectedLanguage]}</span>
                </button>

                {isDropdownOpen && (
                  <div className={styles.language_dropdown}>
                    <button onClick={() => handleLanguageChange('kannada')} className={styles.language_option}>
                      <img src={languageIcons.kannada} alt="Kannada" className={styles.language_icon} />
                      <span className={styles.language_name}>{languageNames.kannada}</span>
                    </button>
                    <button onClick={() => handleLanguageChange('telugu')} className={styles.language_option}>
                      <img src={languageIcons.telugu} alt="Telugu" className={styles.language_icon} />
                      <span className={styles.language_name}>{languageNames.telugu}</span>
                    </button>
                    <button onClick={() => handleLanguageChange('english')} className={styles.language_option}>
                      <img src={languageIcons.english} alt="English" className={styles.language_icon} />
                      <span className={styles.language_name}>{languageNames.english}</span>
                    </button>
                  </div>
                    )}
                  </div>
                </div>
              
              
              

              <div className="hidden-md">
                <button className="hamburger_button" onClick={() => setNavbar(!navbar)}>
                  {navbar ? (
                    <Image src="/close.svg" width={40} height={40} alt="logo" />
                  ) : (
                    <Image src="/hamburger-menu.svg" width={45} height={45} alt="logo"
                      className="hamburgerunder768" />
                  )}
                </button>
              </div>

            <div className={`nav_links_block ${ 
              navbar ? 'navlinks_activeless768' : 'nav_notactive_less_768'
              }`}>
              <ul className="full_height nav_height ">{/** navbar full-height<768 & nav_height >768 */}
                <li className={styles.hover_buttons}>
                  <Link href="/" onClick={() => setNavbar(!navbar)}>
                    Home
                  </Link>
                </li>
                <li className={styles.hover_buttons}>
                  <Link href="/blog" onClick={() => setNavbar(!navbar)}>
                    Blog
                  </Link>
                </li>
                <li className={styles.hover_buttons}>
                  <Link href="/videos" onClick={() => setNavbar(!navbar)}>
                    Videos
                  </Link>
                </li>
                <li className={styles.hover_buttons}>
                  <Link href="/gagankumar" onClick={() => setNavbar(!navbar)}>
                    About
                  </Link>
                </li>
              </ul>
            </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;