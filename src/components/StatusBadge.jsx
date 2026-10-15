const LABELS = {
  Active: 'Aktif',
  Inactive: 'Pasif',
};

function StatusBadge({ status }) {
  const key = status === 'Active' ? 'active' : 'inactive';
  return <span className={`badge badge-${key}`}>{LABELS[status] ?? status}</span>;
}

export default StatusBadge;
