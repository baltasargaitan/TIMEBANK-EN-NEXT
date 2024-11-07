// pages/cuentas.jsx
'use client'
import { useDinero } from '../components/DineroContext';  // Importar el hook del contexto
import styles from '../styles/Transferencias.module.css';  // Usar el mismo estilo o crear uno nuevo

const Cuentas = () => {
  const { saldo } = useDinero();  // Acceder al saldo desde el contexto

  return (
    <div className={styles.cuentas}>
      <h1>Saldo en Cuenta en Pesos</h1>
      <div className={styles.saldo}>
        <p><strong>Saldo disponible:</strong> ${saldo}</p>
      </div>
    </div>
  );
};

export default Cuentas;
