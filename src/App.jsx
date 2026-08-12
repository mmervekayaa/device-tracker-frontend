import { useState, useEffect } from 'react';
import DeviceForm from './components/DeviceForm';
import DeviceList from './components/DeviceList';
import { getDevices, addDevice, deleteDevice } from './services/api';

function App() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchDevices = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await getDevices();
      setDevices(response.data);
    } catch (err) {
      setErrorMsg('Veriler alınamadı. Backend uyanıyor olabilir, birkaç saniye sonra "Yenile" butonuna tekrar basın.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleAdd = async (device) => {
    setSubmitting(true);
    try {
      await addDevice(device);
      setSuccessMsg('✅ Cihaz başarıyla eklendi!');
      await fetchDevices();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg('Cihaz eklenemedi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Bu kaydı silmek istediğinize emin misiniz?');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteDevice(id);
      await fetchDevices();
    } catch (err) {
      setErrorMsg('Silme işlemi başarısız oldu.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h1>📟 Device Tracker</h1>

      <button onClick={fetchDevices}>🔄 Yenile</button>

      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

      <DeviceForm onAdd={handleAdd} submitting={submitting} />
      <DeviceList devices={devices} onDelete={handleDelete} loading={loading} deletingId={deletingId} />
    </div>
  );
}

export default App;