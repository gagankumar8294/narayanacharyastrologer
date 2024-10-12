import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.logo}>
                    <h2>CodeAspirant</h2>
                </div>
                <div style={styles.links}>
                    <Link href="/terms" style={styles.link}>
                        Terms and Conditions
                    </Link>
                    <Link href="/privacy" style={styles.link}>
                        Privacy Policy
                    </Link>
                    <a href="tel:+1234567890" style={styles.link}>Contact: +919148644611</a>
                </div>
                <div style={styles.copyright}>
                    &copy; 2024 CodeAspirant. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px 0',
        textAlign: 'center',
        width: '100%',
        bottom: 0,
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        marginBottom: '10px',
    },
    links: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '10px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        margin: '0 15px',
        fontSize: '14px',
    },
    copyright: {
        fontSize: '12px',
    },
    '@media (min-width: 768px)': {
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        logo: {
            marginBottom: '0',
        },
        links: {
            marginBottom: '0',
        },
    },
};

export default Footer;