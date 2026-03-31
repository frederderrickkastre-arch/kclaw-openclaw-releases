import { useAppStore } from "../../stores/appStore";
import { BRAND } from "../../config/brand";

const menuItems = [
  { id: "dashboard" as const, label: "仪表盘", icon: "📊" },
  { id: "ai-config" as const, label: "AI 配置", icon: "🤖" },
  { id: "channels" as const, label: "消息渠道", icon: "📱" },
  { id: "about" as const, label: "关于", icon: "ℹ️" },
];

export function Sidebar() {
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);

  return (
    <div className="w-60 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦞</span>
          <div>
            <h1 className="font-bold text-gray-900 text-sm">
              {BRAND.name}
            </h1>
            <p className="text-xs text-gray-500">OpenClaw Manager</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeTab === item.id
                ? "bg-brand-50 text-brand-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">v1.0.0</p>
      </div>
    </div>
  );
}
