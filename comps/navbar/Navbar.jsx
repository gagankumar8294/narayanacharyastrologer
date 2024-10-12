import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from "./navbar.module.css";

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <nav className="nav_bar">
        <div className="nav_container">
              <Link href="/" className='logo_border'>
                <Image className='logo' src="/black_logo.png" alt="codeaspirant-logo" width={80} height={80}/>
              </Link>
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