'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const DineroContext = createContext();

export const useDinero = () => {
  return useContext(DineroContext);
};

export const DineroProvider = ({ children }) => {
  // Cargar saldo desde localStorage si existe, sino asignar un valor por defecto
  const [saldo, setSaldo] = useState(() => {
    if (typeof window !== "undefined") {
      const storedSaldo = localStorage.getItem('saldo');
      return storedSaldo ? parseFloat(storedSaldo) : 10000; // 10000 es el saldo inicial
    }
    return 10000;
  });

  const [movimientos, setMovimientos] = useState(() => {
    if (typeof window !== "undefined") {
      const storedMovimientos = localStorage.getItem('movimientos');
      return storedMovimientos ? JSON.parse(storedMovimientos) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Guardar saldo y movimientos en localStorage
      localStorage.setItem('saldo', saldo.toString());
      localStorage.setItem('movimientos', JSON.stringify(movimientos));
    }
  }, [saldo, movimientos]);

  const handleTransferirDinero = (monto, destinatario) => {
    const montoNumerico = parseFloat(monto);
    if (montoNumerico <= 0) {
      alert('El monto debe ser positivo.');
      return;
    }
    if (montoNumerico > saldo) {
      alert('Saldo insuficiente.');
      return;
    }

    // Actualizar saldo
    const nuevoSaldo = saldo - montoNumerico;
    setSaldo(nuevoSaldo);

    // Registrar el movimiento
    setMovimientos((prevMovimientos) => [
      ...prevMovimientos,
      { destinatario, monto, fecha: new Date().toLocaleString() }
    ]);
  };

  return (
    <DineroContext.Provider value={{ saldo, handleTransferirDinero, movimientos }}>
      {children}
    </DineroContext.Provider>
  );
};
