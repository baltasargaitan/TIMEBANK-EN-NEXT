"use client"; 

import React from 'react';
import styles from '../styles/Footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2024 Time Bank. Todos los derechos reservados.</p>

      </div>
    </footer>
  );
};

export default Footer;
