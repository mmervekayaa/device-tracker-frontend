import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="card center">
      <h2>Sayfa bulunamadı</h2>
      <p className="muted">Aradığınız sayfa mevcut değil.</p>
      <Link className="btn" to="/">
        Cihaz listesine dön
      </Link>
    </div>
  );
}

export default NotFoundPage;
