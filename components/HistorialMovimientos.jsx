'use client'; // Asegúrate de que este archivo solo se ejecute del lado del cliente
import { useEffect, useState } from 'react';
import { useDinero } from './DineroContext';
import styles from '../styles/Transferencias.module.css';

const HistorialMovimientos = () => {
  const { movimientos } = useDinero();
  const [isMounted, setIsMounted] = useState(false);

  // useEffect para verificar si el componente se ha montado en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Devuelve null mientras espera el montaje en el cliente
  }

  // Ordenar los movimientos por fecha (de más reciente a más antiguo)
  const movimientosOrdenados = [...movimientos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <div className={styles.historialMovimientos}>
      <h2>Historial de Movimientos</h2>
      {movimientosOrdenados.length > 0 ? (
        <ul>
          {movimientosOrdenados.map((movimiento, index) => (
            <li key={index}>
              <p><strong>Destinatario:</strong> {movimiento.destinatario}</p>
              <p><strong>Monto:</strong> ${movimiento.monto}</p>
              <p><strong>Fecha:</strong> {movimiento.fecha}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay movimientos realizados.</p>
      )}
    </div>
  );
};

export default HistorialMovimientos;
