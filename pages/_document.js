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