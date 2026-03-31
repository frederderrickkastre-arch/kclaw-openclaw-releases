# KClaw OpenClaw 快速上手指南

## 概述

KClaw OpenClaw Manager 帮助你一键部署 OpenClaw AI 助手，默认接入 KClaw API 中转站，支持 GPT-5、Claude、Gemini、DeepSeek 等 100+ 模型。

---

## 1. Linux 服务器部署（推荐）

### 最低配置要求

| 项目 | 要求 |
|------|------|
| CPU | 1 核+ |
| 内存 | 2GB+（推荐 4GB） |
| 磁盘 | 20GB+ |
| 系统 | Ubuntu 16.04+ / Debian 9+ / CentOS 7+ |
| 架构 | x86_64 或 ARM64 |

### 一键安装

使用 SSH 连接到你的服务器，执行以下命令：

```bash
curl -fsSL https://raw.githubusercontent.com/frederderrickkastre-arch/kclaw-openclaw-releases/main/install.sh | sudo bash
```

脚本会自动完成：
- 检测操作系统和 CPU 架构
- 安装必要依赖（curl、Nginx 等）
- 下载 KClaw Manager 程序
- 配置 systemd 系统服务（开机自启）
- 设置 Nginx 反向代理 + 密码保护
- 配置防火墙规则

### 安装完成后

1. **打开管理页面**：`http://你的服务器IP:51943`
2. **默认账号密码**：`kclaw` / `kclaw`
3. **立即修改密码**：`sudo kclaw-chpasswd`

### 云服务器注意事项

在以下平台需要额外开放 **TCP 端口 51943**：

- **腾讯云**：控制台 → 防火墙 → 添加规则 → TCP 51943
- **阿里云**：安全组 → 入方向 → 添加 TCP 51943
- **AWS**：安全组 → 入站规则 → 添加 TCP 51943

---

## 2. Windows 安装

1. 从 [Releases](https://github.com/frederderrickkastre-arch/kclaw-openclaw-releases/releases/latest) 下载 `kclaw-manager-win-x64.zip`
2. 解压到任意目录
3. 双击运行 `kclaw-manager.exe`
4. 在弹出的管理界面中配置 API Key

---

## 3. macOS 安装

1. 从 [Releases](https://github.com/frederderrickkastre-arch/kclaw-openclaw-releases/releases/latest) 下载 `.dmg` 文件
2. 打开 DMG，将应用拖入「应用程序」文件夹
3. 首次运行如提示"无法验证开发者"，前往 系统设置 → 隐私与安全性 → 点击"仍然允许"
4. 在管理界面中配置 API Key

---

## 4. 配置 API Key

1. 前往 [KClaw 平台](https://www.eden321.com/register) 注册账号
2. 在控制台获取 API Key（以 `sk-` 开头）
3. 在 KClaw Manager 管理页面中，进入「AI 配置」
4. 粘贴 API Key，选择模型，点击「保存配置」

---

## 5. 接入消息渠道

### Telegram

1. 在 Telegram 中找到 @BotFather
2. 发送 `/newbot`，按提示创建机器人
3. 获取 Bot Token
4. 在管理页面「消息渠道」中填入 Token

### 飞书

1. 前往 [飞书开放平台](https://open.feishu.cn/)
2. 创建企业自建应用
3. 获取 App ID、App Secret、Verification Token
4. 在管理页面「消息渠道」中填入对应信息
5. 配置消息接收地址（回调 URL）

### Discord

1. 前往 [Discord Developer Portal](https://discord.com/developers/applications)
2. 创建应用 → 添加 Bot
3. 获取 Bot Token
4. 在管理页面「消息渠道」中填入 Token

---

## 6. 常用命令（Linux 服务器）

```bash
# 查看服务状态
sudo systemctl status kclaw-manager

# 重启服务
sudo systemctl restart kclaw-manager

# 查看实时日志
sudo tail -f /var/log/kclaw-manager.log

# 修改访问密码
sudo kclaw-chpasswd

# 升级到最新版本
curl -fsSL https://raw.githubusercontent.com/frederderrickkastre-arch/kclaw-openclaw-releases/main/install.sh | sudo bash

# 完全卸载
curl -fsSL https://raw.githubusercontent.com/frederderrickkastre-arch/kclaw-openclaw-releases/main/uninstall.sh | sudo bash
```

---

## 常见问题

### Q: 浏览器打不开管理页面？
A: 检查是否在云服务器安全组/防火墙中放通了 TCP 端口 51943。

### Q: 安装脚本下载失败？
A: 可能是 GitHub 访问不稳定，稍等几分钟后重试，或使用代理。

### Q: 如何切换 AI 模型？
A: 在管理页面「AI 配置」中选择模型。支持 GPT-4o、Claude 4.5、DeepSeek V3 等。

### Q: 支持哪些消息平台？
A: Telegram、飞书、Discord、企业微信、Slack、WhatsApp 等。

---

## 技术支持

- GitHub Issues: https://github.com/frederderrickkastre-arch/kclaw-openclaw-releases/issues
- API 文档: https://www.eden321.com/docs
