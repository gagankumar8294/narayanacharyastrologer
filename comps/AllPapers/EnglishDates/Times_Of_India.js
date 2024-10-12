import React, { useState } from 'react';
import styles from "../english.module.css";

import TheTimesOfIndiaDay0 from './EnglishDay/TimesOfIndiaDate/22-09-23';
import TheTimesOfIndiaDay1 from './EnglishDay/TimesOfIndiaDate/23-09-23';
import TheTimesOfIndiaDay2 from './EnglishDay/TimesOfIndiaDate/24-09-23';
import TheTimesOfIndiaDay3 from './EnglishDay/TimesOfIndiaDate/25-09-23';
import TheTimesOfIndiaDay4 from './EnglishDay/TimesOfIndiaDate/26-09-23';

// import TheTimesOfIndiaDay5 from './EnglishDay/TimesOfIndiaDate/27-09-23';
// import TheTimesOfIndiaDay6 from './EnglishDay/TimesOfIndiaDate/28-09-23';
// import TheTimesOfIndiaDay7 from './EnglishDay/TimesOfIndiaDate/29-09-23';
// import TheTimesOfIndiaDay8 from './EnglishDay/TimesOfIndiaDate/30-09-23';

const TheTimesOfIndiaComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleContent = (date) => {
    setSelectedDate(prevDate => (prevDate === date ? null : date));
  };

  const renderContent = (date) => {
    if (selectedDate !== null && selectedDate === date) {
      return (
        <div>

{/* 
{date === '30_09_23' && <TheTimesOfIndiaDay8 />}
{date === '29_09_23' && <TheTimesOfIndiaDay7 />}
{date === '28_09_23' && <TheTimesOfIndiaDay6 />}
{date === '27_09_23' && <TheTimesOfIndiaDay5 />} */}


          {date === '26_09_23' && <TheTimesOfIndiaDay4 />}
          {date === '25_09_23' && <TheTimesOfIndiaDay3 />}
          {date === '24_09_23' && <TheTimesOfIndiaDay2 />}
          {date === '23_09_23' && <TheTimesOfIndiaDay1 />}
          {date === '22_09_23' && <TheTimesOfIndiaDay0 />}
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
      </div> */}





    <div className={styles.daily_date} onClick={() => toggleContent('26_09_23')}>
        <h2>26-09-23</h2>
        {renderContent('26_09_23')}
      </div>
    <div className={styles.daily_date} onClick={() => toggleContent('25_09_23')}>
        <h2>25-09-23</h2>
        {renderContent('25_09_23')}
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

export default TheTimesOfIndiaComponent;