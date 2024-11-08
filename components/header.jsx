'use client'
import React, { useState, useEffect, useContext } from 'react';
import Styles from '../styles/Header.module.css';
import RelojLogo from './RelojLogo';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../components/AuthContext';

const Header = () => {
  const { logout, username, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();


  const [localUsername, setLocalUsername] = useState('Usuario');

 
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

 
  useEffect(() => {
    if (typeof window !== 'undefined') {  
      const storedUsername = localStorage.getItem('usuario');
      if (storedUsername) {
        setLocalUsername(storedUsername.split(': ')[1]);  
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
