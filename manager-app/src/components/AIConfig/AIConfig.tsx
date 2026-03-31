import { useState } from "react";
import { useAppStore } from "../../stores/appStore";
import { API_CONFIG, SUPPORTED_MODELS, BRAND } from "../../config/brand";

export function AIConfig() {
  const { apiKey, setApiKey, baseUrl, setBaseUrl, selectedModel, setSelectedModel } =
    useAppStore();
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  const handleTestConnection = async () => {
    if (!apiKey) {
      setTestResult("请先输入 API Key");
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const response = await fetch(`${baseUrl}/models`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (response.ok) {
        setTestResult("✅ 连接成功！API Key 有效。");
      } else {
        setTestResult(`❌ 连接失败：HTTP ${response.status}`);
      }
    } catch {
      setTestResult("❌ 无法连接到 API 端点，请检查网络和地址。");
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">AI 配置</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        {/* API Endpoint */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            API 端点
          </label>
          <input
            type="url"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
          <p className="mt-1 text-xs text-gray-500">
            默认已接入 {BRAND.name} API 中转站，无需修改
          </p>
        </div>

        {/* API Key */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={API_CONFIG.apiKeyPlaceholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          />
          <p className="mt-1 text-xs text-gray-500">
            前往{" "}
            <a
              href={API_CONFIG.registrationUrl}
              target="_blank"
              className="text-brand-600 hover:underline"
            >
              {BRAND.name} 平台
            </a>{" "}
            获取 API Key（以 {API_CONFIG.apiKeyPrefix} 开头）
          </p>
        </div>

        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            默认模型
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white"
          >
            {SUPPORTED_MODELS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.provider})
              </option>
            ))}
          </select>
        </div>

        {/* Test Connection */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleTestConnection}
            disabled={testing}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            {testing ? "测试中..." : "测试连接"}
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
            保存配置
          </button>
        </div>

        {testResult && (
          <p className="text-sm mt-2 p-3 bg-gray-50 rounded-lg">
            {testResult}
          </p>
        )}
      </div>

      {/* Pricing Info */}
      <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-3">💰 模型价格参考</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {SUPPORTED_MODELS.slice(0, 6).map((model) => (
            <div
              key={model.id}
              className="flex justify-between py-1 border-b border-gray-100"
            >
              <span className="text-gray-600">{model.name}</span>
              <span className="text-gray-400 text-xs">查看价格 →</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          完整价格表：
          <a
            href={API_CONFIG.pricingUrl}
            target="_blank"
            className="text-brand-600 hover:underline"
          >
            {API_CONFIG.pricingUrl}
          </a>
        </p>
      </div>
    </div>
  );
}
