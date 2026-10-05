function ApiStatus({ loading, error }) {
  const status = loading ? "checking" : error ? "offline" : "online";
  const label = loading ? "Checking API" : error ? "API unavailable" : "API available";

  return (
    <div className="system-status" role="status" aria-live="polite">
      <span className={`status-dot status-dot-${status}`} aria-hidden="true" />
      <div>
        <strong>{label}</strong>
        <small>{loading ? "Contacting Spring Boot API" : error ? "Operational data could not be loaded" : "Spring Boot REST API responded"}</small>
      </div>
    </div>
  );
}

export default ApiStatus;