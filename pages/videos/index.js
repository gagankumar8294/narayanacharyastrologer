import { useState } from "react";
import SEO from "@/comps/SEO/SEO";
import { useTranslation } from "@/hooks/useTranslation";
import styles from "../../styles/Video.module.css";

const ASTRO_VIDEOS = [
  {
    id: "1",
    title: "Vedic Astrology Basics & Significance of Jathaka",
    category: "Astrology",
    embedId: "xA-jy5B9_K0", // Placeholder or YouTube video
    duration: "12 mins",
    desc: "Understanding the influence of the nine planets (Navagrahas) and their impact on destiny."
  },
  {
    id: "2",
    title: "Vaastu Shastra for Home Peace and Prosperity",
    category: "Vaastu",
    embedId: "4uiyGqTgAV4",
    duration: "15 mins",
    desc: "Simple directional changes to invite positive cosmic energy and remove negative vibrations."
  },
  {
    id: "3",
    title: "Numerology & Lucky Numbers for Daily Life",
    category: "Numerology",
    embedId: "uwFjG_i6hJw",
    duration: "10 mins",
    desc: "How sound frequencies and name numbers attract effortless abundance and career growth."
  },
  {
    id: "4",
    title: "Kundali Milan & Matching for Happy Marriage",
    category: "Matchmaking",
    embedId: "wGP6_hk0BC0",
    duration: "14 mins",
    desc: "The true spiritual purpose of 36-Guna matching and how to resolve Manglik dosha."
  }
];

export default function Videos() {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState(ASTRO_VIDEOS[0]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Astrology", "Vaastu", "Numerology", "Matchmaking"];

  const filteredVideos = selectedCategory === "All"
    ? ASTRO_VIDEOS
    : ASTRO_VIDEOS.filter((v) => v.category === selectedCategory);

  return (
    <div className={styles.videoPage}>
      <SEO
        title="Spiritual & Astrology Videos - Brahma Sri Narayanacharya"
        description="Watch Vedic astrology explanations, Vaastu guidance, and numerology tips by Brahma Sri Narayanacharya."
        canonical="https://www.narayanacharyastrologer.com/videos"
      />

      <section className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <span className={styles.badge}>Vedic Discourses & Tips</span>
          <h1 className={styles.title}>Spiritual & Astrology Video Hub</h1>
          <p className={styles.subtitle}>
            Watch insightful explanations on planetary transits, Vaastu corrections, and life guidance by Achary Ji.
          </p>
        </div>
      </section>

      <div className={styles.container}>
        {/* Featured Video Player */}
        <div className={styles.playerWrapper}>
          <div className={styles.embedBox}>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.embedId}`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            ></iframe>
          </div>
          <div className={styles.playerMeta}>
            <span className={styles.categoryBadge}>{activeVideo.category}</span>
            <h2 className={styles.videoTitle}>{activeVideo.title}</h2>
            <p className={styles.videoDesc}>{activeVideo.desc}</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`${styles.filterBtn} ${selectedCategory === cat ? styles.filterBtnActive : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className={styles.videoGrid}>
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className={`${styles.videoCard} ${activeVideo.id === video.id ? styles.activeCard : ""}`}
            >
              <div className={styles.thumbnailBox}>
                <span className={styles.playIcon}>▶</span>
                <span className={styles.durationBadge}>{video.duration}</span>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardCategory}>{video.category}</span>
                <h4 className={styles.cardTitle}>{video.title}</h4>
                <p className={styles.cardDesc}>{video.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}