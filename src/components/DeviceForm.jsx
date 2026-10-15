import { useState } from 'react';
import Spinner from './Spinner';

const CATEGORIES = ['Sensor', 'Gateway', 'Controller', 'Camera', 'Other'];

const EMPTY_FORM = {
  name: '',
  category: 'Sensor',
  status: 'Active',
  value: '',
};

function DeviceForm({ onAdd, submitting }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validate = () => {
    if (!form.name.trim()) return 'Cihaz adı boş bırakılamaz.';
    if (!form.category.trim()) return 'Kategori seçilmelidir.';
    if (form.value === '' || Number.isNaN(Number(form.value))) return 'Geçerli bir ölçüm değeri girin.';
    if (Number(form.value) < 0) return 'Okuma değeri negatif olamaz.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    const success = await onAdd({
      name: form.name.trim(),
      category: form.category,
      status: form.status,
      value: Number(form.value),
    });

    // Form yalnızca kayıt başarılı olursa temizlenir
    if (success) {
      setForm(EMPTY_FORM);
    }
  };

  return (
    <form className="card device-form" onSubmit={handleSubmit} noValidate>
      <h2>Yeni Cihaz / Okuma Ekle</h2>

      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}

      <div className="form-grid">
        <label>
          Cihaz adı
          <input
            type="text"
            name="name"
            placeholder="ör. Temperature Sensor"
            value={form.name}
            onChange={handleChange}
            disabled={submitting}
            maxLength={100}
          />
        </label>

        <label>
          Kategori
          <select name="category" value={form.category} onChange={handleChange} disabled={submitting}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          Durum
          <select name="status" value={form.status} onChange={handleChange} disabled={submitting}>
            <option value="Active">Aktif</option>
            <option value="Inactive">Pasif</option>
          </select>
        </label>

        <label>
          Ölçüm değeri
          <input
            type="number"
            name="value"
            placeholder="ör. 24.5"
            step="any"
            value={form.value}
            onChange={handleChange}
            disabled={submitting}
            className={error.includes('negatif') ? 'input-invalid' : ''}
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? <Spinner size="sm" label="Ekleniyor..." /> : 'Ekle'}
      </button>
    </form>
  );
}

export default DeviceForm;
