import React, { useState } from 'react';
import styles from "../english.module.css";

import TheTrubine0 from './EnglishDay/Tribune/22-09-23';
import TheTrubine1 from './EnglishDay/Tribune/23-09-23';
import TheTrubine2 from './EnglishDay/Tribune/24-09-23';
import TheTrubine3 from './EnglishDay/Tribune/25-09-23';
import TheTrubine4 from './EnglishDay/Tribune/26-09-23';


// import TheTrubine5 from './EnglishDay/Tribune/27-09-23';
// import TheTrubine6 from './EnglishDay/Tribune/28-09-23';
import TheTrubine7 from './EnglishDay/Tribune/29-09-23';
// import TheTrubine8 from './EnglishDay/Tribune/30-09-23';

const TheTrubineDatesComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleContent = (date) => {
    setSelectedDate(prevDate => (prevDate === date ? null : date));
  };

  const renderContent = (date) => {
    if (selectedDate !== null && selectedDate === date) {
      return (
        <div>

{/* 
{date === '30_09_23' && <TheTrubine8/>}

{date === '28_09_23' && <TheTrubine6/>}
{date === '27_09_23' && <TheTrubine5/>} */}


{date === '29_09_23' && <TheTrubine7/>}
          {date === '26_09_23' && <TheTrubine4/>}
          {date === '25_09_23' && <TheTrubine3/>}
          {date === '24_09_23' && <TheTrubine2/>}
          {date === '23_09_23' && <TheTrubine1/>}
          {date === '22_09_23' && <TheTrubine0 />}
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
      
      <div className={styles.daily_date} onClick={() => toggleContent('28_09_23')}>
        <h2>28-09-23</h2>
        {renderContent('28_09_23')}
      </div>
      <div className={styles.daily_date} onClick={() => toggleContent('27_09_23')}>
        <h2>27-09-23</h2>
        {renderContent('27_09_23')}
      </div> */}

<div className={styles.daily_date} onClick={() => toggleContent('29_09_23')}>
        <h2>29-09-23</h2>
        {renderContent('29_09_23')}
      </div>

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

export default TheTrubineDatesComponent;