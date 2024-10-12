import React, { useState } from 'react';
import styles from "../english.module.css";

import HindustanTimesDay3 from './EnglishDay/HindustanTimes/25-09-23';

// import HinduAnaysis4 from './EnglishDay/HinduAnalysisDates/26-09-23';
// import HinduAnaysis5 from './EnglishDay/HinduAnalysisDates/27-09-23';
// import HinduAnaysis6 from './EnglishDay/HinduAnalysisDates/28-09-23';
// import HinduAnaysis7 from './EnglishDay/HinduAnalysisDates/29-09-23';
// import HinduAnaysis8 from './EnglishDay/HinduAnalysisDates/30-09-23';

const HiindustanTimesDatesComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleContent = (date) => {
    setSelectedDate(prevDate => (prevDate === date ? null : date));
  };

  const renderContent = (date) => {
    if (selectedDate !== null && selectedDate === date) {
      return (
        <div>
          {/* 
          {date === '30_09_23' && <HindustanTimesDay8 />}
          {date === '29_09_23' && <HindustanTimesDay7 />}
          {date === '28_09_23' && <HindustanTimesDay6 />}
          {date === '27_09_23' && <HindustanTimesDay5 />}
          {date === '26_09_23' && <HindustanTimesDay4 />} */}

          {date === '25_09_23' && <HindustanTimesDay3 />}

        </div>
      );
    }
    return null;
  };

  return (
    <>

      {/* 
      <div className={styles.daily_date} onClick={() => toggleContent('30_09_23')}>
        <h2>30-09-23</h2>
        {renderContent('30_09_23')}
      </div>
      <div className={styles.daily_date} onClick={() => toggleContent('29_09_23')}>
        <h2>29-09-23</h2>
        {renderContent('29_09_23')}
      </div>
      <div className={styles.daily_date} onClick={() => toggleContent('28_09_23')}>
        <h2>28-09-23</h2>
        {renderContent('28_09_23')}
      </div>
      <div className={styles.daily_date} onClick={() => toggleContent('27_09_23')}>
        <h2>27-09-23</h2>
        {renderContent('27_09_23')}
      </div>
      <div className={styles.daily_date} onClick={() => toggleContent('26_09_23')}>
        <h2>26-09-23</h2>
        {renderContent('26_09_23')}
      </div> */}



      {/* <div className={styles.daily_date} onClick={() => toggleContent('24_09_23')}>
        <h2>24-09-23</h2>
        {renderContent('24_09_23')}
      </div> */}
      <div className={styles.daily_date} onClick={() => toggleContent('25_09_23')}>
        <h2>25-09-23</h2>
        {renderContent('25_09_23')}
      </div>
      {/* <div className={styles.daily_date} onClick={() => toggleContent('23_09_23')}>
        <h2>23-09-23</h2>
        {renderContent('23_09_23')}
      </div>
      <div className={styles.daily_date} onClick={() => toggleContent('22_09_23')}>
        <h2>22-09-23</h2>
        <div className="pdf-container">
          {renderContent('22_09_23')}
        </div>
      </div> */}
    </>
  );
};

export default HiindustanTimesDatesComponent;