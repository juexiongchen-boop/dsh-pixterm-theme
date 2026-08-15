# dsh-pixterm-theme

**Pixel Terminal Blue (Light)** — a complete skin for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web GUI.

复古像素终端风 × 图标蓝 `#4176E6` × 纯白底：

- 🕹️ **像素字体** — 全局 VT323，主标题 Press Start 2P 并带 `4px 4px 0` 硬投影（中文自动回退系统字体）
- 📺 **CRT 质感** — 全屏细扫描线 + 边缘淡蓝暗角
- 👾 **像素控件** — 全局方角、按钮 2px 蓝边 + `4px 4px 0` 硬阴影、`steps()` 段落式按压动效、像素滚动条
- 🔵 **蓝色体系** — 品牌色 / 选中态 / 粗体标题统一 `#4176E6`，蓝底选中卡一律白字
- ⬜ **白色纸面** — 侧栏、头部、聊天区、输入框、气泡、文件树、悬停卡片、设置页、Dock 面板（Explorer / 终端）全部统一为白色，输入框背后保留一条柔和的蓝色渐变

字体的像素感来自 Google Fonts（VT323 / Press Start 2P），离线环境下自动回退等宽字体，布局与配色不受影响。

主题完全通过 DSH 主题服务的 `overrideTokens` 叠层和一张注入样式表实现，**不修改任何产品文件**——禁用或卸载插件即恢复默认界面。

## 安装

```bash
# 直接从 GitHub 安装（推荐，无需发布 npm）
dsh plugin --profile web add github:juexiongchen-boop/dsh-pixterm-theme

# 本地目录安装（开发 / 离线分享）
dsh plugin --profile web add <path-to-dsh-pixterm-theme>

# 或发布到 npm 后
dsh plugin --profile web add dsh-pixterm-theme
```

安装后重启 `dsh web` 并刷新页面即生效。

## 卸载 / 停用

```bash
dsh plugin --profile web remove dsh-pixterm-theme
```

重启后界面恢复原样，无任何残留。

## 发布到 npm（分享给别人）

```bash
cd dsh-pixterm-theme
npm publish --access public
```

> 如果 `dsh-pixterm-theme` 名字被占用，改成你的专属名字（如 `@yourname/dsh-pixterm-theme`），
> 记得同步修改 `package.json` 的 `name`、`cordis.patch.yml` 里的 `name` 字段。

## 工作原理

| 文件 | 作用 |
| --- | --- |
| `cordis.patch.yml` | 向 profile 组合插入一行 `pixterm-theme` 插件 |
| `host/index.js` | 宿主侧空插件（皮肤不需要宿主能力） |
| `client/client.js` | 浏览器侧：① 通过 `theme.overrideTokens` 叠加蓝色 token 层；② 注入像素终端样式表 |

两个副作用都挂在插件 fiber 上，停用即整体回滚。

## License

MIT
