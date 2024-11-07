import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('Usuario');
  const router = useRouter();

  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);

      // Si el usuario está autenticado, establecer el nombre de usuario
      if (authStatus) {
        const storedUsername = localStorage.getItem('usuario');
        if (storedUsername) {
          setUsername(storedUsername.split(': ')[1]);
        }
      }

      // Redirigir si no está autenticado y trata de acceder a una página privada
      if (!authStatus && router.pathname !== '/login' && router.pathname !== '/signup') {
        router.push('/login');
      }
    }
  }, [router.pathname]);

  // Función para iniciar sesión
  const login = (user) => {
    setIsAuthenticated(true);
    setUsername(user); // Guardar el nombre de usuario en el estado del contexto
    if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('usuario', `Usuario: ${user}`); // Guardar el nombre de usuario en localStorage
    }
    router.push('/inicio');  // Redirigir a la página de inicio después de login
};


  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setUsername('Usuario'); // Resetear nombre de usuario al cerrar sesión
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('usuario'); // Eliminar el nombre de usuario de localStorage
    }
    router.push('/login');  // Redirigir al login al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
