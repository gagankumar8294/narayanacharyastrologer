import { useState } from 'react';
import styles from "../english.module.css" ; // Assuming you have a CSS module for styles

import DeccanDay0 from './EnglishDay/DeccanDate/22-09-23';
import DeccanDay1 from './EnglishDay/DeccanDate/23-09-23';
// import DeccanDay2 from './EnglishDay/DeccanDate/24-09-23';
// import DeccanDay3 from './EnglishDay/DeccanDate/25-09-23';
// import DeccanDay4 from './EnglishDay/DeccanDate/26-09-23';
// import DeccanDay5 from './EnglishDay/DeccanDate/27-09-23';
// import DeccanDay6 from './EnglishDay/DeccanDate/28-09-23';
// import DeccanDay7 from './EnglishDay/DeccanDate/29-09-23';
// import DeccanDay8 from './EnglishDay/DeccanDate/30-09-23';

const DeccenChronicleOfIndiaDatesComponent = () => {
    const [selectedDate, setSelectedDate] = useState(null);

  const toggleContent = (date) => {
    setSelectedDate(prevDate => (prevDate === date ? null : date));
  };

  const renderContent = (date) => {
    if (selectedDate !== null && selectedDate === date) {
      return (
        <div>
          {/* 
          {date === '30_09_23' && <DeccanDay8 />}
          {date === '29_09_23' && <DeccanDay7 />}
          {date === '28_09_23' && <DeccanDay6 />}
          {date === '27_09_23' && <DeccanDay5 />}
          {date === '26_09_23' && <DeccanDay4 />}
          {date === '25_09_23' && <DeccanDay3 />}
          {date === '24_09_23' && <DeccanDay2 />} */}
          {date === '23_09_23' && <DeccanDay1 />}
          {date === '22_09_23' && <DeccanDay0 />}
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

export default DeccenChronicleOfIndiaDatesComponent;