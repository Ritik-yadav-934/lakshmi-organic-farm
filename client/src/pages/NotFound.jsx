import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '120px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 40 }}>404</h1>
      <p style={{ marginTop: 10 }}>This page doesn&apos;t exist.</p>
      <Link className="btn btn-ghost" to="/" style={{ marginTop: 24, display: 'inline-flex' }}>
        Back to Home
      </Link>
    </div>
  );
}
