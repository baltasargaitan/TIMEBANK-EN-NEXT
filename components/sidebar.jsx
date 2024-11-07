// components/Sidebar.js
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
                <ul>
                    <li><Link href="/cuentas">Cuentas</Link></li>
                    <li><Link href="/tarjetas">Tarjetas</Link></li>
                    <li><Link href="/transferencias">Transferencias</Link></li>
                    <li><Link href="/prestamo">Simular prestamo</Link></li>
                    <li><Link href="/convert">Conversor de moneda</Link></li>
                    <li><Link href="/facturas">Facturas</Link></li>
                    <li><Link href="/Helpcenter">Ayuda</Link></li>
                </ul>

        </div>
    );
};

export default Sidebar;
