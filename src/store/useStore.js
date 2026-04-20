import { create } from "zustand";

const STORAGE_KEY = "subscribe_subscriptions_v1";

const loadSubscriptions = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

const useStore = create((set) => ({
  subscriptions: loadSubscriptions(),
  addSubscription: (subscription) =>
    set((state) => ({
      subscriptions: [
        ...state.subscriptions,
        {
          ...subscription,
          id: generateId(),
          status: subscription.status || "active",
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  updateSubscription: (id, updates) =>
    set((state) => ({
      subscriptions: state.subscriptions.map((sub) =>
        sub.id === id ? { ...sub, ...updates } : sub
      ),
    })),
  cancelSubscription: (id) =>
    set((state) => ({
      subscriptions: state.subscriptions.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: "cancelled",
              cancelledAt: new Date().toISOString(),
            }
          : sub
      ),
    })),
}));

if (typeof window !== "undefined") {
  useStore.subscribe((state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.subscriptions));
  });
}

export default useStore;
