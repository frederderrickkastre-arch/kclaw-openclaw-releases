# KClaw OpenClaw Manager

一键部署 OpenClaw AI 助手，默认接入 KClaw API 中转站。

## 快速开始

### Linux 服务器（推荐）

```bash
curl -fsSL https://raw.githubusercontent.com/frederderrickkastre-arch/kclaw-openclaw-releases/main/install.sh | sudo bash
```

### Windows

从 [Releases](https://github.com/frederderrickkastre-arch/kclaw-openclaw-releases/releases/latest) 下载 `kclaw-manager-win-x64.zip`，解压后运行 `kclaw-manager.exe`。

### macOS

从 [Releases](https://github.com/frederderrickkastre-arch/kclaw-openclaw-releases/releases/latest) 下载 `kclaw-manager-mac-universal.dmg`，打开并拖入应用程序文件夹。

## 安装后

1. 打开管理页面（Linux 服务器：`http://你的IP:51943`，桌面版：自动打开）
2. 输入你的 KClaw API Key（以 `sk-` 开头）
3. 创建 OpenClaw 实例，选择消息渠道（飞书、Telegram 等）
4. 开始使用

## 默认账号密码（Linux 服务器）

| 项目 | 值 |
|------|------|
| 用户名 | `kclaw` |
| 密码 | `kclaw` |

> 首次登录后请立即修改密码：`sudo kclaw-chpasswd`

## 支持的 AI 模型

通过 KClaw API 中转站，支持以下模型：

- OpenAI GPT-5.4 / GPT-5.4 Mini / GPT-5.4 Nano / GPT-5.4 Pro
- Anthropic Claude Sonnet 4.6 / Claude Opus 4.6
- Google Gemini 3.1 Pro / Gemini 3.1 Flash Lite
- MiniMax M2.7
- 共 594+ 模型持续更新中...

## 支持的消息渠道

- Telegram Bot
- 飞书机器人
- Discord Bot
- 微信（企业微信）
- Slack
- WhatsApp

## 服务管理（Linux）

```bash
# 查看状态
sudo systemctl status kclaw-manager

# 重启服务
sudo systemctl restart kclaw-manager

# 查看日志
sudo tail -f /var/log/kclaw-manager.log

# 修改访问密码
sudo kclaw-chpasswd

# 卸载
curl -fsSL https://raw.githubusercontent.com/frederderrickkastre-arch/kclaw-openclaw-releases/main/uninstall.sh | sudo bash
```

## 技术支持

- Issues: https://github.com/frederderrickkastre-arch/kclaw-openclaw-releases/issues
- API 文档: https://www.eden321.com/docs

## 许可证

基于 [miaoxworld/openclaw-manager](https://github.com/miaoxworld/openclaw-manager)（MIT License）定制。
