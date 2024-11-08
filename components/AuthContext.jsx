import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('Usuario');
  const router = useRouter();

  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);

    
      if (authStatus) {
        const storedUsername = localStorage.getItem('usuario');
        if (storedUsername) {
          setUsername(storedUsername.split(': ')[1]);
        }
      }

     
      if (!authStatus && router.pathname !== '/login' && router.pathname !== '/signup') {
        router.push('/login');
      }
    }
  }, [router.pathname]);


  const login = (user) => {
    setIsAuthenticated(true);
    setUsername(user); 
    if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('usuario', `Usuario: ${user}`); 
    }
    router.push('/inicio');  
};


  
  const logout = () => {
    setIsAuthenticated(false);
    setUsername('Usuario'); 
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('usuario'); 
    }
    router.push('/login'); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
