import { useMemo, useState } from "react";
import useStore from "../store/useStore";
import MetricCard from "../components/MetricCard";
import SubscriptionTable from "../components/SubscriptionTable";
import AddEditModal from "../components/AddEditModal";
import AnalyticsChart from "../components/AnalyticsChart";
import ArchiveSection from "../components/ArchiveSection";

const monthlyEquivalent = (sub) => {
  const cost = Number(sub.cost) || 0;
  if (sub.billingCycle === "quarterly") return cost / 3;
  if (sub.billingCycle === "annual") return cost / 12;
  return cost;
};

function Dashboard({ user, onLogout }) {
  const subscriptions = useStore((s) => s.subscriptions);
  const addSubscription = useStore((s) => s.addSubscription);
  const updateSubscription = useStore((s) => s.updateSubscription);
  const cancelSubscription = useStore((s) => s.cancelSubscription);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [editingSub, setEditingSub] = useState(null);

  const activeSubs = useMemo(
    () => subscriptions.filter((sub) => sub.status !== "cancelled"),
    [subscriptions]
  );

  const cancelledSubs = useMemo(
    () => subscriptions.filter((sub) => sub.status === "cancelled"),
    [subscriptions]
  );

  const calculations = useMemo(() => {
    const totalMonthlyBurn = activeSubs.reduce((sum, sub) => sum + monthlyEquivalent(sub), 0);
    const totalAnnualBurn = totalMonthlyBurn * 12;
    const totalSavings = cancelledSubs.reduce((sum, sub) => sum + monthlyEquivalent(sub) * 12, 0);

    return {
      totalMonthlyBurn,
      totalAnnualBurn,
      totalSavings,
    };
  }, [activeSubs, cancelledSubs]);

  const chartData = useMemo(() => {
    const map = activeSubs.reduce((acc, sub) => {
      const key = sub.category?.trim() || "Other";
      acc[key] = (acc[key] || 0) + monthlyEquivalent(sub);
      return acc;
    }, {});
    return Object.entries(map).map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }));
  }, [activeSubs]);

  const openAddModal = () => {
    setMode("add");
    setEditingSub(null);
    setIsModalOpen(true);
  };

  const openEditModal = (sub) => {
    setMode("edit");
    setEditingSub(sub);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSub(null);
  };

  const handleSave = (payload) => {
    if (mode === "edit" && editingSub) {
      updateSubscription(editingSub.id, payload);
    } else {
      addSubscription(payload);
    }
    closeModal();
  };

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-100">SubScribe</h1>
            <p className="text-slate-400">
              Track, optimize, and control your subscription burn.
              {user?.name ? ` Welcome, ${user.name}.` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openAddModal}
              className="rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              + Add Subscription
            </button>
            <button
              onClick={onLogout}
              className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            title="Monthly Burn"
            value={formatINR(calculations.totalMonthlyBurn)}
            accent="text-rose-300"
          />
          <MetricCard
            title="Annual Burn"
            value={formatINR(calculations.totalAnnualBurn)}
            accent="text-amber-300"
          />
          <MetricCard
            title="Savings Pot"
            value={formatINR(calculations.totalSavings)}
            accent="text-emerald-300"
          />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <SubscriptionTable
              subscriptions={activeSubs}
              onEdit={openEditModal}
              onCancel={cancelSubscription}
            />
          </div>
          <div className="xl:col-span-1">
            <AnalyticsChart data={chartData} />
          </div>
        </section>

        <section>
          <ArchiveSection subscriptions={cancelledSubs} />
        </section>
      </div>

      <AddEditModal
        isOpen={isModalOpen}
        mode={mode}
        initialData={editingSub}
        onClose={closeModal}
        onSave={handleSave}
      />
    </main>
  );
}

export default Dashboard;
