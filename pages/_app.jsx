'use client'
import '../styles/globals.css';
import { AuthProvider } from '../components/AuthContext';
import { DineroProvider } from '../components/DineroContext';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
    return (

        <AuthProvider>
            <DineroProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </DineroProvider>
        </AuthProvider>
        
    );
}

export default MyApp;
