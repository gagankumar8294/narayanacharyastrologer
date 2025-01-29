import Head from 'next/head'
import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';
import styles from '../styles/Home.module.css'
import Link from "next/link"
import AutoTypingText from '../comps/AutoTypingText';
import Image from 'next/image';
import c from ".././public/homepage/c.png";

// import SplashScreen from '@/comps/SplashScreen';
// import { useState, useEffect } from 'react';

const textList = ['Astrology, Vaastu shastra','Numerology','Horoscope Prediction',]

export default function Home() {

  const { language } = useContext(LanguageContext);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Set a timer to hide splash screen after 5 seconds
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 5000); // 5 seconds

  //   // Cleanup the timer
  //   return () => clearTimeout(timer);
  // }, []);

  // Define the content for each language
  const content = {
    kannada: {
      welcome: "Achary's Predictions",
      description: "ಎಂಟು ವರ್ಷಗಳ ಜ್ಯೋತಿಷ್ಯ ವಾಸ್ತು ಸಂಖ್ಯಾಶಾಸ್ತ್ರದ ಅನುಭವದೊಂದಿಗೆ...",
      services: "ನಾವು ಜ್ಯೋತಿಷ್ಯ ಮತ್ತು ವಾಸ್ತು ಪರಿಹಾರ ಸೇವೆಗಳನ್ನು ನೀಡಲು ಸಿದ್ಧವಾಗಿದ್ದೇವೆ",
      intro: "ಎಂಟು ವರ್ಷಗಳ ಜ್ಯೋತಿಷ್ಯ ವಾಸ್ತು ಸಂಖ್ಯಾಶಾಸ್ತ್ರದ ಅನುಭವದೊಂದಿಗೆ ಬ್ರಹ್ಮ ಶ್ರೀ ನಾರಾಯಣಚಾರ್ಯ ಆದ ನಾನು ಸುಖ ಜೀವನ ನಡೆಸಲು ಒಳ್ಳೆಯ ಮಾರ್ಗದರ್ಶನ ಸಲಹೆ ಸೂಚನೆಗಳನ್ನು ನೀಡಲಾಗುವುದು"
    },
    telugu: {
      welcome: "Achary's Predictions",
      description: "ఆరు సంవత్సరాల జ్యోతిష్య మరియు వాస్తు పరిష్కారాలలో...",
      services: "మేము జ్యోతిష్య మరియు వాస్తు పరిష్కార సేవలను అందించడానికి సిద్ధంగా ఉన్నాము",
      intro: "ఎనిమిది సంవత్సరాల జ్యోతిష్య వాస్తు సంఖ్యాశాస్త్రం అనుభవంతో బ్రహ్మ శ్రీ నారాయణాచారి అను నేను సుఖ జీవనం కోసం మంచి మార్గదర్శక సలహాలు అందిస్తాను"
    },
    english: {
      welcome: "Achary's Predictions",
      description: "With over eight years of experience in astrology, Vaastu...",
      services: "We are ready to provide astrology and Vaastu remedy services",
      intro: "With over eight years of experience in astrology, numerology, and Vaastu Shastra, I, Brahma Sri Narayanacharya, offer guidance and advice for living a happy life."
    }
  };

  return (
    <>
      <Head>
        <title>Narayanachary - Professional Astrologer in Bangalore | Astrology & Vaastu Shastra</title>
        <meta name='keywords' content='Bangalore astrologer, professional astrologer, best astrology services, Vaastu Shastra expert, horoscope reading, astrology consultation, spiritual guidance, astrology solutions' />
        <meta name='description' content='Narayanachary, a professional astrologer in Bangalore, offers expert astrology consultations, horoscope readings, and Vaastu Shastra solutions.' />
      </Head>
      {/* {loading ? (
        <SplashScreen />
      ) : ( */}
      {/* <div className={styles.container}>
      <div className={styles.leftDiv}>
        <h2>{content[language].welcome}</h2>
        <p>{content[language].description}</p>
        <h4>{content[language].services}</h4>
      </div>
    </div> */}
      <div style={{paddingTop:"150px"}} className={styles.container}>
      <div className={styles.leftDiv}>
          {/* Dynamically display welcome message based on selected language */}
          <h4 className={styles.dynamic_text}>Welcome to<span className={styles.main_title}> Achary's Predictions</span></h4>
          <h2 className={styles.welcome_textis}>{content[language].welcome}</h2>
          {/* AutoTyping text */}
          <p className={styles.dynamic_text2}>
            <span className={styles.text_bar_pulse} style={{ color: "#f2f2f2", fontWeight: "bold" }}>|</span>
            <AutoTypingText textList={textList} typingDelay={100} erasingDelay={30} pauseDelay={1500} />
          </p>
          {/* Display content based on selected language */}
          <div className={styles.intro_para}>
            <p>{content[language].intro}</p>
            <h4 className={styles.services}>
              {content[language].services}
            </h4>
          </div>
          <div className={styles.main_link}>
            <Link className={styles.button_1} href="/blog">Explore Blog</Link>
            <Link 
              className={styles.button_2} 
              href="https://wa.me/918549803686?text=Hello,%20**Brahmashree%20Narayanachary%20Vishwakarma**%0A%0AI%20need%20an%20appointment%20for%20Astrology%20prediction,%0A%0Aplease%20give%20us%20an%20Appointment%20Date"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.whatsapp_svg}
                style={{ width: "32px", height: "32px", color: "#25D366" }}
              >
                <path d="M16.003 3C9.384 3 4 8.19 4 14.48c0 2.44.78 4.73 2.14 6.62L4 28l7.21-2.13c1.95 1.05 4.19 1.66 6.79 1.66 6.619 0 12.002-5.191 12.002-11.479S22.622 3 16.003 3zM15.99 23c-1.96 0-3.8-.49-5.44-1.39l-.39-.21-4.4 1.32 1.18-4.16-.25-.38C5.18 16.86 4.63 15.72 4.63 14.49 4.63 9.9 9.04 6 14.63 6c5.59 0 10.002 3.899 10.002 8.481 0 4.59-4.412 8.519-10.002 8.519zm5.79-5.21c-.79-.39-1.79-.99-2.07-1.1-.26-.13-.47-.2-.67.2-.2.39-.77 1.1-.95 1.33-.17.23-.34.26-.63.13-.29-.13-1.22-.44-2.32-1.41-.85-.74-1.42-1.65-1.59-1.93-.17-.29-.02-.44.13-.57.13-.13.29-.34.44-.51.15-.17.2-.29.31-.49.1-.2.05-.37-.02-.51-.07-.13-.67-1.63-.91-2.26-.23-.57-.46-.49-.67-.49h-.55c-.19 0-.5.07-.76.37-.26.3-1 1-1 2.44 0 1.44 1.03 2.84 1.17 3.04.14.2 2.03 3.1 5.01 4.35.7.3 1.24.48 1.66.61.7.23 1.34.2 1.85.12.56-.08 1.75-.71 2-1.4.24-.69.24-1.29.17-1.4-.08-.11-.28-.2-.58-.34z" />
              </svg>
              Book Appointment
            </Link>

          </div>
        </div>
         <div className={styles.rightDiv} style={{width:"50%"}}>
          <Image className={styles.rightDivIMG} src={c} width={300} height={400} alt="CodeAspirant" />
        </div>
      </div>
    </>
  )
}
