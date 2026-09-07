import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import Layout from './components/Layout';
import InicioPage from './pages/InicioPage';
import ProductosPage from './pages/ProductosPage';

export default function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<InicioPage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}