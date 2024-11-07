'use client'
import React, { useState, useEffect, useContext } from 'react';
import Styles from '../styles/Header.module.css';
import RelojLogo from './RelojLogo';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../components/AuthContext';

const Header = () => {
  const { logout, username, isAuthenticated } = useContext(AuthContext);  // Acceder a la función logout y al username desde el contexto
  const router = useRouter();

  // Estado para almacenar el nombre de usuario
  const [localUsername, setLocalUsername] = useState('Usuario');

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Usar useEffect para acceder a localStorage en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {  // Verificar que estamos en el cliente
      const storedUsername = localStorage.getItem('usuario');
      if (storedUsername) {
        setLocalUsername(storedUsername.split(': ')[1]);  // Obtener el nombre de usuario de localStorage
      }
    }
  }, []);

  return (
    <div className={Styles.header}>
      <h1>Hola, {isAuthenticated ? username : localUsername} bienvenido</h1>
      <button className={Styles.button} onClick={handleLogout}>Cerrar sesión</button>
      <RelojLogo />
    </div>
  );
};

export default Header;
