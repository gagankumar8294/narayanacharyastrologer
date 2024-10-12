import React, { useEffect, useState } from "react";
import help from './help.module.css'
import weHelp from './weHelp.webp'
import Image from "next/image";

function Help() {

  const [isMobileView , setIsMobileView] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 999);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return (    
        <section className={help.helpSection}>
            <div className={help.services}>
            <div className={help.serviceOne}>
              {!isMobileView ? (
                null
              ) : <h3 className={help.seo_mobile}>WHO WE HELP</h3>}
              <div className={help.service_leftDiv}>
              <Image
              className={help.leftDiv_img}
                  src={weHelp}
                  alt='banglore seo website codeaspitant seo service'
                />
                </div>
              <div className={help.service_rightDiv }>
                <h3 className={help.seo}>WHO WE HELP</h3>
                <div className={help.ulDiv}>
                    <div className={help.leftul}>
                        <ul className={help.ul}>
                            <div className={help.li_icondiv}>
                                <div className={help.icon_color}>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className={help.icon}
                                    style={{ width: '30px', height: '30px', marginRight: '8px' }} // Adjust size and spacing as needed
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                    </svg>
                                </div>
                                <div>
                                    <li className={help.li_key}>Freelancers, Small Businesses, Agencies:</li>
                                </div>
                            </div>
                            <div className={help.li_icondiv}>
                              <div className={help.icon_color}>
                                <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                      className={help.icon}
                                      style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and spacing as needed
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                </svg>
                              </div>
                              <div>
                                  <li className={help.li_key}>Coaches, Therapists, Fitness Trainers:</li>
                              </div>
                            </div>
                            <div className={help.li_icondiv}>
                                <div className={help.icon_color}>
                                  <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className={help.icon}
                                        style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and spacing as needed
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M5 13l4 4L19 7"
                                        />
                                  </svg>
                                </div>
                                <div>
                                  <li className={help.li_key}>Doctors, Hospitals, Wellness Centers:</li>
                                </div>
                            </div>
                            <div className={help.li_icondiv}>
                              <div className={help.icon_color}>
                                <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                      className={help.icon}
                                      style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and spacing as needed
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                              </div>
                              <div>
                                <li className={help.li_key}>Accountants, Bookkeepers, Lawyers:</li>
                              </div>
                            </div>
                            <div className={help.li_icondiv}>
                              <div className={help.icon_color}>
                                <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                      className={help.icon}
                                      style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and spacing as needed
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                              </div>
                              <div>
                                <li className={help.li_key}>Churches, Nonprofits, Foundations:</li>
                              </div>
                            </div>
                            <div className={help.li_icondiv}>
                              <div className={help.icon_color}>
                                <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                      className={help.icon}
                                      style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and spacing as needed
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                              </div>
                              <div>
                                <li className={help.li_key}>Governmental Institutions, Politicians:</li>
                              </div>
                            </div>
                            <div className={help.li_icondiv}>
                              <div className={help.icon_color}>
                                <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                      className={help.icon}
                                      style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and spacing as needed
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                              </div>
                              <div>
                                <li className={help.li_key}>Authors, Bloggers, Podcasters:</li>
                              </div>
                            </div>
                        </ul>
                    </div>
                    <div className={help.rightul}>
                        <ul className={help.ul}>
                          <div className={help.li_icondiv}>
                            <div className={help.icon_color}>
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className={help.icon}
                                    style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and spacing as needed
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                            </div>
                            <div>
                              <li className={help.li_key}>Social Media Managers, Marketing Specialists:</li>
                            </div>
                          </div>
                            <div className={help.li_icondiv}>
                              <div className={help.icon_color}>
                                <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                      className={help.icon}
                                      style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and spacing as needed
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                              </div>
                              <div>
                                <li className={help.li_key}>Schools, Universities, Research Centers:</li>
                              </div>
                            </div>
                            <div className={help.li_icondiv}>
                              <div className={help.icon_color}>
                                <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                      className={help.icon}
                                      style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and spacing as needed
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                              </div>
                              <div>
                                <li className={help.li_key}>Hotels, Restaurants, Wellness Resorts:</li>
                              </div>
                            </div>
                            <div className={help.li_icondiv}>
                              <div className={help.icon_color}>
                                <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                      className={help.icon}
                                      style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and spacing as needed
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                              </div>
                              <div>
                                <li className={help.li_key}>Artists, Graphic Designers, Photographers:</li>
                              </div>
                            </div>     
                            <div className={help.li_icondiv}>
                              <div className={help.icon_color}>
                                <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                      className={help.icon}
                                      style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and spacing as needed
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                              </div>
                              <div>
                                <li className={help.li_key}>Realtors, Construction Firms, Architects:</li>
                              </div>
                            </div>
                            <div className={help.li_icondiv}>
                              <div className={help.icon_color}>
                                <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={2}
                                      stroke="currentColor"
                                      className={help.icon}
                                      style={{ width: '20px', height: '20px', marginRight: '8px' }} // Adjust size and spacing as needed
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                              </div>
                              <div>
                                <li className={help.li_key}>Event Planners, Travel Agents, Car Rentals:</li>
                              </div>
                            </div>
                            <div className={help.li_icondiv}>
                              <div>
                                <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className={help.love}
                                      style={{ width: '20px', height: '20px', marginRight: '8px', color: 'red' }} // Adjust size, spacing, and color as needed
                                    >
                                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C15.46 5.99 16.96 5 18.5 5 20.58 5 22 6.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                              </div>
                              <div>
                                <span className={help.li_keypoints}>
                                  <li><strong>Whatever your passion is...</strong></li>
                                </span>
                              </div>
                            </div>
                        </ul>
                    </div>
                </div>
              </div>
              </div>
            </div>
        </section>
    )
}

export default Help;