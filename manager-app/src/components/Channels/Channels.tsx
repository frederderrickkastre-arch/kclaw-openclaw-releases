const CHANNELS = [
  {
    id: "telegram",
    name: "Telegram",
    icon: "✈️",
    description: "接入 Telegram Bot，7×24 小时在线",
    fields: ["Bot Token"],
  },
  {
    id: "feishu",
    name: "飞书",
    icon: "🐦",
    description: "接入飞书机器人，企业内部使用",
    fields: ["App ID", "App Secret", "Verification Token"],
  },
  {
    id: "discord",
    name: "Discord",
    icon: "🎮",
    description: "接入 Discord Bot",
    fields: ["Bot Token", "Application ID"],
  },
  {
    id: "wechat",
    name: "企业微信",
    icon: "💬",
    description: "接入企业微信自建应用机器人",
    fields: ["Corp ID", "Agent ID", "Secret"],
  },
  {
    id: "slack",
    name: "Slack",
    icon: "📢",
    description: "接入 Slack Bot",
    fields: ["Bot Token", "Signing Secret"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "📱",
    description: "接入 WhatsApp Business API",
    fields: ["Phone Number ID", "Access Token"],
  },
];

export function Channels() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">消息渠道</h2>

      <div className="grid grid-cols-2 gap-4">
        {CHANNELS.map((channel) => (
          <div
            key={channel.id}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-brand-300 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{channel.icon}</span>
              <h3 className="font-semibold text-gray-900">{channel.name}</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">{channel.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                需要 {channel.fields.length} 个配置项
              </span>
              <button className="text-xs text-brand-600 hover:text-brand-700 font-medium">
                配置 →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
