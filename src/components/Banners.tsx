import { useCallback, useEffect, useState } from 'react';
import { config } from '../config';

export default function Banners() {
  const total = config.banners.length;
  const [indice, setIndice] = useState(0);

  const irAl = useCallback(
    (i: number) => setIndice(((i % total) + total) % total),
    [total],
  );

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => irAl(indice + 1), 5000);
    return () => clearInterval(timer);
  }, [indice, total, irAl]);

  if (total === 0) return null;

  return (
    <section className="banners" aria-roledescription="carrusel">
      <div
        className="banners-vista"
        style={{ transform: `translateX(-${indice * 100}%)` }}
      >
        {config.banners.map((src) => (
          <img
            key={src}
            className="banner-img"
            src={src}
            alt="Promoción Antü"
            loading="lazy"
          />
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className="banner-flecha izq"
            onClick={() => irAl(indice - 1)}
            aria-label="Banner anterior"
          >
            {'\u2039'}
          </button>
          <button
            type="button"
            className="banner-flecha der"
            onClick={() => irAl(indice + 1)}
            aria-label="Banner siguiente"
          >
            {'\u203a'}
          </button>
          <div className="banner-puntos">
            {config.banners.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`banner-punto ${i === indice ? 'activo' : ''}`}
                onClick={() => irAl(i)}
                aria-label={`Ir al banner ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}