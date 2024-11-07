'use client';

import { useState } from 'react';
import styles from '../styles/Tarjetas.module.css';

const Card = ({ tier, name, number, onCardClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);

  return (
    <div
      className={`${styles.card} ${styles[tier]} ${isFlipped ? styles.flipped : ''}`}
      onClick={onCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{name}</h2>
        <p className={styles.cardNumber}>{number}</p>
        <p className={styles.cardTier}>{tier.toUpperCase()}</p>
      </div>
      <div className={styles.cardBack}>
        <div className={styles.cvv}>
          <p>CVV:153</p>
        </div>
        <div className={styles.lineaNegra}></div>
      </div>
    </div>
  );
};

const Tarjetas = () => {
  const nombreUsuario =
    typeof window !== 'undefined' && localStorage.getItem('usuario')
      ? localStorage.getItem('usuario').split(': ')[1]
      : 'Usuario';
  const [mensaje, setMensaje] = useState('');

  return (
    <div className={styles.App}>
      {mensaje && <p>{mensaje}</p>}
      <Card tier="classic" name={nombreUsuario} number="1234 5678 9012 3456" />
      <Card tier="silver" name={nombreUsuario} number="1234 5678 6292 7140" />
      <Card tier="gold" name={nombreUsuario} number="5678 9012 3456 1234" />
      <Card tier="platinum" name={nombreUsuario} number="8765 4321 0987 6543" />
      <Card tier="black" name={nombreUsuario} number="1122 3344 5566 7788" />
    </div>
  );
};

export default Tarjetas;
