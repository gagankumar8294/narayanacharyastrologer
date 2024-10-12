import React, { useState } from 'react';
import styles from "../english.module.css";

import ThePioneer0 from './EnglishDay/ThePioneerDate/22-09-23';
import ThePioneer1 from './EnglishDay/ThePioneerDate/23-09-23';
import ThePioneer2 from './EnglishDay/ThePioneerDate/24-09-23';
import ThePioneer4 from './EnglishDay/ThePioneerDate/26-09-23';

// import ThePioneer5 from './EnglishDay/ThePioneerDate/27-09-23';
// import ThePioneer6 from './EnglishDay/ThePioneerDate/28-09-23';
// import ThePioneer7 from './EnglishDay/ThePioneerDate/29-09-23';
// import ThePioneer8 from './EnglishDay/ThePioneerDate/30-09-23';

const ThePioneerDatesComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleContent = (date) => {
    setSelectedDate(prevDate => (prevDate === date ? null : date));
  };

  const renderContent = (date) => {
    if (selectedDate !== null && selectedDate === date) {
      return (
        <div>


          {/* 
          {date === '30_09_23' && <ThePioneer8 />}
          {date === '29_09_23' && <ThePioneer7 />}
          {date === '28_09_23' && <ThePioneer6 />}
          {date === '27_09_23' && <ThePioneer5 />} */}


          {date === '26_09_23' && <ThePioneer4 />}
          {date === '24_09_23' && <ThePioneer2 />}
          {date === '23_09_23' && <ThePioneer1 />}
          {date === '22_09_23' && <ThePioneer0 />}
        </div>
      );
    }
    return null;
  };

  return (
    <>
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
      </div>
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

export default ThePioneerDatesComponent;