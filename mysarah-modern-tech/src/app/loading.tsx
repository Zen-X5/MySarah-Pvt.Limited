export default function Loading() {
  return (
    <main className="loading-shell" aria-live="polite" aria-busy="true">
      <div className="container loading-hero">
        <div className="loading-chip" />
        <div className="loading-line loading-line-lg" />
        <div className="loading-line loading-line-md" />
        <div className="loading-row">
          <div className="loading-card" />
          <div className="loading-card" />
        </div>
      </div>

      <div className="container loading-grid">
        <div className="loading-panel" />
        <div className="loading-panel" />
        <div className="loading-panel" />
      </div>
    </main>
  );
}