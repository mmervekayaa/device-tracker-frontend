import { useState } from 'react';

function DeviceForm({ onAdd }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const numericValue = parseFloat(value);
    if (numericValue < 0) {
      setError('Okuma değeri negatif olamaz.');
      return;
    }

    setError('');
    onAdd({ name, location, value: numericValue });

    setName('');
    setLocation('');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Yeni Cihaz / Okuma Ekle</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Cihaz adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Konum"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Değer"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <button type="submit">Ekle</button>
    </form>
  );
}

export default DeviceForm;