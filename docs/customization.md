# 品牌定制指南

本文档说明如何将此项目定制为你自己的品牌。

## 需要替换的内容

以下是所有需要修改的品牌相关值，集中在少量文件中：

### 1. Linux 安装脚本 (`install.sh`)

文件顶部的配置区（第 10-22 行）：

```bash
BRAND_NAME="KClaw"              # → 改为你的品牌名
BRAND_LOWER="kclaw"             # → 改为品牌名小写（用于文件路径、服务名）
DEFAULT_USER="kclaw"            # → 默认登录用户名
DEFAULT_PASS="kclaw"            # → 默认登录密码
GITHUB_REPO="frederderrickkastre-arch/kclaw-openclaw-releases"  # → 你的 GitHub 仓库
API_BASE_URL="https://www.eden321.com/v1"        # → 你的 API 中转站地址
```

### 2. 卸载脚本 (`uninstall.sh`)

同样修改顶部的变量（第 8-14 行），保持与 install.sh 一致。

### 3. 桌面应用品牌配置 (`manager-app/src/config/brand.ts`)

这是桌面 GUI 的**唯一品牌配置文件**，修改此文件即可更改所有 UI 文字：

```typescript
export const BRAND = {
  name: "YourBrand",                    // 品牌名
  displayName: "YourBrand OpenClaw Manager",  // 完整显示名
  lower: "yourbrand",                   // 小写品牌名
  website: "https://yourbrand.com",     // 官网
  // ...
};

export const API_CONFIG = {
  defaultBaseUrl: "https://api.yourbrand.com/v1",  // API 地址
  // ...
};
```

### 4. Tauri 配置 (`manager-app/src-tauri/tauri.conf.json`)

```json
{
  "productName": "YourBrand OpenClaw Manager",
  "identifier": "com.yourbrand.openclaw-manager",
  // ...
  "plugins": {
    "updater": {
      "endpoints": ["https://github.com/yourbrand/your-repo/releases/latest/download/latest.json"]
    }
  }
}
```

### 5. Cargo.toml (`manager-app/src-tauri/Cargo.toml`)

```toml
[package]
name = "yourbrand-manager"
description = "YourBrand OpenClaw Manager"
```

### 6. Rust 后端默认配置 (`manager-app/src-tauri/src/commands/config.rs`)

```rust
const DEFAULT_API_BASE_URL: &str = "https://api.yourbrand.com/v1";
```

### 7. GitHub Actions (`/.github/workflows/release.yml`)

```yaml
env:
  BRAND_LOWER: yourbrand
```

### 8. README.md

更新所有 URL 和品牌名引用。

## 快速全局替换

如果你使用 VS Code / Cursor，可以用全局搜索替换：

| 搜索 | 替换为 |
|------|--------|
| `KClaw` | `你的品牌名` |
| `kclaw` | `你的品牌小写` |
| `www.eden321.com` | `你的 API 域名` |
| `frederderrickkastre-arch/kclaw-openclaw-releases` | `你的GitHub用户名/仓库名` |

## 图标替换

替换以下文件：
- `manager-app/public/logo.svg` — Web 图标
- `manager-app/src-tauri/icons/` — 桌面应用图标（需要多尺寸 PNG + ICO + ICNS）

可以使用 [tauri-icon](https://github.com/nicoverbruggen/tauri-icon-gen) 工具从一张 1024x1024 PNG 生成所有尺寸。
