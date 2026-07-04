import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, login, logout } = useAuth();
  const [checkingAuth, setCheckingAuth] = React.useState(true);
  const token = sessionStorage.getItem('token');

  React.useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setCheckingAuth(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
          login(data.user);
        } else {
          logout();
          sessionStorage.removeItem('token');
        }
      } catch (err) {
        logout();
        sessionStorage.removeItem('token');
      } finally {
        setCheckingAuth(false);
      }
    };

    if (!user) {
      verifyToken();
    } else {
      setCheckingAuth(false);
    }
  }, [token, user, login, logout]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white font-semibold">
        Verifying Sessions , Please Wait.
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === "admin" && user.role !== "admin") {
    return <Navigate to="/employee-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;