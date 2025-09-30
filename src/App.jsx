import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Splash from './pages/Splash';
import Home from './pages/Home';
import './App.css';

function App() {
  useEffect(() => {
    // Registrar Service Worker (solo en cliente)
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registrado:', registration);
        })
        .catch((error) => {
          console.log('Error al registrar SW:', error);
        });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
