function formatAmount(cost) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(cost) || 0);
}

function ArchiveSection({ subscriptions }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70">
      <div className="border-b border-slate-800 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-100">Archived (Cancelled)</h2>
      </div>
      <div className="divide-y divide-slate-800">
        {subscriptions.length === 0 ? (
          <p className="px-5 py-6 text-sm text-slate-500">No cancelled subscriptions.</p>
        ) : (
          subscriptions.map((sub) => (
            <div key={sub.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
              <div>
                <p className="font-medium text-slate-200">{sub.name}</p>
                <p className="text-sm text-slate-400">
                  {sub.category} • {sub.billingCycle}
                </p>
              </div>
              <p className="text-sm font-medium text-emerald-300">
                {formatAmount(sub.cost)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ArchiveSection;
