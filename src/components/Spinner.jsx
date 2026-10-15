function Spinner({ size = 'md', label }) {
  return (
    <span className="spinner-wrap" role="status" aria-live="polite">
      <span className={`spinner spinner-${size}`} aria-hidden="true" />
      {label && <span className="spinner-label">{label}</span>}
    </span>
  );
}

export default Spinner;
