'use client'
import React, { useState, useEffect, useContext } from 'react';
import styles from '../styles/Inicio.module.css';  // Ajusta la ruta de tus estilos
import { AuthContext } from '../components/AuthContext';  // Asegúrate de que el contexto esté correctamente importado

const Inicio = () => {
  const { username, isAuthenticated } = useContext(AuthContext);  // Accede al contexto para obtener el nombre de usuario
  const [localUsername, setLocalUsername] = useState('Usuario');  // Estado para almacenar el nombre de usuario

  // Usar useEffect para acceder a localStorage en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {  // Verificar si estamos en el cliente
      const storedUsername = localStorage.getItem('usuario');
      if (storedUsername) {
        setLocalUsername(storedUsername.split(': ')[1]);  // Establecer el nombre de usuario en el estado
        console.log('Username en localStorage:', storedUsername);  // Verifica si el nombre de usuario está en localStorage
      }
    }
  }, []);

  return (
    <div className={styles.landpageContainer}>
      <h1>¡Hola, {isAuthenticated ? username : localUsername}!</h1>
      <p>Bienvenido a Time Bank.</p>
    </div>
  );
};

export default Inicio;
