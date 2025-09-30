import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Splash.css';

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navegar al home después de 2 segundos
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash">
      <div className="splash-content">
        <div className="logo">✓</div>
        <h1>Mi Lista de Tareas</h1>
        <p>Organizate mejor</p>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Splash;