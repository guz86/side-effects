import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../store/AuthContext';

const Main = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <h1>Main</h1>
      <button onClick={logoutHandler}>LogOut</button>
    </div>
  );
};

export default Main;
