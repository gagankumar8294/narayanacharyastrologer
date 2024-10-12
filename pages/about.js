import Head from "next/head"
import styles from '../styles/Home.module.css'

const About = () => {
    return (
        <>
        <Head>
            <title>CodeAspirant | About Page</title>
            <meta name='keywords' content="codeaspirant" />
        </Head>
        <div style={{paddingTop:"150px"}}>
            {/* <h1 className={styles.title}>About</h1>
            <p className={styles.text}>started server on 0.0.0.0:3000 url httplocalhos3000</p>
            <p className={styles.text}>event  compiled client and server successfully in 3.4s 164 modules</p>
            <p className={styles.text}>wait compiling client and server event compiled client and server successf</p> */}
            <h2 className={styles.maintenance}>This page is under Maintenance</h2>
        </div>
        </>
    )
}

export default About; 