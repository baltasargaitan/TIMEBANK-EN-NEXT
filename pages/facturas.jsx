'use client';
import { useEffect, useState } from 'react';
import Styles from '../styles/Factura.module.css';
import { useDinero } from '../components/DineroContext'; 

export async function getStaticProps() {
  const facturas = Array.from({ length: 10 }, (_, index) => ({
    id: (index + 1).toString(),
    cliente: `Cliente ${index + 1}`,
    monto: (Math.random() * 1000).toFixed(2),
  }));

  return { props: { facturas } };
}

const Facturas = ({ facturas }) => {
  const { saldo, handleTransferirDinero } = useDinero(); 
  const [facturasList, setFacturasList] = useState(facturas);
  const [mensajes, setMensajes] = useState({});  // Mantener los mensajes por factura
  const [mensajeVisible, setMensajeVisible] = useState({});  // Mantener la visibilidad por factura

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const historial = JSON.parse(localStorage.getItem('historialFacturas')) || [];
      historial.push(...facturasList);
      localStorage.setItem('historialFacturas', JSON.stringify(historial));
    }
  }, [facturasList]);

  const handlePayment = (facturaId, monto) => {
    if (parseFloat(monto) > saldo) {
      setMensajes((prev) => ({
        ...prev,
        [facturaId]: "No tienes suficiente saldo para pagar esta factura."
      }));
      setMensajeVisible((prev) => ({
        ...prev,
        [facturaId]: true
      }));

      setTimeout(() => {
        setMensajeVisible((prev) => ({
          ...prev,
          [facturaId]: false
        }));
      }, 3000); // Desaparece después de 3 segundos

      return;
    }

    handleTransferirDinero(monto, `Pago factura ${facturaId}`);

    const nuevasFacturas = facturasList.filter(factura => factura.id !== facturaId);
    setFacturasList(nuevasFacturas);

    setMensajes((prev) => ({
      ...prev,
      [facturaId]: `Pago exitoso para la factura ${facturaId}`
    }));
    setMensajeVisible((prev) => ({
      ...prev,
      [facturaId]: true
    }));

    setTimeout(() => {
      setMensajeVisible((prev) => ({
        ...prev,
        [facturaId]: false
      }));
    }, 3000); // Desaparece después de 3 segundos
  };

  if (!facturasList || facturasList.length === 0) {
    return <p>No hay facturas disponibles</p>;
  }

  return (
    <div className={Styles.listadoFacturas}>
      {facturasList.map((factura) => (
        <div key={factura.id} className={Styles.facturaItem}>
          <h1 className={Styles.facturaTitle}>Factura {factura.id}</h1>
          <p><strong>Cliente:</strong> {factura.cliente}</p>
          <p><strong>Monto:</strong> ${factura.monto}</p>
          <button
            className={Styles.facturaButton}
            onClick={() => handlePayment(factura.id, factura.monto)}
          >
            Pagar
          </button>

          {/* Mostrar el mensaje de pago dentro del contenedor de la factura */}
          {mensajeVisible[factura.id] && (
            <div className={`${Styles.mensajePago} ${mensajeVisible[factura.id] ? '' : Styles.fadeOut}`}>
              {mensajes[factura.id]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Facturas;
