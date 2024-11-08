'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const DineroContext = createContext();

export const useDinero = () => {
  return useContext(DineroContext);
};

export const DineroProvider = ({ children }) => {
  
  const [saldo, setSaldo] = useState(() => {
    if (typeof window !== "undefined") {
      const storedSaldo = localStorage.getItem('saldo');
      return storedSaldo ? parseFloat(storedSaldo).toFixed(2) : '10000.00'; 
    }
    return '10000.00'; 
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
      
      localStorage.setItem('saldo', saldo);
      localStorage.setItem('movimientos', JSON.stringify(movimientos));
    }
  }, [saldo, movimientos]);

  const handleTransferirDinero = (monto, destinatario) => {
    const montoNumerico = parseFloat(monto);
    if (montoNumerico <= 0) {
      alert('El monto debe ser positivo.');
      return;
    }
    if (montoNumerico > parseFloat(saldo)) { 
      alert('Saldo insuficiente.');
      return;
    }

   
    const nuevoSaldo = (parseFloat(saldo) - montoNumerico).toFixed(2); 
    setSaldo(nuevoSaldo);

    
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
