import Link from "next/link";
import styles from "../../styles/Home.module.css"

const Videos = () => {
    return (
        <div style={{paddingTop:"150px"}}>
            {/* <h1>watch and learn in your self phased</h1>
            <Link href="/blog/first-post">First video</Link> */}
            <h2 className={styles.maintenance}>This page is under maintenance</h2>
        </div>
    );
}

export default Videos;