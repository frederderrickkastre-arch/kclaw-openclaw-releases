#!/usr/bin/env bash
# =============================================================================
# KClaw OpenClaw Manager — 卸载脚本
# 用法: curl -fsSL https://raw.githubusercontent.com/frederderrickkastre-arch/kclaw-openclaw-releases/main/uninstall.sh | sudo bash
# =============================================================================
set -euo pipefail

BRAND_NAME="KClaw"
BRAND_LOWER="kclaw"
INSTALL_DIR="/opt/${BRAND_LOWER}-manager"
SERVICE_NAME="${BRAND_LOWER}-manager"
LOG_FILE="/var/log/${BRAND_LOWER}-manager.log"
PIDFILE="/var/run/${BRAND_LOWER}-manager.pid"
NGINX_CONF="/etc/nginx/conf.d/${BRAND_LOWER}-manager.conf"
NGINX_HTPASSWD="/etc/nginx/.${BRAND_LOWER}_htpasswd"
WEB_PORT="51942"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

info()    { echo -e "${GREEN}[✓]${RESET} $*"; }
warn()    { echo -e "${YELLOW}[!]${RESET} $*"; }
error()   { echo -e "${RED}[✗]${RESET} $*" >&2; exit 1; }
section() { echo -e "\n${CYAN}${BOLD}>>> $* ${RESET}"; }

echo ""
echo -e "${BOLD}╔══════════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}║  ${BRAND_NAME} OpenClaw Manager — 卸载程序          ║${RESET}"
echo -e "${BOLD}╚══════════════════════════════════════════════════╝${RESET}"
echo ""

[[ $EUID -ne 0 ]] && error "请使用 sudo 或 root 用户运行此脚本。"

read -p "确认卸载 ${BRAND_NAME} OpenClaw Manager？(y/N): " CONFIRM
[[ "${CONFIRM,,}" != "y" ]] && { echo "已取消。"; exit 0; }

# 1. 停止服务
section "停止服务"
systemctl stop "$SERVICE_NAME" 2>/dev/null || true
systemctl disable "$SERVICE_NAME" 2>/dev/null || true
rm -f "/etc/systemd/system/${SERVICE_NAME}.service"
systemctl daemon-reload 2>/dev/null || true
command -v pkill &>/dev/null && pkill -f "${BRAND_LOWER}-manager$" 2>/dev/null || true
info "服务已停止并移除 ✓"

# 2. 移除 Nginx 配置
section "移除 Nginx 配置"
rm -f "$NGINX_CONF"
rm -f "$NGINX_HTPASSWD"
if command -v nginx &>/dev/null; then
  nginx -t -q 2>/dev/null && systemctl reload nginx 2>/dev/null || true
fi
info "Nginx 配置已移除 ✓"

# 3. 清理 iptables 规则
section "清理防火墙规则"
if command -v iptables &>/dev/null; then
  iptables -D INPUT -i lo -p tcp --dport "${WEB_PORT}" -j ACCEPT 2>/dev/null || true
  iptables -D INPUT -p tcp --dport "${WEB_PORT}" -j DROP 2>/dev/null || true
  info "iptables 规则已清理 ✓"
fi
SVC_FILE="/etc/systemd/system/iptables-restore-${BRAND_LOWER}.service"
if [[ -f "$SVC_FILE" ]]; then
  systemctl disable "iptables-restore-${BRAND_LOWER}.service" 2>/dev/null || true
  rm -f "$SVC_FILE"
  systemctl daemon-reload 2>/dev/null || true
fi

# 4. 删除程序文件
section "删除程序文件"
rm -rf "$INSTALL_DIR"
rm -f "$LOG_FILE"
rm -f "$PIDFILE"
rm -f "/usr/local/bin/${BRAND_LOWER}-chpasswd"
info "程序文件已删除 ✓"

echo ""
echo -e "${GREEN}${BOLD}  ✅ ${BRAND_NAME} OpenClaw Manager 已完全卸载！${RESET}"
echo ""
echo -e "  注意：Nginx 本身未被卸载（可能有其他站点在使用）。"
echo -e "  如需卸载 Nginx，请手动运行: sudo apt remove nginx 或 sudo yum remove nginx"
echo ""
