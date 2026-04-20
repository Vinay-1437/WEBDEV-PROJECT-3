function MetricCard({ title, value, accent }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-black/20">
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <p className={`mt-3 text-3xl font-bold tracking-tight ${accent}`}>{value}</p>
    </div>
  );
}

export default MetricCard;
