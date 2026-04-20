const cycleLabel = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  annual: "Annual",
};

function formatAmount(cost) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(cost) || 0);
}

function SubscriptionTable({ subscriptions, onEdit, onCancel }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
      <div className="border-b border-slate-800 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-100">Active Subscriptions</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Cost</th>
              <th className="px-5 py-3 font-medium">Cycle</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-5 py-8 text-center text-slate-500">
                  No active subscriptions.
                </td>
              </tr>
            ) : (
              subscriptions.map((sub) => (
                <tr key={sub.id} className="border-t border-slate-800 text-slate-200">
                  <td className="px-5 py-4 font-medium">{sub.name}</td>
                  <td className="px-5 py-4">{sub.category}</td>
                  <td className="px-5 py-4">{formatAmount(sub.cost)}</td>
                  <td className="px-5 py-4">{cycleLabel[sub.billingCycle] || sub.billingCycle}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(sub)}
                        className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300 transition hover:bg-indigo-500/20"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onCancel(sub.id)}
                        className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 transition hover:bg-rose-500/20"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubscriptionTable;
