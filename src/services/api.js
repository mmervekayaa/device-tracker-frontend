import axios from 'axios';

const DEFAULT_API_URL = 'http://localhost:5109';

// Ortam değişkenindeki adresi normalize eder:
// sondaki "/" karakterlerini ve yanlışlıkla eklenmiş "/api" son ekini temizler.
export const normalizeBaseUrl = (rawUrl) => {
  let url = (rawUrl || DEFAULT_API_URL).trim().replace(/\/+$/, '');
  if (url.toLowerCase().endsWith('/api')) {
    url = url.slice(0, -4);
  }
  return `${url}/api`;
};

const api = axios.create({
  baseURL: normalizeBaseUrl(import.meta.env.VITE_API_URL),
  headers: { 'Content-Type': 'application/json' },
  timeout: 70000, // Render cold start ~1 dakika sürebilir
});

// Backend ve ağ hatalarını kullanıcının anlayacağı mesajlara çevirir.
export const getErrorMessage = (error) => {
  if (!error?.response) {
    if (error?.code === 'ECONNABORTED') {
      return 'Sunucu zamanında yanıt vermedi. Backend uyanıyor olabilir, lütfen tekrar deneyin.';
    }
    return 'Sunucuya ulaşılamadı. Backend uyanıyor olabilir, birkaç saniye sonra tekrar deneyin.';
  }

  const { status, data } = error.response;

  if (status === 400) {
    if (data?.error) return data.error;
    if (data?.errors) {
      const first = Object.values(data.errors).flat()[0];
      if (first) return first;
    }
    return 'Gönderilen bilgiler geçersiz.';
  }
  if (status === 404) return data?.error || 'Kayıt bulunamadı.';
  if (status >= 500) return 'Sunucuda beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.';

  return `Beklenmeyen bir hata oluştu (HTTP ${status}).`;
};

// Tüm çağrılar tek merkezden yönetilir; hata durumunda kullanıcı dostu
// mesajla birlikte yeniden fırlatılır.
const request = async (call) => {
  try {
    const response = await call();
    return response.data;
  } catch (error) {
    const wrapped = new Error(getErrorMessage(error));
    wrapped.status = error?.response?.status;
    wrapped.cause = error;
    throw wrapped;
  }
};

export const getDevices = () => request(() => api.get('/devices'));

export const getDevice = (id) => request(() => api.get(`/devices/${id}`));

export const addDevice = (device) => request(() => api.post('/devices', device));

export const updateDevice = (id, device) => request(() => api.put(`/devices/${id}`, device));

export const deleteDevice = (id) => request(() => api.delete(`/devices/${id}`));

export default api;
