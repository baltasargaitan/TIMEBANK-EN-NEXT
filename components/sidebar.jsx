// components/Sidebar.js
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Función para alternar la visibilidad del sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Botón flotante para abrir/cerrar el sidebar */}
            <button className={styles.floatingButton} onClick={toggleSidebar}>
                {isOpen ? 'Cerrar' : 'Menú'}
            </button>

            {/* Sidebar con clase condicional para mostrar/ocultar */}
            <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
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
        </>
    );
};

export default Sidebar;
