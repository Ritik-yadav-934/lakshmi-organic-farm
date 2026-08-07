export function formatPrice(value) {
  return `₹${Number(value).toLocaleString('en-IN')}`;
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
