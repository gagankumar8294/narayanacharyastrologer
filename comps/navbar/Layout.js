import Navbar from "./Navbar"
import Head from "next/head";
import Footer from "../Footer/Footer";
import CallToAction from "./CallToAction";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <link rel="icon" href="/fav_icon/codeaspirant.png" />
            </Head>
            <div className="content">
                {/* <CallToAction /> */}
                <Navbar />
                { children }
                <Footer />
            </div>
        </>
    );
}

export default Layout;