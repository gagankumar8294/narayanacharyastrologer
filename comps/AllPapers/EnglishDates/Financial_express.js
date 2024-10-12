import React, { useState } from 'react';
import styles from "../english.module.css";

import FinancialExpress0 from './EnglishDay/financialDate/26-09-23';
import FinancialExpress1 from './EnglishDay/financialDate/23-09-23';
import FinancialExpress2 from './EnglishDay/financialDate/24-09-23';
import FinancialExpress3 from './EnglishDay/financialDate/25-09-23';
import FinancialExpress4 from './EnglishDay/financialDate/26-09-23';

// import FinancialExpress5 from './EnglishDay/financialDate/27-09-23';
// import FinancialExpress6 from './EnglishDay/financialDate/28-09-23';
import FinancialExpress7 from './EnglishDay/financialDate/29-09-23';
// import FinancialExpress8 from './EnglishDay/financialDate/30-09-23';

const FinancialExpressOfIndiaDatesComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleContent = (date) => {
    setSelectedDate(prevDate => (prevDate === date ? null : date));
  };

  const renderContent = (date) => {
    if (selectedDate !== null && selectedDate === date) {
      return (
        <div>
          {/* 
          {date === '30_09_23' && <FinancialExpress8 />}
          
          {date === '28_09_23' && <FinancialExpress6 />}
          {date === '27_09_23' && <FinancialExpress5 />} */}
{date === '29_09_23' && <FinancialExpress7 />}

          {date === '26_09_23' && <FinancialExpress4 />}
          {date === '25_09_23' && <FinancialExpress3 />}
          {date === '24_09_23' && <FinancialExpress2 />}
          {date === '23_09_23' && <FinancialExpress1 />}
          {date === '22_09_23' && <FinancialExpress0 />}
        </div>
      );
    }
    return null;
  };

  return (
    <>
    {/* 
    <div className={styles.daily_date} onClick={() => toggleContent('27_09_23')}>
        <h2>27-09-23</h2>
        {renderContent('27_09_23')}
      </div>
      <div className={styles.daily_date} onClick={() => toggleContent('28_09_23')}>
        <h2>28-09-23</h2>
        {renderContent('28_09_23')}
      </div>
      
      <div className={styles.daily_date} onClick={() => toggleContent('30_09_23')}>
        <h2>30-09-23</h2>
        {renderContent('30_09_23')}
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

export default FinancialExpressOfIndiaDatesComponent;