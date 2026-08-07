const WHATSAPP_NUMBER = '918294855440'; // +91 82948 55440, no leading '+' for wa.me links

/**
 * Builds a wa.me deep link with a pre-filled order message.
 * cartLines: array of plain-text lines, already formatted by the caller
 * (kept generic so both the product cart and the subscription builder can reuse it).
 */
export function buildWhatsAppOrderLink({ intro, lines, total, outro }) {
  const parts = [intro, '', ...lines];
  if (total !== undefined) {
    parts.push('', `Total: ₹${total}`);
  }
  if (outro) {
    parts.push('', outro);
  }
  const message = encodeURIComponent(parts.join('\n'));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function buildWhatsAppGenericLink(text = "Hi Lakshmi Organic Farm! I'd like to place an order.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export { WHATSAPP_NUMBER };
