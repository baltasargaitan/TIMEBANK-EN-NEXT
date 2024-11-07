
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Page() {
  const { logout } = useContext(AuthContext);

  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome to the protected page!</h1>
        <button onClick={logout}>Logout</button>
      </div>
    </ProtectedRoute>
  );
}
