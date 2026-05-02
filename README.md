# 🦊 FoxMC-Vue - Minecraft 服务器宣传网站 (Vue 3 重构版)

基于 Vue 3 + TypeScript + Vite 重构的 Minecraft 服务器宣传网站，现代化前端架构，组件化开发，更好的性能和可维护性。

> 📌 **本项目为二次开发版本**，基于原作者 [AZzzw](https://forum.rainyun.com/t/topic/13170) 的开源项目进行 Vue 化重构。

---

## ✨ 特性

- ⚡ **Vue 3** - Composition API，更好的逻辑复用
- 🔷 **TypeScript** - 类型安全，更好的开发体验
- 🚀 **Vite** - 极速的开发服务器和构建工具
- 🎨 **SCSS** - 更强大的 CSS 预处理
- 📦 **Pinia** - 现代化的状态管理
- 🛣️ **Vue Router** - 单页应用路由
- 🎭 **玻璃拟态设计** - 现代化的 UI 视觉效果
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🎬 **滚动动画** - 流畅的页面交互体验

---

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3.5+ |
| 语言 | TypeScript 5.6+ |
| 构建工具 | Vite 6.0+ |
| 状态管理 | Pinia 3.0+ |
| 路由 | Vue Router 4.5+ |
| 样式 | SCSS |
| 代码规范 | ESLint + Prettier |

---

## 📁 项目结构

```
FoxMC-Vue/
├── public/                    # 静态资源
│   ├── png/                  # 背景图、图标
│   └── egg/                  # 截图、头像
├── src/
│   ├── assets/
│   │   └── styles/           # SCSS 样式文件
│   ├── components/           # 公共组件
│   │   ├── Navbar.vue       # 导航栏（含侧边栏）
│   │   └── Footer.vue       # 页脚
│   ├── views/home/           # 首页区块组件
│   │   ├── HeroSection.vue      # 首页横幅
│   │   ├── SpecsSection.vue     # 服务器配置
│   │   ├── HelpSection.vue      # 加入指南
│   │   ├── FeaturesSection.vue  # 游戏特色
│   │   ├── GallerySection.vue   # 截图轮播
│   │   ├── TeamSection.vue      # 管理团队
│   │   ├── ContactSection.vue   # 联系表单
│   │   └── CommunitySection.vue # 社区链接
│   ├── composables/          # 组合式函数
│   │   ├── useScrollAnimation.ts
│   │   └── useCopyToClipboard.ts
│   ├── stores/               # Pinia 状态管理
│   │   └── siteConfig.ts    # 站点配置
│   ├── router/               # 路由配置
│   ├── App.vue
│   └── main.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0
- **npm** >= 9.0

### 安装依赖

```bash
cd FoxMC-Vue
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 生产构建

```bash
npm run build
```

构建后的文件在 `dist/` 目录

### 预览构建结果

```bash
npm run preview
```

---

## 📝 配置说明

站点内容配置在 `src/stores/siteConfig.ts` 中：

```typescript
// 站点基本信息
const site = ref<SiteConfig>({
  title: '我的世界小狐狸生存服',
  description: '...',
  serverIp: 'play.example.com',
  logoText: '我的世界服务器',
})

// 首页横幅
const hero = ref<HeroConfig>({
  badge: '现在游玩就送点卷大礼包！',
  titleLine1: '欢迎来到',
  titleHighlight: '小狐狸生存服',
  // ...
})

// 其他区块配置...
```

---

## 🎨 自定义主题

在 `src/assets/styles/variables.scss` 中修改 CSS 变量：

```scss
:root {
  --bg-dark: #0f172a;       // 背景色
  --primary-color: #ffffff;  // 主色调
  --accent-green: #00e676;   // 强调色
  --accent-gold: #ffd700;    // 金色
  // ...
}
```

---

## 📦 部署

### 静态托管

构建后的 `dist/` 目录可直接部署到：
- Vercel
- Netlify
- GitHub Pages
- 腾讯云 COS
- 阿里云 OSS

### 传统服务器

将 `dist/` 目录内容上传到 Web 服务器（Nginx/Apache）的站点目录。

---

## 🔧 与原项目的区别

| 特性 | 原项目 (HTML/PHP) | Vue 重构版 |
|------|------------------|-----------|
| 架构 | 纯静态 HTML + PHP 后台 | Vue 3 SPA |
| 状态管理 | 无 | Pinia |
| 组件化 | 无 | 完整组件化 |
| 类型安全 | 无 | TypeScript |
| 构建工具 | 无 | Vite |
| 响应式 | CSS Media Query | CSS + Vue 响应式 |
| 动画 | 原生 JS | Vue Transition |
| 后台管理 | PHP 原生实现 | 可对接 API |

---

## 🤝 致谢

- **原作者**：[AZzzw](https://forum.rainyun.com/t/topic/13170)
- **原项目发布**：[雨云论坛](https://forum.rainyun.com/t/topic/13170)
- **Vue 团队**：提供优秀的前端框架

---

## 📄 License

本项目遵循原作者的开源协议。二次开发请保留原作者署名。

> 二开请标注原作者「小狐务器」
