"use client";
import React, { useEffect, useState } from 'react';
import styles from '../styles/convert.module.css';

function Convert() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('ARS');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("https://openexchangerates.org/api/latest.json?app_id=e2d3052c53fa4e0ca159bfc191e53c42");
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.statusText);
        }
        const data = await response.json();
        setRates(data.rates);
        setError(null); // Limpia el error si la solicitud fue exitosa
      } catch (error) {
        setError('No se pudo obtener la tasa de cambio.');
        console.error("Error al obtener datos:", error);
      }
    };
    fetchRates();
  }, []);

  const handleConvert = () => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const conversionRate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount(amount * conversionRate);
    }
  };

  return (
    <div className={styles.container}>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className={styles.currencyConverter}>
          <h1 className={styles.h1}>Conversor de Monedas</h1>
          <div className={styles.inputGroup}>
            <label htmlFor="fromCurrency">De:</label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={e => setFromCurrency(e.target.value)}
              className={styles.select}
            >
              {Object.keys(rates).map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="toCurrency">A:</label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={e => setToCurrency(e.target.value)}
              className={styles.select}
            >
              {Object.keys(rates).map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="amount">Cantidad:</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className={styles.inputNumber}
            />
          </div>
          <button onClick={handleConvert} className={styles.button}>Convertir</button>
          {convertedAmount !== null && (
            <div className={styles.result}>
              <p className={styles.resultP}> {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Convert;
