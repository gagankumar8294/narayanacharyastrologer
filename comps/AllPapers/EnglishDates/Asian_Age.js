import React, { useState } from 'react';
import styles from "../english.module.css";
import AsianAgeDay0 from "./EnglishDay/AsianAgeDate/22-09-23";
import AsianAgeDay1 from './EnglishDay/AsianAgeDate/23-09-23';
import AsianAgeDay2 from './EnglishDay/AsianAgeDate/24-09-23';
import AsianAgeDay3 from './EnglishDay/AsianAgeDate/25-09-23';
import AsianAgeDay4 from './EnglishDay/AsianAgeDate/26-09-23';
// import AsianAgeDay5 from './EnglishDay/AsianAgeDate/27-09-23';
// import AsianAgeDay6 from './EnglishDay/AsianAgeDate/28-09-23';
// import AsianAgeDay7 from './EnglishDay/AsianAgeDate/29-09-23';
// import AsianAgeDay8 from './EnglishDay/AsianAgeDate/30-09-23';

const AsianAgeDatesComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleContent = (date) => {
    setSelectedDate(prevDate => (prevDate === date ? null : date));
  };

  const renderContent = (date) => {
    if (selectedDate !== null && selectedDate === date) {
      return (
        <div>
          {/* 
          {date === '30_09_23' && <AsianAgeDay4 />}
          {date === '29_09_23' && <AsianAgeDay4 />}
          {date === '28_09_23' && <AsianAgeDay4 />}
          {date === '27_09_23' && <AsianAgeDay4 />} */}
          {date === '26_09_23' && <AsianAgeDay4 />}
          {date === '25_09_23' && <AsianAgeDay3 />}
          {date === '24_09_23' && <AsianAgeDay2 />}
          {date === '23_09_23' && <AsianAgeDay1 />}
          {date === '22_09_23' && <AsianAgeDay0 />}
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
      </div> */}
    <div className={styles.daily_date} onClick={() => toggleContent('26_09_23')}>
        <h2>26-09-23</h2>
        {renderContent('26_09_23')}
      </div>
      <div className={styles.daily_date} onClick={() => toggleContent('24_09_23')}>
        <h2>24-09-23</h2>
        {renderContent('24_09_23')}
      </div>
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

export default AsianAgeDatesComponent;