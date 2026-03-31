import { useAppStore } from "./stores/appStore";
import { Sidebar } from "./components/Layout/Sidebar";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { AIConfig } from "./components/AIConfig/AIConfig";
import { Channels } from "./components/Channels/Channels";
import { BRAND } from "./config/brand";

function App() {
  const activeTab = useAppStore((s) => s.activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "ai-config":
        return <AIConfig />;
      case "channels":
        return <Channels />;
      case "about":
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-2xl mx-auto mt-16 text-center">
      <div className="text-6xl mb-4">🦞</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {BRAND.displayName}
      </h1>
      <p className="text-gray-500 mb-6">v1.0.0</p>
      <p className="text-gray-600 mb-8">
        一键部署和管理 OpenClaw AI 助手，接入 {BRAND.name} API 中转站。
      </p>
      <div className="space-y-2 text-sm text-gray-500">
        <p>
          基于{" "}
          <a
            href="https://github.com/miaoxworld/openclaw-manager"
            className="text-brand-600 hover:underline"
            target="_blank"
          >
            openclaw-manager
          </a>{" "}
          (MIT License)
        </p>
        <p>
          <a
            href={BRAND.website}
            className="text-brand-600 hover:underline"
            target="_blank"
          >
            {BRAND.website}
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
