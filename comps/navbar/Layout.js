import Navbar from "./Navbar"
import Head from "next/head";
import Footer from "../Footer/Footer";
import FloatingWhatsApp from "../FloatingWhatsApp/FloatingWhatsApp";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <link rel="icon" href="/fav_icon/codeaspirant.png" />
            </Head>
            <div className="site-wrapper">
                <Navbar />
                <main id="main-content">{ children }</main>
                <Footer />
                <FloatingWhatsApp />
            </div>
        </>
    );
}

export default Layout;