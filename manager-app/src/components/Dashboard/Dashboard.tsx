import { useState, useEffect } from "react";
import { BRAND, API_CONFIG } from "../../config/brand";
import { useAppStore } from "../../stores/appStore";

export function Dashboard() {
  const apiKey = useAppStore((s) => s.apiKey);
  const [openclawStatus, setOpenclawStatus] = useState<
    "checking" | "running" | "stopped" | "not_installed"
  >("checking");

  useEffect(() => {
    setTimeout(() => setOpenclawStatus("not_installed"), 1000);
  }, []);

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">仪表盘</h2>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatusCard
          title="OpenClaw 状态"
          value={
            openclawStatus === "checking"
              ? "检查中..."
              : openclawStatus === "running"
                ? "运行中"
                : openclawStatus === "stopped"
                  ? "已停止"
                  : "未安装"
          }
          color={
            openclawStatus === "running"
              ? "green"
              : openclawStatus === "checking"
                ? "yellow"
                : "red"
          }
          icon="🦞"
        />
        <StatusCard
          title="API 连接"
          value={apiKey ? "已配置" : "未配置"}
          color={apiKey ? "green" : "yellow"}
          icon="🔗"
        />
        <StatusCard title="活跃实例" value="0" color="blue" icon="📡" />
      </div>

      {/* Quick Actions */}
      {!apiKey && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">
            ⚡ 快速开始
          </h3>
          <p className="text-yellow-700 text-sm mb-3">
            请先配置 API Key 以开始使用。前往{" "}
            <a
              href={API_CONFIG.registrationUrl}
              target="_blank"
              className="underline font-medium"
            >
              {BRAND.name} 平台
            </a>{" "}
            注册账号并获取 API Key。
          </p>
          <button
            onClick={() => useAppStore.getState().setActiveTab("ai-config")}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700 transition-colors"
          >
            前往配置 →
          </button>
        </div>
      )}

      {openclawStatus === "not_installed" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-semibold text-blue-800 mb-2">
            📦 安装 OpenClaw
          </h3>
          <p className="text-blue-700 text-sm mb-3">
            检测到 OpenClaw 尚未安装。点击下方按钮一键安装。
          </p>
          <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm hover:bg-brand-700 transition-colors">
            一键安装 OpenClaw
          </button>
        </div>
      )}
    </div>
  );
}

function StatusCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: string;
  color: string;
  icon: string;
}) {
  const colorClasses: Record<string, string> = {
    green: "bg-green-50 text-green-700 border-green-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    red: "bg-red-50 text-red-700 border-red-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <div
      className={`rounded-xl border p-4 ${colorClasses[color] || colorClasses.blue}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium opacity-80">{title}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
