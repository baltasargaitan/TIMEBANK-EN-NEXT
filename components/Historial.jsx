"use client";
import { useEffect, useState } from 'react';
import styles from '../styles/cuentas.module.css';

const Historial = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const historialGuardado = JSON.parse(localStorage.getItem('historialFacturas')) || [];
    setHistorial(historialGuardado);
  }, []);

  return (
    <div className={styles.cuentasContainer}>
      <h1>Historial de Facturas</h1>
      {historial.length === 0 ? (
        <p>No hay facturas en el historial.</p>
      ) : (
        <ul>
          {historial.map((factura, index) => (
            <li key={index} className={styles.facturaItem}>
              <p className={styles.facturaId}>Factura {factura.id}</p>
              <p className={styles.clienteInfo}>Cliente: {factura.cliente}</p>
              <p className={styles.montoInfo}>Monto: ${factura.monto}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Historial;