import React, { useState } from 'react';
import styles from "../english.module.css";

import FreePressJournal3 from './EnglishDay/FreeDay/25-09-23';
import FreePressJournal2 from './EnglishDay/FreeDay/24-09-23';
import FreePressJournal1 from './EnglishDay/FreeDay/23-09-23';
import FreePressJournal0 from './EnglishDay/FreeDay/22-09-23';


// import FreePressJournal5 from './EnglishDay/FreeDay/27-09-23';
// import FreePressJournal6 from './EnglishDay/FreeDay/28-09-23';
// import FreePressJournal7 from './EnglishDay/FreeDay/29-09-23';
// import FreePressJournal8 from './EnglishDay/FreeDay/30-09-23';



const FreePressJournalDatesComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleContent = (date) => {
    setSelectedDate(prevDate => (prevDate === date ? null : date));
  };

  const renderContent = (date) => {
    if (selectedDate !== null && selectedDate === date) {
      return (
        <div>
          {/*
          {date === '30_09_23' && <FreePressJournal8 />}
          {date === '29_09_23' && <FreePressJournal7 />}
          {date === '28_09_23' && <FreePressJournal6 />}
          {date === '27_09_23' && <FreePressJournal5 />} */}

          {date === '25_09_23' && <FreePressJournal3 />}
          {date === '24_09_23' && <FreePressJournal2 />}
          {date === '23_09_23' && <FreePressJournal1 />}
          {date === '22_09_23' && <FreePressJournal0 />}
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

export default FreePressJournalDatesComponent;