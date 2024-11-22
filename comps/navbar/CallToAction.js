import React from "react";
import styles from './navbar.module.css';

export default function CallToAction() {
    return (
        <>
            <div className={styles.call_to_action}>
                <div className={styles.cta_dial}>
                    <h3>
                        <a href="tel:+918549803686" className={styles.link}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/9946/9946341.png"
                                alt="Call Icon"
                                className={styles.icon}
                                style={{ width: '24px', height: '24px', marginRight: '8px' }}
                            />
                            Call to Narayanachary: <span>+91 8549803686</span>
                        </a>
                    </h3>
                </div>
                <div className={styles.cta_whatsapp}>
                    <h3>
                        <a
                            href="https://wa.me/918549803686?text=Hello%20Narayanachary,%20I%27m%20here%20to%20enquire%20about%20horoscope%20predictions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/3670/3670051.png"
                                alt="WhatsApp Icon"
                                className={styles.icon}
                                style={{ width: '24px', height: '24px', marginRight: '8px' }}
                            />
                            WhatsApp: Book Appointment
                        </a>
                    </h3>
                </div>
            </div>
        </>
    );
}
