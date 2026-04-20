import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  category: "",
  cost: "",
  currency: "INR",
  billingCycle: "monthly",
  status: "active",
};

function AddEditModal({ isOpen, mode, initialData, onClose, onSave }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        name: initialData.name || "",
        category: initialData.category || "",
        cost: String(initialData.cost ?? ""),
        currency: "INR",
        billingCycle: initialData.billingCycle || "monthly",
        status: initialData.status || "active",
      });
    } else if (isOpen) {
      setForm(initialForm);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      cost: Number(form.cost),
      currency: "INR",
    };
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/30">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-100">
            {mode === "edit" ? "Edit Subscription" : "Add Subscription"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-slate-400">Name</span>
            <input
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-indigo-500 focus:ring-2"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-slate-400">Category</span>
            <input
              required
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-indigo-500 focus:ring-2"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-slate-400">Cost</span>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.cost}
              onChange={(e) => handleChange("cost", e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-indigo-500 focus:ring-2"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-slate-400">Billing Cycle</span>
            <select
              value={form.billingCycle}
              onChange={(e) => handleChange("billingCycle", e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-indigo-500 focus:ring-2"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annual</option>
            </select>
          </label>

          <div className="md:col-span-2 mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
            >
              {mode === "edit" ? "Save Changes" : "Add Subscription"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditModal;
