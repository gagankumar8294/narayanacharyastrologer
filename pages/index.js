import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import AutoTypingText from '../comps/AutoTypingText';
import Image from 'next/image';
// import c from ".././public/homepage/c.gif";

// import SplashScreen from '@/comps/SplashScreen';
// import { useState, useEffect } from 'react';

const textList = ['Astrology, Vaastu shastra','Numerology','Horoscope Prediction',]

export default function Home() {

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Set a timer to hide splash screen after 5 seconds
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 5000); // 5 seconds

  //   // Cleanup the timer
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <Head>
        <title>Narayanachary - Professional Astrologer in Bangalore | Astrology & Vaastu Shastra</title>
        <meta name='keywords' content='ನಾರಾಯಣಾಚಾರಿ ಜ್ಯೋತಿಷಿ, Bangalore astrologer, professional astrologer, best astrology services, Vaastu Shastra expert, horoscope reading, astrology consultation, Bangalore Vaastu services, spiritual guidance, astrology solutions, నారాయణాచారి జ్యోతిష్యుడు, బెంగళೂರು జ్యೋತಿಷಿ, వాస్తు శాస్త్ర నిపుణుడు, జ్యోతిష్య సేవలు' />
        <meta name='description' content='Narayanachary, a professional astrologer in Bangalore, offers expert astrology consultations, horoscope readings, and Vaastu Shastra solutions. ನಾರಾಯಣಾಚಾರಿ, ಪ್ರಮುಖ ಜ್ಯೋತಿಷಿ ಬೆಂಗಳೂರಿನಲ್ಲಿ, ಜ್ಯೋತಿಷ್ಯ ಸಮಾಲೋಚನೆಗಳು, ಜಾತಕ ವೀಕ್ಷಣೆ, ಮತ್ತು ವಾಸ್ತು ಪರಿಹಾರ ಸೇವೆಗಳನ್ನು ನೀಡುತ್ತಾನೆ. నారాయణాచారి, బెంగళూరులో ప్రముఖ జ్యోతిష్యుడు, జ్యోతిష్య సంప్రదాయాలు, జాతక పఠనం, మరియు వాస్తు పరిష్కార సేవలను అందిస్తారు.' />
      </Head>
      {/* {loading ? (
        <SplashScreen />
      ) : ( */}
      <div style={{paddingTop:"150px"}} className={styles.container}>  

    

      <div className={styles.leftDiv}>
          <h4 className={styles.dynamic_text} >Welcome to<span className={styles.main_title}>Chary's Predictions</span></h4>
          <h2>Narayanachary Astrologer</h2>
          <p className={styles.dynamic_text2} >
            <span className={styles.text_bar_pulse}style={{ color: "#f2f2f2", fontWeight: "bold" }}>|</span> <AutoTypingText textList={textList} typingDelay={100} erasingDelay={30} pauseDelay={1500} />
          </p>
          <div className={styles.intro_para}>
            <p>
              ಎಂಟು ವರ್ಷಗಳ ಜ್ಯೋತಿಷ್ಯ ವಾಸ್ತು ಸಂಖ್ಯಾಶಾಸ್ತ್ರದ ಅನುಭವದೊಂದಿಗೆ 
              ಬ್ರಹ್ಮ ಶ್ರೀ ನಾರಾಯಣಚಾರ್ಯ ಆದ ನಾನು ಸುಖ ಜೀವನ ನಡೆಸಲು ಒಳ್ಳೆಯ ಮಾರ್ಗದರ್ಶನ ಸಲಹೆ ಸೂಚನೆಗಳನ್ನು ನೀಡಲಾಗುವುದು
            </p>
            <h4 className={styles.services}>
              ನಾವು<span style={{color:'#ff6801'}}> ಜ್ಯೋತಿಷ್ಯ ಮತ್ತು ವಾಸ್ತು ಪರಿಹಾರ ಸೇವೆಗಳನ್ನು</span> ನೀಡಲು ಸಿದ್ಧವಾಗಿದ್ದೇವೆ
            </h4>
          </div>
          <div className={styles.main_link}>
            <Link className={styles.button_1} href="/blog">Explore Blog</Link>
            <Link className={styles.button_2} href="/videos">Get Started</Link>
          </div>
        </div>
        {/* <div className={styles.rightDiv} style={{width:"50%"}}>
          <Image src={c} width={300} height={400} alt="CodeAspirant" />
        </div>   */}
      </div>
    </>
  )
}
