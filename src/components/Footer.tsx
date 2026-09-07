import { Link } from 'react-router-dom';
import { config } from '../config';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contenido">
        <div className="footer-marca">
          <Logo tamaño={44} />
          <div>
            <div className="footer-nombre">{config.negocioNombre}</div>
            <p>
              Productos artesanales, hechos con dedicación. Pedí fácil y
              te respondemos por WhatsApp.
            </p>
          </div>
        </div>

        <div className="footer-col">
          <h4>Navegación</h4>
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/productos">Ver todos</Link>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          {config.whatsappNumber ? (
            <a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          ) : (
            <span>WhatsApp</span>
          )}
          <span>Horario: L a V de 9 a 18 hs</span>
        </div>
      </div>
      <div className="footer-barra">
        © {new Date().getFullYear()} {config.negocioNombre} · Todos los
        derechos reservados
      </div>
    </footer>
  );
}