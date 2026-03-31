import { create } from "zustand";

type Tab = "dashboard" | "instances" | "ai-config" | "channels" | "about";

interface AppState {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  baseUrl: string;
  setBaseUrl: (url: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: "dashboard",
  setActiveTab: (tab) => set({ activeTab: tab }),
  apiKey: "",
  setApiKey: (apiKey) => set({ apiKey }),
  baseUrl: "https://www.eden321.com/v1",
  setBaseUrl: (baseUrl) => set({ baseUrl }),
  selectedModel: "gpt-5.4-mini",
  setSelectedModel: (selectedModel) => set({ selectedModel }),
}));
