import Head from 'next/head'
import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';
import styles from '../styles/Home.module.css'
import Link from "next/link"
import AutoTypingText from '../comps/AutoTypingText';
import Image from 'next/image';
import c from ".././public/homepage/c.gif";

// import SplashScreen from '@/comps/SplashScreen';
// import { useState, useEffect } from 'react';

const textList = ['Astrology, Vaastu shastra','Numerology','Horoscope Prediction',]

export default function Home() {

  const { language } = useContext(LanguageContext);

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
      <h1>Hello</h1>
      <div className={styles.divContainer}>
        <div className={styles.leftDiv}>

        </div>
        <div className={styles.rightDiv}>

        </div>
      </div>
    </>
  )
}
