import React, { useEffect, useState } from "react";
import servicestyles from './Services.module.css';
import brandingwebsite from './branding-website.gif'
import Image from 'next/image';
import SEO from './seo.png';
import PortfolioWebsite from './portfolio-website-service-banglore.png'
import BloggingWebsite from './HurdleFreeBloging.png'
import webstyleserv from '../../comps/Services/Website.module.css'

function Services() {

  const [selectedService, setSelectedService] = useState('branding');
  const [isMobileView, setIsMobileView] = useState(false);

  const handleButtonClick = (service) => {
    setSelectedService(service);
  }

  // Effect to check screen size and update the view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 999); // You can adjust this breakpoint as needed
    };

    // Check screen size on initial load and whenever resized
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return (
        <>
        <section className={servicestyles.services_section}>
        <div>
          <h2 className={servicestyles.service_heading}>Our Services</h2>
          <div className={servicestyles.services}>
            <div className={servicestyles.serviceOne}>
              <div className={servicestyles.service_leftDiv}>
              <Image
                  src={SEO}
                  alt='banglore seo website codeaspitant seo service'
                />
                </div>
              <div className={servicestyles.service_rightDiv }>
                <h3 className={servicestyles.seo}>SEO OPTIMIZATION</h3>
                <ul className={servicestyles.ul}>
                    <li><span className={servicestyles.li_keypoints}><strong>Optimized Content Strategy: </strong></span>Tailored, keyword-rich content for higher search rankings.</li>
                    <li><span className={servicestyles.li_keypoints}><strong>Custom Meta Tags & Descriptions: </strong></span>Improve visibility with compelling meta content.</li>
                    <li><span className={servicestyles.li_keypoints}><strong>Mobile-First Optimization: </strong></span>Enhance user experience and search rankings on mobile devices.</li>
                    <li><span className={servicestyles.li_keypoints}><strong>Speed & Performance Enhancements: </strong></span>Boost load times for better user retention and SEO.</li>
                    <li><span className={servicestyles.li_keypoints}><strong>Local SEO Integration: </strong></span>Increase local search visibility with targeted optimization.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* web styles */}
       <section className={webstyleserv.webdevSection}>
        <div className={webstyleserv.webdevContainer}>
        {!isMobileView ? (
           // Laptop view
           <>
          <div className={webstyleserv.webdevleftDiv}>
            <h2 className={webstyleserv.webdev}>WEBSITE SERVICES</h2>
            <ul className={webstyleserv.webdevButtons}>
  <li>
    <button
      className={`${webstyleserv.webdevButton} ${selectedService === 'portfolio' ? webstyleserv.active : ''}`}
      onClick={() => handleButtonClick('portfolio')}
    >
      Portfolio Website
    </button>
  </li>
  <li>
    <button
      className={`${webstyleserv.webdevButton} ${selectedService === 'branding' ? webstyleserv.active : ''}`}
      onClick={() => handleButtonClick('branding')}
    >
      Branding Website
    </button>
  </li>
  <li>
    <button
      className={`${webstyleserv.webdevButton} ${selectedService === 'blogging' ? webstyleserv.active : ''}`}
      onClick={() => handleButtonClick('blogging')}
    >
      Blogging Website
    </button>
  </li>
</ul>
          </div>
          <div className={webstyleserv.webdevrightDiv}>
            {selectedService === 'portfolio' && (
               <a href="https://syedmujahid.vercel.app/" target="_blank" rel="noopener noreferrer">
              <Image 
                src={PortfolioWebsite}
                alt='Portfolio Website service in banglore'
              /></a>
            )}
            {selectedService === 'branding' && (
              <Image src={brandingwebsite} alt='Branding Website service in banglore' />
              )}
            {selectedService === 'blogging' && (
              <Image
              src={BloggingWebsite}
              alt='Blogging Website service in banglore'
            />
            )}
          </div>
          </>
        ) : (
          // Mobile and tablet view
          <div className={webstyleserv.webdevMobileView}>
            <h2 className={webstyleserv.webdev}>WEBSITE SERVICES</h2>
          <div className={webstyleserv.webdevServiceItem}>
            <Image src={PortfolioWebsite} alt="Portfolio Website service in Bangalore" />
            <p>Portfolio Website</p>
          </div>
          <div className={webstyleserv.webdevServiceItem}>
            <Image src={brandingwebsite} alt="Branding Website service in Bangalore" />
            <p>Branding Website</p>
          </div>
          <div className={webstyleserv.webdevServiceItem}>
            <Image src={BloggingWebsite} alt="Blogging Website service in Bangalore" />
            <p>Blogging Website</p>
          </div>
        </div>
        )}
        </div>
      </section>

        </>
    )
}

export default Services;