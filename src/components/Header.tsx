import { Link, NavLink } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { config } from '../config';
import Logo from './Logo';

interface HeaderProps {
  onAbrirCarrito: () => void;
}

export default function Header({ onAbrirCarrito }: HeaderProps) {
  const { cantidadTotal } = useCarrito();

  return (
    <header className="header">
      <div className="header-contenido">
        <Link to="/" className="marca">
          <Logo />
          <span className="marca-nombre">{config.negocioNombre}</span>
        </Link>

        <nav className="nav-principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'activo' : '')}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/productos"
            className={({ isActive }) => (isActive ? 'activo' : '')}
          >
            Productos
          </NavLink>
        </nav>

        <button
          type="button"
          className="btn-carrito"
          onClick={onAbrirCarrito}
          aria-label="Abrir carrito"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M3 4h2.5l2 12h11l2-8H6.8" />
            <circle cx="9.5" cy="19" r="1.4" />
            <circle cx="17" cy="19" r="1.4" />
          </svg>
          <span className="btn-carrito-texto">Carrito</span>
          {cantidadTotal > 0 && (
            <span className="badge-carrito">{cantidadTotal}</span>
          )}
        </button>
      </div>
    </header>
  );
}