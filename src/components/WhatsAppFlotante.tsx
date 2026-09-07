import { config } from '../config';

export default function WhatsAppFlotante() {
  if (!config.whatsappNumber) return null;

  return (
    <a
      className="wa-flotante"
      href={`https://wa.me/${config.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2.2 22l5.1-1.3A10 10 0 1 0 12 2zm5.6 14.2c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1a14 14 0 0 1-1.6-.6c-2.9-1.2-4.7-4.2-4.9-4.4-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.7.8 1.9.1.1.1.3 0 .5-.1.2-.1.3-.3.5l-.5.6c-.2.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.7 0 .2-.1.8-.9 1-1.2.2-.3.4-.3.7-.2.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.2.1.6-.1 1z" />
      </svg>
    </a>
  );
}