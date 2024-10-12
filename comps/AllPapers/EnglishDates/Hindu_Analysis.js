import React, { useState } from 'react';
import styles from "../english.module.css";

import HinduAnaysis0 from './EnglishDay/HinduAnalysisDates/22-09-23';
import HinduAnaysis1 from './EnglishDay/HinduAnalysisDates/23-09-23';
import HinduAnaysis2 from './EnglishDay/HinduAnalysisDates/24-09-23';

// import HinduAnaysis4 from './EnglishDay/HinduAnalysisDates/26-09-23';
// import HinduAnaysis5 from './EnglishDay/HinduAnalysisDates/27-09-23';
// import HinduAnaysis6 from './EnglishDay/HinduAnalysisDates/28-09-23';
// import HinduAnaysis7 from './EnglishDay/HinduAnalysisDates/29-09-23';
// import HinduAnaysis8 from './EnglishDay/HinduAnalysisDates/30-09-23';

const HinduAnalysisDatesComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleContent = (date) => {
    setSelectedDate(prevDate => (prevDate === date ? null : date));
  };

  const renderContent = (date) => {
    if (selectedDate !== null && selectedDate === date) {
      return (
        <div>
          {/*
          {date === '29_09_23' && <HinduAnaysis8 />}
          {date === '28_09_23' && <HinduAnaysis7 />}
          {date === '27_09_23' && <HinduAnaysis6 />}
          {date === '26_09_23' && <HinduAnaysis5 />}
          {date === '25_09_23' && <HinduAnaysis4 />} */}


          {date === '24_09_23' && <HinduAnaysis2 />}
          {date === '23_09_23' && <HinduAnaysis1 />}
          {date === '22_09_23' && <HinduAnaysis0 />}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* <div className={styles.daily_date} onClick={() => toggleContent('30_09_23')}>
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
        {renderContent('24_09_23')}
      </div>
      <div className={styles.daily_date} onClick={() => toggleContent('25_09_23')}>
        <h2>25-09-23</h2>
        {renderContent('25_09_23')}
      </div> */}



      <div className={styles.daily_date} onClick={() => toggleContent('24_09_23')}>
        <h2>24-09-23</h2>
        {renderContent('24_09_23')}
      </div>
      {/* <div className={styles.daily_date} onClick={() => toggleContent('23_09_23')}>
        <h2>23-09-23</h2>
        {renderContent('23_09_23')}
      </div>
      <div className={styles.daily_date} onClick={() => toggleContent('22_09_23')}>
        <h2>22-09-23</h2>
        {renderContent('22_09_23')}
      </div> */}
    </>
  );
};

export default HinduAnalysisDatesComponent;