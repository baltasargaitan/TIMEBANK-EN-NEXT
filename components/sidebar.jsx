import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Expandir el sidebar al hacer hover y cerrarlo al seleccionar una opción
    const handleMouseEnter = () => setIsExpanded(true);
    const handleMouseLeave = () => setIsExpanded(false);
    const handleLinkClick = () => setIsExpanded(false); // Cerrar al hacer clic en un enlace

    return (
        <div 
            className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <ul>
                <li><Link href="/cuentas" onClick={handleLinkClick}>Cuentas</Link></li>
                <li><Link href="/tarjetas" onClick={handleLinkClick}>Tarjetas</Link></li>
                <li><Link href="/transferencias" onClick={handleLinkClick}>Transferencias</Link></li>
                <li><Link href="/prestamo" onClick={handleLinkClick}>Simular prestamo</Link></li>
                <li><Link href="/convert" onClick={handleLinkClick}>Conversor de moneda</Link></li>
                <li><Link href="/facturas" onClick={handleLinkClick}>Facturas</Link></li>
                <li><Link href="/Helpcenter" onClick={handleLinkClick}>Ayuda</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;


