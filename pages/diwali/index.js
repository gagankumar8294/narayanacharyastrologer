import { useEffect, useRef, useState } from "react";
import styles from "./diwali.module.css";

export async function getServerSideProps() {
  const res = await fetch(
    "https://opensheet.elk.sh/1vwuhTGyY1P6QtG1QD1-s42Jr02AoF9L88-mIOktl1hw/Sheet1"
  );
  const data = await res.json();

  return {
    props: { data },
  };
}

export default function Home({ data }) {
  const months = ["village","Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "June"];

  const wrapperRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // detect scroll position
  const checkScroll = () => {
    const el = wrapperRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  // initial check
  useEffect(() => {
    checkScroll();
  }, []);

  const scrollRight = () => {
    wrapperRef.current.scrollTo({
      left: wrapperRef.current.scrollWidth,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    wrapperRef.current.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Diwali savings / festival fund</h2>

      <div className={styles.tableContainer}>
        {/* ⬅ Left Arrow */}
        {showLeft && (
          <button className={`${styles.arrow} ${styles.left}`} onClick={scrollLeft}>
            ⬅
          </button>
        )}

        {/* Table */}
        <div
          className={styles.tableWrapper}
          ref={wrapperRef}
          onScroll={checkScroll}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Card Number</th>
                <th>Name</th>
                {months.map(m => (
                  <th key={m}>{m}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  <td className={styles.cardCol}>{row["Card Number"]}</td>
                  <td>{row.Name}</td>
                  {months.map(m => (
                    <td key={m}>{row[m]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ➜ Right Arrow */}
        {showRight && (
          <button className={`${styles.arrow} ${styles.right}`} onClick={scrollRight}>
            ➜
          </button>
        )}
      </div>
    </div>
  );
}
