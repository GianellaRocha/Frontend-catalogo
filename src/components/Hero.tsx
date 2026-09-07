import { Link } from 'react-router-dom';
import { config } from '../config';

export default function Hero() {
  return (
    <section className="hero">
      <div
        className="hero-fondo"
        style={{ backgroundImage: `url(${config.fondo})` }}
        aria-hidden="true"
      />
      <div className="hero-inner">
        <span className="hero-etiqueta">
          Catálogo {config.negocioNombre}
        </span>
        <h1>
          Productos artesanales,
          <br />
          hechos con amor
        </h1>
        <p>
          Descubrí nuestra colección, elegí tus favoritos y pedí en un
          click. Te confirmamos por WhatsApp.
        </p>
        <div className="hero-acciones">
          <Link to="/productos" className="btn btn-primary btn-grande">
            Ver catálogo
          </Link>
          <a
            className="btn btn-ligero btn-grande"
            href={`https://wa.me/${config.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}