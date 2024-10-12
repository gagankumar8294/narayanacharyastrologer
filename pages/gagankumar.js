import Head from "next/head"
import styles from '../styles/gagan.module.css'

const gagankumar = () => {

    const linkedInURL = "https://www.linkedin.com/in/gagan-kumar-14890a226/";
    const githubURL = "https://github.com/gagankumar8294"

    return (
        <>
            <Head>
                <title>CodeAspirant | Gagan Kumar | web developer</title>
                <meta name='keywords' content="codeaspirant | web developer" />
            </Head>
            <div className={styles.container}>
                    <div className={styles.imageContainer}>
                        <img src="/gagan2.jpeg" alt="Gagan Kumar" className={styles.roundImage} />
                    </div>
                    <h1 className={styles.title}>Gagan Kumar</h1>
                    <div className={styles.containers}>
                        <div>
                        <a href={linkedInURL} target="_blank" rel="noopener noreferrer" className={styles.linkedinLogo}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className={styles.linkedinSvg}
                        >
                            <path fill="#0077B5" d="M20.2 0H3.8C1.7 0 0 1.7 0 3.8v16.4C0 22.3 1.7 24 3.8 24h16.4c2.1 0 3.8-1.7 3.8-3.8V3.8C24 1.7 22.3 0 20.2 0zM7.6 20.1H4.9V9h2.7v11.1h-.1zM6.2 7.6h-.1c-.9 0-1.5-.6-1.5-1.3 0-.8.6-1.4 1.6-1.4s1.5.6 1.6 1.4c0 .7-.5 1.3-1.5 1.3zm13.9 12.5h-2.6v-5.6c0-1.3-.5-2.2-1.7-2.2-1.1 0-1.8.7-2.1 1.4-.1.3-.1.8-.1 1.3v5.2h-2.6V9H15v1.5h.1c.3-.6 1-1.4 2.2-1.4 1.6 0 2.9 1 2.9 3.3v5.7z"/>
                        </svg> </a>
                        </div>
                        <div>
                            <a href={githubURL} target="_blank" rel="noopener noreferrer" className={styles.linkedinLogo}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={styles.linkedinSvg} 
                                viewBox="0 0 24 24"
                            >
                                <path fill="#FFFFFF" d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z"></path>
                            </svg> </a>
                        </div>
                    </div>
                    <p className={styles.text}>As a web developer, I bring creativity and functionality together.</p>
                    <p className={styles.text}>I strive to create engaging and user-friendly web experiences.</p>
            </div>
        </>
    )
}

export default gagankumar; 
