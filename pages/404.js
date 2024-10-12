import Link from "next/link"
import styles from '../styles/Home.module.css'
import { useEffect } from "react"
import { useRouter } from "next/router"

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 3000)
    }, [])

    return (
        <div className="not-found">
            <h1 className={styles.title}>Opps...</h1>
            <h2 className={styles.text}>That page Cannot be found</h2>
            <p className={styles.text}>Go back to the
            <Link className={styles.link} href="/blog">Recent Blog Posts</Link>
            </p>

            {/* <Link className="links" href="/ninjas">Ninja Listing</Link> */}
        </div>
    )
}

export default NotFound;