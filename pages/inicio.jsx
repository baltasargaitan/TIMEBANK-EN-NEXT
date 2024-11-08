import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/Inicio.module.css';  // Asegúrate de que la ruta sea correcta
import { AuthContext } from '../components/AuthContext';  // Asegúrate de que el contexto esté correctamente importado

const Inicio = () => {
  const { username, isAuthenticated } = useContext(AuthContext);
  const [localUsername, setLocalUsername] = useState('Usuario');  // Estado para el nombre de usuario

  useEffect(() => {
    if (typeof window !== 'undefined') {  // Verificar si estamos en el cliente
      const storedUsername = localStorage.getItem('usuario');
      if (storedUsername) {
        setLocalUsername(storedUsername.split(': ')[1]);  // Extraer el nombre de usuario del localStorage
        console.log('Username en localStorage:', storedUsername);
      }
    }
  }, []);

  return (
    <div className={styles.landpageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.textContainer}>
          <h1>¡Hola, {isAuthenticated ? username : localUsername}!</h1>
          <p>Bienvenido a Time Bank, tu banco de confianza, donde hacemos que tus sueños se vuelvan realidad.</p>
        </div>
        <div className={styles.imageContainer}>
        <img src="/SEDE.webp" alt="Imagen de Sede" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
