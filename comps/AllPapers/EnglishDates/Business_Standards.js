import React, { useState } from 'react';
import styles from "../english.module.css";
import BusinessStandardsDay3 from './EnglishDay/BusinessStandards/25-09-23';
// import BusinessStandardsDay4 from './EnglishDay/BusinessStandards/26-09-23';
// import BusinessStandardsDay5 from './EnglishDay/BusinessStandards/27-09-23';
// import BusinessStandardsDay6 from './EnglishDay/BusinessStandards/28-09-23';
// import BusinessStandardsDay7 from './EnglishDay/BusinessStandards/29-09-23';
// import BusinessStandardsDay8 from './EnglishDay/BusinessStandards/30-09-23';

const BusinessStandardsDatesComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleContent = (date) => {
    setSelectedDate(prevDate => (prevDate === date ? null : date));
  };

  const renderContent = (date) => {
    if (selectedDate !== null && selectedDate === date) {
      return (
        <div>
          {/*
          {date === '30_09_23' && <BusinessStandardsDay3 />}
          {date === '29_09_23' && <BusinessStandardsDay3 />}
          {date === '28_09_23' && <BusinessStandardsDay3 />}
          {date === '27_09_23' && <BusinessStandardsDay3 />}
          {date === '26_09_23' && <BusinessStandardsDay3 />} */}
          {date === '25_09_23' && <BusinessStandardsDay3 />}
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
        {renderContent('26_09_23')}
      </div> */}
      <div className={styles.daily_date} onClick={() => toggleContent('25_09_23')}>
        <h2>25-09-23</h2>
        {renderContent('25_09_23')}
      </div>
    </>
  );
};

export default BusinessStandardsDatesComponent;