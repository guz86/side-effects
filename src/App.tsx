import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login/Login';
import { AuthProvider } from './store/AuthContext';
import Main from './components/Main/Main';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
