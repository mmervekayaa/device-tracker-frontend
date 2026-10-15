import Spinner from './Spinner';
import StatusBadge from './StatusBadge';

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString('tr-TR');
};

function DeviceList({ devices, onDelete, loading, deletingId }) {
  if (loading) {
    return (
      <div className="card center">
        <Spinner label="Yükleniyor... (Backend uykudaysa ilk istek ~1 dakika sürebilir)" />
      </div>
    );
  }

  if (devices.length === 0) {
    return <div className="card center muted">Henüz kayıt yok.</div>;
  }

  return (
    <div className="card">
      <h2>Cihaz Okumaları ({devices.length})</h2>
      <div className="table-scroll">
        <table className="device-table">
          <thead>
            <tr>
              <th>Ad</th>
              <th>Kategori</th>
              <th>Durum</th>
              <th className="num">Değer</th>
              <th>Son Güncelleme</th>
              <th aria-label="İşlemler" />
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id}>
                <td>{device.name}</td>
                <td>{device.category}</td>
                <td>
                  <StatusBadge status={device.status} />
                </td>
                <td className="num">{device.value}</td>
                <td>{formatDate(device.lastUpdated)}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(device.id)}
                    disabled={deletingId === device.id}
                  >
                    {deletingId === device.id ? <Spinner size="sm" label="Siliniyor..." /> : 'Sil'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeviceList;
