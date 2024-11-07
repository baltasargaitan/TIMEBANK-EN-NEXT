'use client'
import { useState, useEffect } from 'react';
import { DineroProvider, useDinero } from '../components/DineroContext';
import styles from '../styles/Transferencias.module.css';
import HistorialMovimientos from '../components/HistorialMovimientos';

const Transferencias = () => {
  return (
    <DineroProvider>
      <div className={styles.transferencias}>
        <h1>Transferencias</h1>
        <FormularioTransferencia />
        <HistorialMovimientos />
      </div>
    </DineroProvider>
  );
};

const FormularioTransferencia = () => {
  const [monto, setMonto] = useState('');
  const [destinatario, setDestinatario] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'error' o 'success'
  const { saldo, handleTransferirDinero } = useDinero();
  const [isHydrated, setIsHydrated] = useState(false);  // Estado para manejar la hidratación

  useEffect(() => {
    setIsHydrated(true);  // Actualizamos el estado después de la hidratación
  }, []);

  if (!isHydrated) {
    return null; // Evitamos renderizar hasta que se haya hidratado el cliente
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const montoNumerico = parseFloat(monto);
  
    // Verificar si el monto es negativo
    if (montoNumerico <= 0) {
      setMensaje('El monto debe ser positivo.');
      setTipoMensaje('error');
    }
    // Verificar si el monto es mayor al saldo disponible
    else if (montoNumerico > saldo) {
      setMensaje('Saldo insuficiente para realizar la transferencia.');
      setTipoMensaje('error');
    }
    // Verificar si los campos están completos y si el monto es válido
    else if (monto && destinatario) {
      handleTransferirDinero(monto, destinatario);
      setMensaje('Transferencia exitosa.');
      setTipoMensaje('success');
      setMonto('');
      setDestinatario('');
    } else {
      setMensaje('Por favor, completa todos los campos correctamente.');
      setTipoMensaje('error');
    }
  };

  return (
    <div className={styles.formularioTransferencia}>
      <h2>Realizar Transferencia</h2>
      <p>Saldo disponible: ${saldo}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="monto">Monto a transferir:</label>
          <input
            className={styles.input}
            type="number"
            id="monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="destinatario">Destinatario:</label>
          <input
            className={styles.input}
            type="text"
            id="destinatario"
            value={destinatario}
            onChange={(e) => setDestinatario(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} type="submit">Transferir</button>
      </form>

      {/* Mensaje de estado */}
      {mensaje && (
        <div
          className={`${styles.mensaje} ${tipoMensaje === 'error' ? styles.error : styles.success}`}
        >
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default Transferencias;
