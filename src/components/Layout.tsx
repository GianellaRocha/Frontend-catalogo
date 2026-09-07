import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { config } from '../config';
import Header from './Header';
import Footer from './Footer';
import CarritoDrawer from './CarritoDrawer';
import Notificacion from './Notificacion';
import WhatsAppFlotante from './WhatsAppFlotante';

export default function Layout() {
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  return (
    <div className="catalogo">
      <div
        className="fondo-fijo"
        style={{ backgroundImage: `url(${config.fondo})` }}
        aria-hidden="true"
      />

      <Header onAbrirCarrito={() => setCarritoAbierto(true)} />

      <main className="contenido-catalogo">
        <Outlet />
      </main>

      <Footer />
      <CarritoDrawer
        abierto={carritoAbierto}
        onCerrar={() => setCarritoAbierto(false)}
      />
      <Notificacion />
      <WhatsAppFlotante />
    </div>
  );
}