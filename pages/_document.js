import Document, { Html, Head, Main, NextScript } from 'next/document';
import crypto from 'crypto';

const generateNonce = () => {
    return crypto.randomBytes(16).toString('base64');
  };
  class MyDocument extends Document {
    render() {
      const nonce = generateNonce();
  
      return (
        <Html>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Nunito:wght@300;400;600;700;800;900&family=Rozha+One&display=swap" rel="stylesheet" />
            <link rel="icon" href="/fav_icon/codeaspirant.png" />
            <script
              async
              defer
              crossOrigin="anonymous"
              src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v13.0&appId=800994588364641&autoLogAppEvents=1`}
              nonce={nonce}
            ></script>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }

export default MyDocument;