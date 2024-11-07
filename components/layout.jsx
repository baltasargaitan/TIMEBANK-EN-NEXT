// components/Layout.js
import Header from './header';
import Footer from './Footer';
import Sidebar from './sidebar';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            <Sidebar />
            <main className={styles.mainContent}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
