import React, { useState } from 'react';
import styles from "../english.module.css";

import TheHinduDay2 from './EnglishDay/TheHinduDate/24-09-23';
import TheHinduDay1 from './EnglishDay/TheHinduDate/23-09-23';
import TheHinduDay0 from './EnglishDay/TheHinduDate/22-09-23';

// import TheHinduDay5 from './EnglishDay/TheHinduDate/27-09-23';
// import TheHinduDay6 from './EnglishDay/TheHinduDate/28-09-23';
// import TheHinduDay7 from './EnglishDay/TheHinduDate/29-09-23';
// import TheHinduDay8 from './EnglishDay/TheHinduDate/30-09-23';


const TheHinduDatesComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleContent = (date) => {
    setSelectedDate(prevDate => (prevDate === date ? null : date));
  };

  const renderContent = (date) => {
    if (selectedDate !== null && selectedDate === date) {
      return (
        <div>

          {/* 
          {date === '30_09_23' && <TheHinduDay8 />}
          {date === '29_09_23' && <TheHinduDay7 />}
          {date === '28_09_23' && <TheHinduDay6 />}
          {date === '27_09_23' && <TheHinduDay5 />} */}



          {date === '24_09_23' && <TheHinduDay2 />}
          {date === '23_09_23' && <TheHinduDay1 />}
          {date === '22_09_23' && <TheHinduDay0 />}
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

export default TheHinduDatesComponent;