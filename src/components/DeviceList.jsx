function DeviceList({ devices, onDelete, loading, deletingId }) {
  if (loading) {
    return <p>Yükleniyor... (Backend uykuda olabilir, ilk istek ~1 dakika sürebilir)</p>;
  }

  if (devices.length === 0) {
    return <p>Henüz kayıt yok.</p>;
  }

  return (
    <div>
      <h2>Cihaz Okumaları</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Konum</th>
            <th>Değer</th>
            <th>Tarih</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td>{device.location}</td>
              <td>{device.value}</td>
              <td>{new Date(device.createdAt).toLocaleString('tr-TR')}</td>
              <td>
                <button
                  onClick={() => onDelete(device.id)}
                  disabled={deletingId === device.id}
                >
                  {deletingId === device.id ? 'Siliniyor...' : 'Sil'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeviceList;