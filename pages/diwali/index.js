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
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Diwali savings/festival fund</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              {months.map(m => (
                <th key={m}>{m}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.Name}</td>
                {months.map(m => (
                  <td key={m}>{row[m]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
