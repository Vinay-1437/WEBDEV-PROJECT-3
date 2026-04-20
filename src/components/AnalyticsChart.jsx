import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899", "#06b6d4", "#a855f7", "#ef4444"];

function formatValue(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

function AnalyticsChart({ data }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <h2 className="mb-4 text-lg font-semibold text-slate-100">Category Breakdown (Monthly)</h2>
      <div className="h-72 w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-slate-500">
            Add active subscriptions to view chart.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={110} label>
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${formatValue(value)}`, "Monthly"]}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#e2e8f0",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default AnalyticsChart;
