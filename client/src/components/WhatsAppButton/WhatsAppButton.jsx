import Button from '../Button/Button.jsx';
import { buildWhatsAppGenericLink } from '../../services/whatsapp.js';

/**
 * Generic "Order on WhatsApp" CTA. For a pre-filled cart/order message,
 * pass an explicit `href` (built via whatsapp.js buildWhatsAppOrderLink)
 * instead of relying on the default generic link.
 */
export default function WhatsAppButton({
  href,
  label = 'Order on WhatsApp',
  variant = 'primary',
  size,
}) {
  return (
    <Button as="a" href={href || buildWhatsAppGenericLink()} target="_blank" variant={variant} size={size}>
      {label}
    </Button>
  );
}
