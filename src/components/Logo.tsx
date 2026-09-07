import { config } from '../config';

interface LogoProps {
  tamaño?: number;
}

export default function Logo({ tamaño = 40 }: LogoProps) {
  return (
    <img
      className="logo-img"
      src={config.logo}
      alt={`Logo de ${config.negocioNombre}`}
      width={tamaño}
      height={tamaño}
    />
  );
}