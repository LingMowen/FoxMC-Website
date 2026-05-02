# 🦊 FoxMC - Minecraft 服务器宣传网站

一个功能全面的 **Minecraft 服务器宣传网站**，专为 MC 服务器服主设计。采用纯静态前端 + PHP 后台架构，支持全站内容可视化编辑，无需修改代码即可自定义整个网站。

> 📌 **本项目为二次开发版本**，基于原作者 [AZzzw](https://forum.rainyun.com/t/topic/13170) 的开源项目进行修改和扩展。

---

## 📖 目录

- [功能特性](#-功能特性)
- [在线演示](#-在线演示)
- [技术栈](#-技术栈)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [部署指南](#-部署指南)
- [后台管理](#-后台管理)
- [配置说明](#-配置说明)
- [二次开发](#-二次开发)
- [安全说明](#-安全说明)
- [免责声明](#-免责声明)
- [致谢](#-致谢)

---

## ✨ 功能特性

### 🖥 前台展示

| 模块 | 说明 |
|------|------|
| **首页横幅** | 全屏 Hero 区域，展示服务器状态、在线人数、IP 地址一键复制 |
| **服务器配置** | 展示 CPU、内存、网络、存储等硬件配置信息 |
| **加入指南** | 三步引导新玩家下载启动器 → 添加服务器 → 进入游戏 |
| **游戏特色** | 展示服务器的核心玩法（纯净生存 / RPG / 建筑等） |
| **游戏截图** | 图片轮播展示，自动播放，支持前后切换 |
| **管理团队** | 团队成员展示，无限循环滚动轮播 |
| **联系我们** | 带附件上传的联系表单，支持 SMTP 邮件通知 |
| **加入社区** | QQ 群 / 微信群二维码展示，一键加群链接 |

### 🔧 后台管理

| 功能 | 说明 |
|------|------|
| **网站设置** | 站点标题、描述、Logo（文字/图片）、服务器 IP、服务器模式（国际服/网易山头服） |
| **首页横幅** | 自定义标语、主标题、副标题、特性标签、背景图 |
| **服务器配置** | 编辑四项硬件配置的名称、描述、参数值 |
| **加入指南** | 编辑三步引导的标题和描述 |
| **游戏特色** | 编辑特色卡片的标题和描述 |
| **游戏截图** | 管理轮播图片和描述文字 |
| **管理团队** | 编辑团队成员信息（名称、职位、描述、联系方式、头像） |
| **社区链接** | 配置 QQ/微信群的文字、描述、二维码、链接 |
| **页脚设置** | 编辑页脚描述、版权信息、友情链接 |
| **实时监控** | 对接 Rainyun RGS API，实时查看服务器 CPU、内存、网络状态 |
| **消息通知** | 查看和管理玩家通过联系表单提交的消息 |
| **用户管理** | 管理员账户管理，支持修改密码、头像 |

### 🎨 设计亮点

- **玻璃拟态设计**（Glassmorphism）：毛玻璃导航栏与卡片效果
- **滚动渐入动画**：元素随页面滚动平滑浮现
- **懒加载**：图片和背景图按需加载，优化首屏性能
- **响应式布局**：完美适配桌面端、平板和手机端
- **暗色主题**：沉浸式暗色配色，彰显游戏氛围
- **SEO 优化**：结构化数据（JSON-LD）、Meta 标签、语义化 HTML
- **XSS 防护**：前端使用 `textContent` 安全渲染，后端输入过滤

---

## 🎮 在线演示

| 页面 | 地址 |
|------|------|
| 前台首页 | `http://你的域名/` |
| 后台管理 | `http://你的域名/admin/` |

---

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| **前端** | HTML5 + CSS3 + Vanilla JavaScript（无框架依赖） |
| **后端** | PHP 7.4+ |
| **数据存储** | JSON 文件（无需数据库） |
| **邮件服务** | SMTP（内置 SimpleSMTP 类） |
| **服务器** | Apache / Nginx（需支持 PHP） |
| **API 对接** | MinecraftServers 状态查询、Rainyun RGS 监控 |

---

## 📁 项目结构

```
MC宣传网站/
├── index.html                 # 前台首页（单页应用）
├── style.css                  # 前台样式表
├── script.js                  # 前台交互脚本
├── server_status.php          # 服务器在线状态 API 代理
├── submit_message.php         # 联系表单提交处理
├── .htaccess                  # Apache 配置（安全头、缓存、Gzip）
├── assets/
│   └── images/
│       ├── cat.jpg            # 默认管理员头像
│       └── logo.png           # 默认 Logo
├── egg/                       # 游戏特色图标 & 团队头像
│   ├── 001.png ~ 003.png      # 特色图标
│   ├── cat.jpg ~ cat3.jpg     # 团队头像
│   └── *.jpg / *.png          # 截图素材
├── png/                       # 网站图片资源
│   ├── CPU.png / RAM.png      # 硬件配置图标
│   ├── QQ.png / WX.png        # 社区图标
│   └── *.jpg                  # 背景图 & 截图
├── admin/                     # 后台管理系统
│   ├── index.php              # 登录页面
│   ├── panel.php              # 管理面板主页
│   ├── config.php             # 核心配置文件
│   ├── save.php               # 内容保存处理
│   ├── handlers.php           # 各模块 Tab 处理函数
│   ├── api.php                # REST API 接口
│   ├── smtp.php               # SMTP 邮件发送类
│   ├── forgot_password.php    # 忘记密码功能
│   ├── style.css              # 后台样式表
│   ├── script.js              # 后台交互脚本
│   ├── panel-init.js          # 面板初始化脚本
│   ├── data/
│   │   ├── content.json       # 网站内容数据（CMS 核心）
│   │   └── .htaccess          # 数据目录保护
│   └── uploads/               # 上传文件目录
│       ├── msg_images/        # 联系表单附件图片
│       └── .htaccess          # 上传目录保护
```

---

## 🚀 快速开始

### 环境要求

- **PHP** >= 7.4（推荐 8.0+）
- **Apache** 或 **Nginx**
- PHP 扩展：`curl`、`fileinfo`、`json`、`mbstring`、`openssl`

### 本地运行

1. **克隆项目**

```bash
git clone https://github.com/LingMowen/FoxMC-Website.git
cd FoxMC-Website
```

2. **使用 PHP 内置服务器快速预览**

```bash
php -S localhost:8000
```

3. **打开浏览器访问**

```
http://localhost:8000
```

---

## 📦 部署指南

### Apache 部署

1. 将项目文件上传到 Apache 的 `htdocs` 或虚拟主机目录
2. 确保 `.htaccess` 文件已启用（`AllowOverride All`）
3. 确保 `admin/data/` 和 `admin/uploads/` 目录有写入权限

```bash
chmod -R 755 admin/data
chmod -R 755 admin/uploads
```

4. 访问 `http://你的域名/admin/` 登录后台

### Nginx 部署

Nginx 不支持 `.htaccess`，需要手动配置。以下为参考配置：

```nginx
server {
    listen 80;
    server_name 你的域名;

    root /path/to/MC宣传网站;
    index index.html index.php;

    # 禁止访问隐藏文件和敏感文件
    location ~ /\. {
        deny all;
    }
    location ~ \.(zip|sql|log|bak|tmp|env|ini)$ {
        deny all;
    }

    # PHP 处理
    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # 安全头
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
}
```

### 宝塔面板部署

1. 在宝塔面板中创建站点
2. 将项目文件上传到站点目录
3. 设置运行目录为 `/`（项目根目录）
4. 确保 PHP 版本 >= 7.4
5. 在「网站」→「伪静态」中粘贴 Nginx 配置（如使用 Nginx）
6. 访问站点即可

---

## 🔐 后台管理

### 默认登录信息

| 项目 | 值 |
|------|-----|
| 后台地址 | `http://你的域名/admin/` |
| 默认密码 | `admin123` |

> ⚠️ **重要**：首次登录后请立即修改默认密码！

### 管理功能入口

登录后进入管理面板，左侧导航栏提供以下功能标签：

- **网站设置**：服务器 IP、模式选择（国际服 / 网易山头服）、Logo 设置
- **首页横幅**：自定义 Hero 区域的文字和背景
- **服务器配置**：编辑硬件配置展示
- **加入指南**：编辑新玩家引导内容
- **游戏特色**：编辑特色玩法卡片
- **游戏截图**：管理轮播图片
- **管理团队**：编辑团队成员信息
- **实时监控**：需要配置 Rainyun RGS API
- **消息通知**：查看玩家提交的联系表单
- **用户管理**：管理员账户设置
- **社区链接**：QQ / 微信群配置
- **页脚设置**：版权信息和友情链接

### 忘记密码

如果忘记管理员密码：
1. 确保已在后台配置 SMTP 邮件服务
2. 在登录页点击「忘记密码」
3. 通过管理员邮箱接收重置链接
4. 若未配置 SMTP，可删除 `admin/data/` 下的密码文件来重置

---

## ⚙ 配置说明

### 服务器模式切换

在后台「网站设置」中可选择两种模式：

| 模式 | 说明 |
|------|------|
| **国际服（International）** | 适用于 Java 版 Minecraft 服务器，显示在线人数，可复制服务器 IP |
| **网易山头服（NetEase）** | 适用于网易我的世界服务器，显示服务器人数上限（赏耀4人/山峰12人/云顶40人），复制山头链接 |

### SMTP 邮件配置

在后台管理面板中配置 SMTP 参数，用于：
- 联系表单邮件通知
- 忘记密码邮件发送

支持的 SMTP 服务商：QQ邮箱、163邮箱、Gmail 等。

### Rainyun 监控配置

如需启用「实时监控」面板，需在后台配置：
- Rainyun RGS ID
- Rainyun API Key

获取方式：登录 [Rainyun 控制台](https://www.rainyun.com) → API 管理。

---

## 🛠 二次开发

### 修改前台样式

- 主要样式文件：[style.css](style.css)
- CSS 变量定义在 `:root` 中，可快速修改主题色

```css
:root {
    --bg-dark: #0f172a;       /* 背景色 */
    --primary-color: #ffffff; /* 主色调 */
    --accent-green: #00e676;  /* 强调色 */
}
```

### 修改前台脚本

- 主要脚本文件：[script.js](script.js)
- 画廊图片数据、团队卡片数据均可在 JS 中直接修改

### 修改后台功能

- PHP 文件位于 `admin/` 目录
- 内容数据结构定义在 `admin/data/content.json`
- Tab 处理函数在 `admin/handlers.php`

### 开发建议

1. 修改前请备份原始文件
2. 前台修改后更新 `style.css` 和 `script.js` 的版本号参数（`?v=`）以刷新缓存
3. 添加新功能模块时，需同步更新 `content.json` 数据结构

---

## 🔒 安全说明

- 管理后台已集成 CSRF 保护、登录频率限制、Session 安全机制
- `.htaccess` 已配置禁止访问敏感文件（`.zip`、`.sql`、`.log` 等）
- `admin/data/` 目录已配置访问保护
- **部署后务必修改默认管理员密码**
- 建议启用 HTTPS
- 定期检查 `admin/uploads/` 目录，清理无用文件
- 如不需要 SMTP 功能，可在后台关闭

---

## ⚠ 免责声明

- 本项目仅供学习和个人服务器宣传使用
- **NOT AN OFFICIAL MINECRAFT PRODUCT.** 本项目与 Mojang Studios 或 Microsoft 无任何关联
- 项目中使用的 Minecraft 相关素材版权归 Mojang / Microsoft 所有
- 网易我的世界相关功能仅供技术研究，请遵守网易相关服务条款
- 使用本项目产生的任何法律问题由使用者自行承担

---

## 🙏 致谢

- **原作者**：[AZzzw](https://forum.rainyun.com/t/topic/13170)（QQ：2769544753）
- **原项目发布**：[雨云论坛](https://forum.rainyun.com/t/topic/13170)
- **服务器托管推荐**：[雨云](https://www.rainyun.com)
- 感谢所有为本项目提供建议和反馈的社区成员

---

## 📄 License

本项目遵循原作者的开源协议。二次开发请保留原作者署名。

> 二开请标注原作者「小狐务器」
