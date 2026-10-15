import { useEffect } from 'react';

// Kısa süreli bildirim (başarı / hata). 4 saniye sonra kendiliğinden kapanır.
function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`} role="alert">
      <span>{toast.message}</span>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Kapat">
        ×
      </button>
    </div>
  );
}

export default Toast;
