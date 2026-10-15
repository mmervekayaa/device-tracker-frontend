import { useCallback, useEffect, useState } from 'react';
import DeviceForm from '../components/DeviceForm';
import DeviceList from '../components/DeviceList';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';
import { addDevice, deleteDevice, getDevices } from '../services/api';

function DevicesPage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const showToast = (type, message) => setToast({ type, message, id: Date.now() });
  const closeToast = useCallback(() => setToast(null), []);

  const fetchDevices = useCallback(async ({ silent = false } = {}) => {
    if (silent) setRefreshing(true);
    else setLoading(true);
    try {
      const data = await getDevices();
      setDevices(data);
      setBannerError('');
    } catch (err) {
      setBannerError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const handleAdd = async (device) => {
    setSubmitting(true);
    try {
      await addDevice(device);
      showToast('success', 'Cihaz başarıyla eklendi.');
      await fetchDevices({ silent: true });
      return true;
    } catch (err) {
      showToast('error', err.message);
      return false;
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
      showToast('success', 'Kayıt silindi.');
      await fetchDevices({ silent: true });
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="toolbar">
        <button
          type="button"
          className="btn"
          onClick={() => fetchDevices({ silent: devices.length > 0 })}
          disabled={loading || refreshing}
        >
          {refreshing ? <Spinner size="sm" label="Yenileniyor..." /> : '🔄 Yenile'}
        </button>
      </div>

      {bannerError && (
        <div className="banner banner-error" role="alert">
          <span>{bannerError}</span>
          <button type="button" className="btn btn-small" onClick={() => fetchDevices()}>
            Tekrar dene
          </button>
        </div>
      )}

      <DeviceForm onAdd={handleAdd} submitting={submitting} />
      <DeviceList devices={devices} onDelete={handleDelete} loading={loading} deletingId={deletingId} />

      <Toast key={toast?.id} toast={toast} onClose={closeToast} />
    </>
  );
}

export default DevicesPage;
