import Head from 'next/head';
import { useState } from 'react';
import styles from "./newspaper.module.css" ;
import Englishcomponent from '../../comps/AllPapers/English';

const NewspaperComponent = () => {
  const [showEnglishContent, setShowEnglishContent] = useState(false);
  const [showKannadaContent, setShowKannadaContent] = useState(false);
  const [showHindiContent, setShowHindiContent] = useState(false);

  const toggleContent = (language) => {
    switch (language) {
      case 'english':
        setShowEnglishContent(prevState => !prevState);
        setShowKannadaContent(false);
        setShowHindiContent(false);
        break;
      case 'kannada':
        setShowEnglishContent(false);
        setShowKannadaContent(prevState => !prevState);
        setShowHindiContent(false);
        break;
      case 'hindi':
        setShowEnglishContent(false);
        setShowKannadaContent(false);
        setShowHindiContent(prevState => !prevState);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Head>
        <title>CodeAspirant | NEWSPAPERS</title>
        <meta name='keywords' contents="codeaspirant" />
      </Head>
      <p className={styles.everyday}>EveryDay After 8:30</p>
      <div className={styles.papers_border}>
        <div className={styles.language_papers}>
          <h1 className={styles.english_paper_title} onClick={() => toggleContent('english')}>English Newspapers</h1>
            {showEnglishContent && (
              <div className={styles.english_papers}>
                <Englishcomponent />
              </div>
            )}
        </div>
        <div className={styles.language_papers}>
          <h1  className={styles.kannada_paper_title} onClick={() => toggleContent('kannada')}>Kannada Newspapers</h1>
            {showKannadaContent && (
              <div className={styles.kannada_papers}>
                {/* <Kannadacomponent /> */}
                <p>comming soon</p>
              </div>
            )}
        </div>
        <div className={styles.language_papers}>
          <h1 className={styles.telugu_paper_title} onClick={() => toggleContent('hindi')}>Telugu Newspapers</h1>
            {showHindiContent && (
            <div className={styles.telugu_papers}>
              {/* <Telugucomponent /> */}
              <p>comming soon</p>
            </div>
            )}
        </div>
    </div>
    </>
    
  );
};

export default NewspaperComponent;