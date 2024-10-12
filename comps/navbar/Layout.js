import Navbar from "./Navbar"
import Head from "next/head";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <link rel="icon" href="/fav_icon/codeaspirant.png" />
            </Head>
            <div className="content">
                <Navbar />
                { children }
                <Footer />
            </div>
        </>
    );
}

export default Layout;