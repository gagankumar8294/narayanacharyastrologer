import { LanguageProvider } from '@/context/LanguageContext';
import Layout from '../comps/navbar/Layout'
import '../styles/globals.css'
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
  
  )
}

export default MyApp
