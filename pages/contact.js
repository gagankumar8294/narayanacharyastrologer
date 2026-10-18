import { useState } from "react";
import SEO from "@/comps/SEO/SEO";
import StoreLocation from "@/comps/maps/StoreLocation";
import { useTranslation } from "@/hooks/useTranslation";
import styles from "../styles/Contact.module.css";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Horoscope Reading",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappText = encodeURIComponent(
      `*New Consultation Request*\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\nDetails: ${formData.message}`
    );
    window.open(`https://wa.me/918549803686?text=${whatsappText}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className={styles.contactPage}>
      <SEO
        title="Contact Brahma Sri Narayanacharya - Astrologer in Bangalore"
        description="Book your appointment with Brahma Sri Narayanacharya. Consult for Horoscope reading, Vaastu consultation, and Numerology directly via WhatsApp or phone."
        canonical="https://www.narayanacharyastrologer.com/contact"
      />

      <section className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <span className={styles.badge}>{t.contact?.badge || "Get In Touch"}</span>
          <h1 className={styles.title}>{t.contact?.title || "Book Your Personal Consultation"}</h1>
          <p className={styles.subtitle}>
            {t.contact?.subtitle || "Reach out directly via WhatsApp, Phone call, or visit our Bangalore Kendra."}
          </p>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.contactGrid}>
          {/* Left Column: Direct Info */}
          <div className={styles.infoCol}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📞</div>
              <div>
                <h3 className={styles.infoTitle}>Phone Consultation</h3>
                <p className={styles.infoDesc}>Available for direct calls and tele-consultations.</p>
                <a href="tel:+918549803686" className={styles.contactActionLink}>
                  +91 85498 03686
                </a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>💬</div>
              <div>
                <h3 className={styles.infoTitle}>Instant WhatsApp</h3>
                <p className={styles.infoDesc}>Send your birth details (Date, Time, Place) for quick scheduling.</p>
                <a
                  href="https://wa.me/918549803686?text=Hello%20Achary%20Ji,%20I%20would%20like%20to%20book%20a%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactActionLink}
                >
                  Start WhatsApp Chat ➜
                </a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <div>
                <h3 className={styles.infoTitle}>Kendra Address</h3>
                <p className={styles.infoDesc}>
                  Narayanachary Astrologer, Bangalore, Karnataka, India.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Fast Appointment Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Schedule Consultation</h3>
              <p className={styles.formSubtitle}>Fill this short form to connect directly via WhatsApp.</p>

              {submitted ? (
                <div className={styles.successMessage}>
                  ✓ Thank you! Your request has been initiated on WhatsApp. Achary Ji will reply shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Select Service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={styles.input}
                    >
                      <option value="Horoscope Reading">Jathaka & Horoscope Reading</option>
                      <option value="Vaastu Shastra">Vaastu Shastra Consultation</option>
                      <option value="Numerology">Name & Business Numerology</option>
                      <option value="Kundali Matchmaking">Kundali Matchmaking</option>
                      <option value="Gemstone Advice">Gemstone Recommendation</option>
                      <option value="Dosha Nivarana">Dosha Nivarana & Shanti</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Birth Details / Questions</label>
                    <textarea
                      rows="3"
                      placeholder="Date of Birth, Time, Place of Birth (optional)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={styles.input}
                    ></textarea>
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    Send Request via WhatsApp ➔
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Kendra Map */}
        <div className={styles.mapSection}>
          <h2 className={styles.mapTitle}>Find Our Consultation Kendra</h2>
          <StoreLocation />
        </div>
      </div>
    </div>
  );
}
