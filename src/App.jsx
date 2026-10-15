import { HashRouter, Route, Routes } from 'react-router-dom';
import DevicesPage from './pages/DevicesPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/App.css';

// GitHub Pages statik hosting olduğu için HashRouter kullanılır;
// sayfa yenilemelerinde 404 yönlendirme sorunu oluşmaz.
function App() {
  return (
    <HashRouter>
      <div className="app">
        <header className="app-header">
          <h1>📟 Device Tracker</h1>
          <p className="muted">Cihaz ve sensör okumalarını takip edin</p>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<DevicesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
