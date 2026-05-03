<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'mobile-open': isMobileMenuOpen }" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4H20V20H4V4Z"/>
            <path d="M4 12H20"/>
            <path d="M12 4V20"/>
          </svg>
          <span class="sidebar-title">FoxMC 后台</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        <a
          v-for="tab in tabs"
          :key="tab.key"
          href="#"
          class="nav-item"
          :class="{ active: currentTab === tab.key }"
          :id="'nav-' + tab.key"
          @click.prevent="switchTab(tab.key)"
        >
          <span v-html="tab.icon"></span>
          <span>{{ tab.label }}</span>
          <span v-if="tab.key === 'messages' && unreadCount > 0" class="badge">
            {{ unreadCount > 99 ? '99+' : unreadCount }}
          </span>
        </a>
        <div class="nav-divider"></div>
        <a href="/" target="_blank" class="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          <span>前往前台</span>
        </a>
        <a href="#" class="nav-item" @click.prevent="handleLogout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>退出登录</span>
        </a>
      </nav>
    </aside>

    <!-- Mobile Overlay -->
    <div v-if="isMobileMenuOpen" class="mobile-overlay" @click="isMobileMenuOpen = false"></div>

    <!-- Main Content -->
    <main class="main-content">
      <header class="topbar">
        <button class="mobile-menu-btn" id="mobileMenuBtn" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <h2 class="topbar-title" id="page-title">{{ currentTabLabel }}</h2>
        <div class="topbar-actions">
          <div class="topbar-profile" @click="openProfileModal">
            <img :src="adminAvatar" alt="Avatar" id="topbarAvatar">
            <span class="topbar-user">管理员</span>
          </div>
        </div>
      </header>

      <!-- Profile Modal -->
      <div v-if="showProfileModal" class="modal-overlay" @click.self="closeProfileModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>管理员账号设置</h3>
            <button type="button" class="close-modal" @click="closeProfileModal">×</button>
          </div>
          <form @submit.prevent="saveProfile">
            <div class="form-group" style="text-align: center;">
              <div class="avatar-upload-preview">
                <img :src="profileForm.avatarPreview" id="avatarPreview">
                <label for="avatarInput" class="avatar-edit-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </label>
                <input type="file" id="avatarInput" accept="image/*" style="display: none;" @change="previewAvatar">
              </div>
              <p class="file-hint">点击图标修改头像</p>
            </div>

            <div class="form-group">
              <label>新密码 (留空则不修改)</label>
              <input type="password" v-model="profileForm.newPassword" class="form-input" placeholder="输入新密码">
            </div>

            <div class="form-group">
              <label>确认新密码</label>
              <input type="password" v-model="profileForm.confirmPassword" class="form-input" placeholder="再次输入新密码">
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="closeProfileModal">取消</button>
              <button type="submit" class="btn-save">保存设置</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Ad Banner -->
      <div v-if="!hideAdBanner" class="ad-banner">
        <div class="ad-content">
          <span class="ad-icon">🚀</span>
          <span>雨云IDC - 稳定、高速、低价的云服务器</span>
          <a href="https://www.rainyun.com" target="_blank" class="ad-link">立即查看</a>
        </div>
        <button class="ad-close" @click="closeAdBanner">×</button>
      </div>

      <!-- Alert Messages -->
      <div v-if="alertMessage" class="alert" :class="alertType">
        <svg v-if="alertType === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {{ alertMessage }}
      </div>

      <!-- Page Content -->
      <div class="page-content">
        <!-- Site Settings Tab -->
        <div v-show="currentTab === 'site'" class="tab-pane" id="tab-site">
          <div class="form-section">
            <h3 class="section-title">服务器类型</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">选择您服务器所属的平台类型。</p>
            <div class="server-mode-selector">
              <label
                v-for="mode in serverModes"
                :key="mode.value"
                class="server-mode-card"
                :class="[mode.value === form.site.serverMode ? 'is-active' : '', 'server-mode-card--' + mode.value]"
              >
                <input
                  type="radio"
                  v-model="form.site.serverMode"
                  :value="mode.value"
                  style="position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none;"
                >
                <img :src="mode.icon" :alt="mode.label">
                <span>{{ mode.label }}</span>
              </label>
            </div>

            <div v-if="form.site.serverMode === 'netease'" class="netease-tier-section">
              <p class="netease-tier-title">选择套餐规格</p>
              <div class="tier-selector">
                <label
                  v-for="tier in neteaseTiers"
                  :key="tier.value"
                  class="tier-card"
                  :class="{ 'is-active': form.site.neteaseTier === tier.value }"
                >
                  <input
                    type="radio"
                    v-model="form.site.neteaseTier"
                    :value="tier.value"
                    style="position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none;"
                  >
                  <span class="tier-name">{{ tier.name }}</span>
                  <span class="tier-spec">至多 {{ tier.players }} 名玩家</span>
                  <span class="tier-spec">{{ tier.saves }} 个存档位置</span>
                </label>
              </div>
              <p class="tier-common-note">全部套餐均包含：全天候畅玩 · 成员免费游玩 · 存档自动备份</p>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">网站基本信息</h3>
            <div class="form-group">
              <label>网站标题</label>
              <input v-model="form.site.title" type="text" class="form-input">
            </div>
            <div class="form-group">
              <label>网站描述 (SEO)</label>
              <textarea v-model="form.site.description" class="form-input" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>服务器 IP 地址</label>
              <input v-model="form.site.serverIp" type="text" class="form-input" placeholder="play.example.com">
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">导航栏 LOGO 设置</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">上传图片后将替换默认文字 LOGO；清空图片则恢复为文字显示。</p>
            <div class="form-group">
              <label>LOGO 文字（默认显示）</label>
              <input v-model="form.site.logoText" type="text" class="form-input" placeholder="我的世界服务器">
            </div>
            <div class="form-group">
              <label>LOGO 图片（可选，优先于文字）</label>
              <div class="image-upload-group">
                <img v-if="form.site.logoImage" :src="form.site.logoImage" class="preview-img small" alt="当前LOGO">
                <input type="file" accept="image/*" class="form-file" @change="handleLogoUpload">
                <span class="file-hint">建议高度 40px，PNG 透明背景效果最佳。留空则使用文字 LOGO。</span>
              </div>
            </div>
            <div class="form-group" style="display: flex; align-items: center; gap: 12px;">
              <label class="switch">
                <input type="checkbox" v-model="clearLogo" class="toggle">
                <span class="slider"></span>
              </label>
              <span style="font-size: 0.85rem; color: var(--text-muted);">勾选后保存将清除图片 LOGO，恢复为文字显示</span>
            </div>
          </div>

          <div class="form-actions">
            <button class="btn-save" @click="saveSiteSettings">保存更改</button>
          </div>

          <div class="form-section" style="margin-top: 32px;">
            <h3 class="section-title">后台管理设置</h3>
            <div class="form-group" style="display: flex; flex-direction: column; align-items: center;">
              <label class="switch">
                <input type="checkbox" v-model="hideAdBanner" class="toggle">
                <span class="slider"></span>
              </label>
              <span style="margin-top: 12px; font-weight: 500; color: var(--text-primary);">永久关闭全局广告横幅</span>
              <p style="margin-top: 8px; font-size: 0.85rem; color: var(--text-muted); text-align: center;">开启此选项后，后台顶部的雨云IDC广告将不再显示。</p>
            </div>
            <div class="form-actions">
              <button class="btn-save" @click="saveGeneralSettings">保存设置</button>
            </div>
          </div>
        </div>

        <!-- Hero Tab -->
        <div v-show="currentTab === 'hero'" class="tab-pane" id="tab-hero">
          <div class="form-section">
            <h3 class="section-title">首页横幅内容</h3>
            <div class="form-group">
              <label>顶部标签文字</label>
              <input v-model="form.hero.badge" type="text" class="form-input">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>标题第一行</label>
                <input v-model="form.hero.titleLine1" type="text" class="form-input">
              </div>
              <div class="form-group">
                <label>标题高亮部分</label>
                <input v-model="form.hero.titleHighlight" type="text" class="form-input">
              </div>
            </div>
            <div class="form-group">
              <label>副标题</label>
              <textarea v-model="form.hero.subtitle" class="form-input" rows="2"></textarea>
            </div>
            <div class="form-group">
              <label>特性标签 (每行一个)</label>
              <textarea v-model="heroFeaturesText" class="form-input" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>背景图片</label>
              <div class="image-upload-group">
                <img v-if="form.hero.bgImage" :src="form.hero.bgImage" class="preview-img" alt="">
                <input type="file" accept="image/*" class="form-file" @change="handleHeroBgUpload">
                <span class="file-hint">留空则保持当前图片不变</span>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save" @click="saveHeroSettings">保存更改</button>
          </div>
        </div>

        <!-- Specs Tab -->
        <div v-show="currentTab === 'specs'" class="tab-pane" id="tab-specs">
          <div class="form-section">
            <h3 class="section-title">服务器配置板块</h3>
            <div class="form-row">
              <div class="form-group">
                <label>板块标题</label>
                <input v-model="form.specs.title" type="text" class="form-input">
              </div>
              <div class="form-group">
                <label>板块副标题</label>
                <input v-model="form.specs.subtitle" type="text" class="form-input">
              </div>
            </div>
          </div>
          <div v-for="(item, index) in form.specs.items" :key="index" class="form-section">
            <h3 class="section-title">配置项 {{ index + 1 }}</h3>
            <div class="form-row">
              <div class="form-group">
                <label>标题</label>
                <input v-model="item.title" type="text" class="form-input">
              </div>
              <div class="form-group">
                <label>参数值</label>
                <input v-model="item.value" type="text" class="form-input">
              </div>
            </div>
            <div class="form-group">
              <label>描述</label>
              <textarea v-model="item.desc" class="form-input" rows="2"></textarea>
            </div>
            <div class="form-group">
              <label>图标</label>
              <div class="image-upload-group">
                <img v-if="item.icon" :src="item.icon" class="preview-img small" alt="">
                <input type="file" accept="image/*" class="form-file" @change="(e) => handleSpecIconUpload(e, index)">
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save" @click="saveSpecsSettings">保存更改</button>
          </div>
        </div>

        <!-- Help Tab -->
        <div v-show="currentTab === 'help'" class="tab-pane" id="tab-help">
          <div class="form-section">
            <h3 class="section-title">加入指南板块</h3>
            <div class="form-row">
              <div class="form-group">
                <label>板块标题</label>
                <input v-model="form.help.title" type="text" class="form-input">
              </div>
              <div class="form-group">
                <label>板块副标题</label>
                <input v-model="form.help.subtitle" type="text" class="form-input">
              </div>
            </div>
          </div>
          <div v-for="(step, index) in form.help.steps" :key="index" class="form-section">
            <h3 class="section-title">步骤 {{ step.number }}</h3>
            <div class="form-group">
              <label>标题</label>
              <input v-model="step.title" type="text" class="form-input">
            </div>
            <div class="form-group">
              <label>描述</label>
              <textarea v-model="step.desc" class="form-input" rows="2"></textarea>
            </div>
            <div v-if="step.action" class="form-row">
              <div class="form-group">
                <label>按钮文字</label>
                <input v-model="step.actionText" type="text" class="form-input">
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save" @click="saveHelpSettings">保存更改</button>
          </div>
        </div>

        <!-- Features Tab -->
        <div v-show="currentTab === 'features'" class="tab-pane" id="tab-features">
          <div class="form-section">
            <h3 class="section-title">游戏特色板块</h3>
            <div class="form-row">
              <div class="form-group">
                <label>板块标题</label>
                <input v-model="form.features.title" type="text" class="form-input">
              </div>
              <div class="form-group">
                <label>板块副标题</label>
                <input v-model="form.features.subtitle" type="text" class="form-input">
              </div>
            </div>
          </div>
          <div v-for="(item, index) in form.features.items" :key="index" class="form-section">
            <h3 class="section-title">特色 {{ index + 1 }}</h3>
            <div class="form-group">
              <label>标题</label>
              <input v-model="item.title" type="text" class="form-input">
            </div>
            <div class="form-group">
              <label>描述</label>
              <textarea v-model="item.desc" class="form-input" rows="2"></textarea>
            </div>
            <div class="form-group">
              <label>图标</label>
              <div class="image-upload-group">
                <img v-if="item.icon" :src="item.icon" class="preview-img small" alt="">
                <input type="file" accept="image/*" class="form-file" @change="(e) => handleFeatureIconUpload(e, index)">
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save" @click="saveFeaturesSettings">保存更改</button>
          </div>
        </div>

        <!-- Gallery Tab -->
        <div v-show="currentTab === 'gallery'" class="tab-pane" id="tab-gallery">
          <div class="form-section">
            <h3 class="section-title">游戏截图板块</h3>
            <div class="form-row">
              <div class="form-group">
                <label>板块标题</label>
                <input v-model="form.gallery.title" type="text" class="form-input">
              </div>
              <div class="form-group">
                <label>板块副标题</label>
                <input v-model="form.gallery.subtitle" type="text" class="form-input">
              </div>
            </div>
          </div>
          <div v-for="(item, index) in form.gallery.items" :key="index" class="form-section">
            <h3 class="section-title">截图 {{ index + 1 }}</h3>
            <div class="form-group">
              <label>图片说明</label>
              <input v-model="item.caption" type="text" class="form-input">
            </div>
            <div class="form-group">
              <label>图片</label>
              <div class="image-upload-group">
                <img v-if="item.src" :src="item.src" class="preview-img" alt="">
                <input type="file" accept="image/*" class="form-file" @change="(e) => handleGalleryImageUpload(e, index)">
              </div>
            </div>
          </div>
          <div class="form-section">
            <h3 class="section-title">添加新截图</h3>
            <div class="form-group">
              <label>图片说明</label>
              <input v-model="newGalleryItem.caption" type="text" class="form-input" placeholder="输入图片描述...">
            </div>
            <div class="form-group">
              <label>上传图片</label>
              <input type="file" accept="image/*" class="form-file" @change="handleNewGalleryUpload">
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save" @click="saveGallerySettings">保存更改</button>
          </div>
        </div>

        <!-- Team Tab -->
        <div v-show="currentTab === 'team'" class="tab-pane" id="tab-team">
          <div class="form-section">
            <h3 class="section-title">管理团队板块</h3>
            <div class="form-row">
              <div class="form-group">
                <label>板块标题</label>
                <input v-model="form.team.title" type="text" class="form-input">
              </div>
              <div class="form-group">
                <label>板块副标题</label>
                <input v-model="form.team.subtitle" type="text" class="form-input">
              </div>
            </div>
          </div>
          <div v-for="(member, index) in form.team.members" :key="index" class="form-section">
            <h3 class="section-title">成员 {{ index + 1 }}: {{ member.name }}</h3>
            <div class="form-row">
              <div class="form-group">
                <label>名称</label>
                <input v-model="member.name" type="text" class="form-input">
              </div>
              <div class="form-group">
                <label>英文职位</label>
                <input v-model="member.role" type="text" class="form-input">
              </div>
            </div>
            <div class="form-group">
              <label>描述</label>
              <textarea v-model="member.desc" class="form-input" rows="2"></textarea>
            </div>
            <div class="form-group">
              <label>联系链接</label>
              <input v-model="member.contactLink" type="text" class="form-input" placeholder="如: https://example.com 或 #contact">
            </div>
            <div class="form-group">
              <label>头像</label>
              <div class="image-upload-group">
                <img v-if="member.avatar" :src="member.avatar" class="preview-img small round" alt="">
                <input type="file" accept="image/*" class="form-file" @change="(e) => handleTeamAvatarUpload(e, index)">
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save" @click="saveTeamSettings">保存更改</button>
          </div>
        </div>

        <!-- Monitor Tab -->
        <div v-show="currentTab === 'monitor'" class="tab-pane" id="tab-monitor">
          <div style="display:flex;align-items:center;gap:10px;background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:0.88rem;color:#92400e;line-height:1.5;">
            <svg style="flex-shrink:0;color:#d97706;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span><strong>注意：</strong>服务器监控功能仅适用于雨云 <strong>游戏云（RGS）</strong> 实例，其他服务商或自建/网易山头服暂不支持。</span>
          </div>

          <div class="form-section">
            <h3 class="section-title">实时监控</h3>
            <div class="monitor-placeholder">
              <p>此功能需要配置 Rainyun API</p>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">雨云 API 配置</h3>
            <div class="form-group">
              <label>雨云 API 密钥 (x-api-key)</label>
              <input v-model="monitorConfig.apiKey" type="password" class="form-input" placeholder="在雨云用户中心 → API 管理中生成">
            </div>
            <div class="form-group">
              <label>RGS 实例 ID</label>
              <input v-model="monitorConfig.rgsId" type="text" class="form-input" placeholder="例如: 86524">
            </div>
            <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px;">配置完成后，监控数据将自动从雨云 API 实时获取并展示。API 密钥仅存储在服务端，不会暴露到前端。</p>
            <div class="form-actions">
              <button class="btn-save" @click="saveMonitorConfig">保存配置</button>
            </div>
          </div>
        </div>

        <!-- Messages Tab -->
        <div v-show="currentTab === 'messages'" class="tab-pane" id="tab-messages">
          <div class="form-section">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
              <h3 class="section-title" style="margin-bottom:0;padding-bottom:0;border-bottom:none;">
                收件箱 <span style="font-weight:400;font-size:0.85em;color:var(--text-muted);">({{ messages.length }} 条消息)</span>
              </h3>
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="display:inline-flex;align-items:center;gap:6px;font-size:0.8em;color:var(--green);">
                  <span class="live-indicator"></span>
                  实时刷新中
                </span>
              </div>
            </div>

            <div v-if="messages.length === 0" class="empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:12px;opacity:0.4;">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <div style="font-size:1em;margin-bottom:4px;">暂无消息</div>
              <div style="font-size:0.85em;">当有人提交联系表单时，消息将显示在这里</div>
            </div>

            <div class="messages-list">
              <div
                v-for="msg in paginatedMessages"
                :key="msg.id"
                class="message-item"
                :class="{ unread: !msg.read }"
              >
                <div class="msg-header">
                  <div class="msg-meta">
                    <span class="msg-name">{{ msg.name }}</span>
                    <span class="msg-tag" :class="msg.tagClass">{{ msg.tag }}</span>
                  </div>
                  <span class="msg-time">{{ msg.time }}</span>
                </div>
                <div class="msg-email">{{ msg.email }}</div>
                <div class="msg-content">{{ msg.content }}</div>
                <div v-if="msg.image" class="msg-image">
                  <img :src="msg.image" alt="消息图片" @click="openLightbox(msg.image)">
                </div>
                <div class="msg-actions-bar">
                  <button class="msg-btn" :class="{ active: msg.read }" @click="toggleMessageRead(msg)">
                    {{ msg.read ? '标记未读' : '标记已读' }}
                  </button>
                  <button class="msg-btn reply" @click="replyToMessage(msg)">回复</button>
                  <button class="msg-btn delete" @click="deleteMessage(msg.id)">删除</button>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" style="display:flex;justify-content:center;align-items:center;gap:8px;margin-top:20px;flex-wrap:wrap;">
              <button
                v-for="page in totalPages"
                :key="page"
                class="page-btn"
                :class="{ active: currentPage === page }"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">消息通知设置</h3>
            <div class="form-row">
              <div class="form-group" style="flex:1; display: flex; flex-direction: column; align-items: center;">
                <label class="switch">
                  <input type="checkbox" v-model="messageSettings.dndMode" class="toggle">
                  <span class="slider"></span>
                </label>
                <span style="margin-top: 12px; font-weight: 500; color: var(--text-primary);">启用免打扰模式 (不发送邮件通知)</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>自动清理已读消息 (天)</label>
                <input v-model="messageSettings.autoCleanDays" type="number" class="form-input" min="0" max="3650" placeholder="0 表示不自动清理">
                <p style="margin:4px 0 0;font-size:0.82em;color:var(--text-muted);">填 0 或留空则不清理；例如填 30 表示自动删除 30 天前的已读消息</p>
              </div>
              <div class="form-group">
                <label>每页显示消息数</label>
                <input v-model="messageSettings.perPage" type="number" class="form-input" min="5" max="100" placeholder="默认 10">
                <p style="margin:4px 0 0;font-size:0.82em;color:var(--text-muted);">每页展示多少条消息，范围 5~100</p>
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-save" @click="saveMessageSettings">保存设置</button>
            </div>
          </div>
        </div>

        <!-- Users Tab -->
        <div v-show="currentTab === 'users'" class="tab-pane" id="tab-users">
          <div class="form-section">
            <h3 class="section-title">
              用户管理
              <span style="margin-left:auto;font-size:0.8em;font-weight:400;color:var(--text-muted);">管理已注册的 Minecraft 用户</span>
            </h3>

            <!-- 搜索 & 操作栏 -->
            <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap;align-items:center;">
              <div style="flex:1;min-width:200px;position:relative;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);pointer-events:none;">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input type="text" v-model="userSearch" class="form-input" placeholder="搜索用户名 / 游戏ID / 邮箱..." style="padding-left:36px;">
              </div>
              <button type="button" class="btn-save" style="white-space:nowrap;" @click="showAddUserModal = true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-3px;margin-right:4px;">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                添加用户
              </button>
            </div>

            <!-- 统计卡片 -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px;">
              <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px;text-align:center;">
                <div style="font-size:1.6em;font-weight:700;color:#16a34a;">{{ users.length }}</div>
                <div style="font-size:0.85em;color:#15803d;margin-top:2px;">总用户数</div>
              </div>
              <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:16px;text-align:center;">
                <div style="font-size:1.6em;font-weight:700;color:#2563eb;">{{ onlineUsers }}</div>
                <div style="font-size:0.85em;color:#1d4ed8;margin-top:2px;">在线用户</div>
              </div>
              <div style="background:#fefce8;border:1px solid #fde68a;border-radius:10px;padding:16px;text-align:center;">
                <div style="font-size:1.6em;font-weight:700;color:#ca8a04;">{{ newUsersThisWeek }}</div>
                <div style="font-size:0.85em;color:#a16207;margin-top:2px;">本周新增</div>
              </div>
              <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px;text-align:center;">
                <div style="font-size:1.6em;font-weight:700;color:#dc2626;">{{ bannedUsers }}</div>
                <div style="font-size:0.85em;color:#b91c1c;margin-top:2px;">已封禁</div>
              </div>
            </div>

            <!-- 用户列表表格 -->
            <div style="overflow-x:auto;border:1px solid #e2e8f0;border-radius:10px;background:#fff;">
              <table style="width:100%;border-collapse:collapse;font-size:0.9em;">
                <thead>
                  <tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0;">
                    <th style="padding:12px 14px;text-align:left;font-weight:600;color:var(--text-primary);white-space:nowrap;">游戏ID</th>
                    <th style="padding:12px 14px;text-align:left;font-weight:600;color:var(--text-primary);white-space:nowrap;">邮箱</th>
                    <th style="padding:12px 14px;text-align:center;font-weight:600;color:var(--text-primary);white-space:nowrap;">状态</th>
                    <th style="padding:12px 14px;text-align:center;font-weight:600;color:var(--text-primary);white-space:nowrap;">注册时间</th>
                    <th style="padding:12px 14px;text-align:center;font-weight:600;color:var(--text-primary);white-space:nowrap;">最后登录</th>
                    <th style="padding:12px 14px;text-align:center;font-weight:600;color:var(--text-primary);white-space:nowrap;">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in filteredUsers" :key="user.id">
                    <td style="padding:12px 14px;">{{ user.gameId }}</td>
                    <td style="padding:12px 14px;">{{ user.email }}</td>
                    <td style="padding:12px 14px;text-align:center;">
                      <span :style="{ color: user.status === 'online' ? '#16a34a' : user.status === 'banned' ? '#dc2626' : '#64748b' }">
                        {{ user.statusText }}
                      </span>
                    </td>
                    <td style="padding:12px 14px;text-align:center;">{{ user.registerTime }}</td>
                    <td style="padding:12px 14px;text-align:center;">{{ user.lastLogin }}</td>
                    <td style="padding:12px 14px;text-align:center;">
                      <button class="msg-btn" @click="editUser(user)">编辑</button>
                      <button class="msg-btn delete" @click="deleteUser(user.id)">删除</button>
                    </td>
                  </tr>
                  <tr v-if="filteredUsers.length === 0">
                    <td colspan="6" style="padding:40px;text-align:center;color:#94a3b8;">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:12px;opacity:0.4;">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <line x1="19" y1="8" x2="19" y2="14"/>
                        <line x1="22" y1="11" x2="16" y2="11"/>
                      </svg>
                      <div style="font-size:1em;margin-bottom:4px;">暂无注册用户</div>
                      <div style="font-size:0.85em;">点击上方按钮添加用户</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Community Tab -->
        <div v-show="currentTab === 'community'" class="tab-pane" id="tab-community">
          <div class="form-section">
            <h3 class="section-title">社区链接板块</h3>
            <div class="form-row">
              <div class="form-group">
                <label>板块标题</label>
                <input v-model="form.community.title" type="text" class="form-input">
              </div>
              <div class="form-group">
                <label>板块副标题</label>
                <input v-model="form.community.subtitle" type="text" class="form-input">
              </div>
            </div>
          </div>
          <div class="form-section">
            <h3 class="section-title">QQ群</h3>
            <div class="form-group">
              <label>标题</label>
              <input v-model="form.community.qq.text" type="text" class="form-input">
            </div>
            <div class="form-group">
              <label>描述</label>
              <input v-model="form.community.qq.desc" type="text" class="form-input">
            </div>
            <div class="form-group">
              <label>二维码图片</label>
              <div class="image-upload-group">
                <img v-if="form.community.qq.qr" :src="form.community.qq.qr" class="preview-img small" alt="">
                <input type="file" accept="image/*" class="form-file" @change="(e) => handleCommunityQrUpload(e, 'qq')">
              </div>
            </div>
            <div class="form-group">
              <label>加群链接</label>
              <input v-model="form.community.qq.link" type="text" class="form-input">
            </div>
          </div>
          <div class="form-section">
            <h3 class="section-title">微信群</h3>
            <div class="form-group">
              <label>标题</label>
              <input v-model="form.community.wechat.text" type="text" class="form-input">
            </div>
            <div class="form-group">
              <label>描述</label>
              <input v-model="form.community.wechat.desc" type="text" class="form-input">
            </div>
            <div class="form-group">
              <label>二维码图片</label>
              <div class="image-upload-group">
                <img v-if="form.community.wechat.qr" :src="form.community.wechat.qr" class="preview-img small" alt="">
                <input type="file" accept="image/*" class="form-file" @change="(e) => handleCommunityQrUpload(e, 'wechat')">
              </div>
            </div>
            <div class="form-group">
              <label>加群链接</label>
              <input v-model="form.community.wechat.link" type="text" class="form-input">
            </div>
          </div>
          <div class="form-actions">
            <button class="btn-save" @click="saveCommunitySettings">保存更改</button>
          </div>
        </div>

        <!-- Footer Tab -->
        <div v-show="currentTab === 'footer'" class="tab-pane" id="tab-footer">
          <div class="form-section">
            <h3 class="section-title">页脚设置</h3>
            <div class="form-group">
              <label>页脚描述</label>
              <textarea v-model="form.footer.desc" class="form-input" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>版权信息</label>
              <input v-model="form.footer.copyright" type="text" class="form-input">
            </div>
          </div>
          <div v-for="(link, index) in form.footer.friendLinks" :key="index" class="form-section">
            <h3 class="section-title">友情链接 {{ index + 1 }}</h3>
            <div class="form-row">
              <div class="form-group">
                <label>名称</label>
                <input v-model="link.name" type="text" class="form-input">
              </div>
              <div class="form-group">
                <label>链接</label>
                <input v-model="link.url" type="text" class="form-input" placeholder="https://example.com">
              </div>
            </div>
          </div>
          <div class="form-section">
            <h3 class="section-title">添加新友情链接</h3>
            <div class="form-row">
              <div class="form-group">
                <label>名称</label>
                <input v-model="newFriendLink.name" type="text" class="form-input" placeholder="输入链接名称...">
              </div>
              <div class="form-group">
                <label>链接</label>
                <input v-model="newFriendLink.url" type="text" class="form-input" placeholder="https://example.com">
              </div>
            </div>
            <button class="btn-add" @click="addFriendLink">+ 添加链接</button>
          </div>
          <div class="form-actions">
            <button class="btn-save" @click="saveFooterSettings">保存更改</button>
          </div>
        </div>
      </div>
    </main>

    <!-- Lightbox -->
    <div v-if="lightboxImage" class="lightbox" @click.self="closeLightbox">
      <img :src="lightboxImage" alt="预览">
      <button class="lightbox-close" @click="closeLightbox">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSiteConfigStore } from '@/stores/siteConfig'

const router = useRouter()
const authStore = useAuthStore()
const siteStore = useSiteConfigStore()

const currentTab = ref('site')
const isMobileMenuOpen = ref(false)
const alertMessage = ref('')
const alertType = ref<'success' | 'error'>('success')
const showProfileModal = ref(false)
const hideAdBanner = ref(false)
const clearLogo = ref(false)
const lightboxImage = ref('')
const currentPage = ref(1)
const userSearch = ref('')
const showAddUserModal = ref(false)

const tabs = [
  { key: 'site', label: '网站设置', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
  { key: 'hero', label: '首页横幅', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' },
  { key: 'specs', label: '服务器配置', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>' },
  { key: 'help', label: '加入指南', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
  { key: 'features', label: '游戏特色', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
  { key: 'gallery', label: '游戏截图', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' },
  { key: 'team', label: '管理团队', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { key: 'monitor', label: '实时监控', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
  { key: 'messages', label: '消息通知', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' },
  { key: 'users', label: '用户管理', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>' },
  { key: 'community', label: '社区链接', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
  { key: 'footer', label: '页脚设置', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="15" x2="21" y2="15"/></svg>' }
]

const currentTabLabel = computed(() => tabs.find(t => t.key === currentTab.value)?.label || '管理后台')

const serverModes = [
  { value: 'international', label: '官方国际服', icon: '/egg/mc.webp' },
  { value: 'netease', label: '网易山头服', icon: '/egg/sbwangyi.webp' }
]

const neteaseTiers = [
  { value: 'shangyao', name: '山腰', players: 4, saves: 1 },
  { value: 'shanfeng', name: '山峰', players: 12, saves: 3 },
  { value: 'yunding', name: '云顶', players: 40, saves: 3 }
]

const form = reactive({
  site: {
    title: siteStore.site.title,
    description: siteStore.site.description,
    serverIp: siteStore.site.serverIp,
    logoText: siteStore.site.logoText,
    logoImage: siteStore.site.logoImage,
    serverMode: 'international',
    neteaseTier: 'shangyao'
  },
  hero: {
    badge: siteStore.hero.badge,
    titleLine1: siteStore.hero.titleLine1,
    titleHighlight: siteStore.hero.titleHighlight,
    subtitle: siteStore.hero.subtitle,
    bgImage: siteStore.hero.bgImage,
    features: [...siteStore.hero.features]
  },
  specs: {
    title: siteStore.specs.title,
    subtitle: siteStore.specs.subtitle,
    items: siteStore.specs.items.map(item => ({ ...item }))
  },
  help: {
    title: siteStore.help.title,
    subtitle: siteStore.help.subtitle,
    steps: siteStore.help.steps.map(step => ({ ...step }))
  },
  features: {
    title: siteStore.features.title,
    subtitle: siteStore.features.subtitle,
    items: siteStore.features.items.map(item => ({ ...item }))
  },
  gallery: {
    title: siteStore.gallery.title,
    subtitle: siteStore.gallery.subtitle,
    items: siteStore.gallery.items.map(item => ({ ...item }))
  },
  team: {
    title: siteStore.team.title,
    subtitle: siteStore.team.subtitle,
    members: siteStore.team.members.map(member => ({ ...member, contactLink: member.contactLink || '' }))
  },
  community: {
    title: siteStore.community.title,
    subtitle: siteStore.community.subtitle,
    qq: { ...siteStore.community.qq, qr: '' },
    wechat: { ...siteStore.community.wechat, qr: '' }
  },
  footer: {
    desc: siteStore.footer.desc,
    copyright: siteStore.footer.copyright,
    friendLinks: siteStore.footer.friendLinks.map(link => ({ ...link }))
  }
})

const heroFeaturesText = computed({
  get: () => form.hero.features.join('\n'),
  set: (val) => { form.hero.features = val.split('\n').filter(f => f.trim()) }
})

const messages = ref<any[]>([])
const unreadCount = computed(() => messages.value.filter((m: any) => !m.read).length)

const messageSettings = reactive({
  dndMode: false,
  autoCleanDays: 0,
  perPage: 10
})

const monitorConfig = reactive({
  apiKey: '',
  rgsId: ''
})

const profileForm = reactive({
  avatar: '',
  avatarPreview: '/egg/cat.jpg',
  newPassword: '',
  confirmPassword: ''
})

const adminAvatar = computed(() => profileForm.avatar || '/egg/cat.jpg')

const newGalleryItem = reactive({
  caption: '',
  src: ''
})

const newFriendLink = reactive({
  name: '',
  url: ''
})

const users = ref<any[]>([])
const filteredUsers = computed(() => {
  if (!userSearch.value) return users.value
  const search = userSearch.value.toLowerCase()
  return users.value.filter(u =>
    u.gameId?.toLowerCase().includes(search) ||
    u.email?.toLowerCase().includes(search)
  )
})
const onlineUsers = computed(() => users.value.filter(u => u.status === 'online').length)
const newUsersThisWeek = computed(() => 0)
const bannedUsers = computed(() => users.value.filter(u => u.status === 'banned').length)

const paginatedMessages = computed(() => {
  const perPage = messageSettings.perPage || 10
  const start = (currentPage.value - 1) * perPage
  return messages.value.slice(start, start + perPage)
})

const totalPages = computed(() => Math.ceil(messages.value.length / (messageSettings.perPage || 10)))

onMounted(() => {
  loadMessages()
  loadSettings()
  loadUsers()
})

const loadMessages = () => {
  const stored = localStorage.getItem('contact_messages')
  if (stored) {
    messages.value = JSON.parse(stored).map((m: any) => ({
      ...m,
      tag: m.tag || '联系表单',
      tagClass: m.tagClass || 'tag-contact',
      read: m.read || false
    }))
  }
}

const loadSettings = () => {
  const settings = localStorage.getItem('admin_settings')
  if (settings) {
    const parsed = JSON.parse(settings)
    hideAdBanner.value = parsed.hideAdBanner || false
    messageSettings.dndMode = parsed.dndMode || false
    messageSettings.autoCleanDays = parsed.autoCleanDays || 0
    messageSettings.perPage = parsed.perPage || 10
    monitorConfig.apiKey = parsed.rainyunApiKey || ''
    monitorConfig.rgsId = parsed.rainyunRgsId || ''
    profileForm.avatar = parsed.adminAvatar || ''
    profileForm.avatarPreview = parsed.adminAvatar || '/egg/cat.jpg'
  }
}

const loadUsers = () => {
  const stored = localStorage.getItem('mc_users')
  if (stored) {
    users.value = JSON.parse(stored)
  }
}

const switchTab = (tab: string) => {
  currentTab.value = tab
  isMobileMenuOpen.value = false
  currentPage.value = 1
}

const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
  alertMessage.value = message
  alertType.value = type
  setTimeout(() => {
    alertMessage.value = ''
  }, 3000)
}

const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

// Profile Modal
const openProfileModal = () => {
  showProfileModal.value = true
}

const closeProfileModal = () => {
  showProfileModal.value = false
  profileForm.newPassword = ''
  profileForm.confirmPassword = ''
}

const previewAvatar = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profileForm.avatarPreview = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const saveProfile = () => {
  if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
    showAlert('两次输入的密码不一致！', 'error')
    return
  }
  if (profileForm.newPassword && profileForm.newPassword.length < 6) {
    showAlert('密码长度至少6位！', 'error')
    return
  }

  profileForm.avatar = profileForm.avatarPreview
  const settings = JSON.parse(localStorage.getItem('admin_settings') || '{}')
  settings.adminAvatar = profileForm.avatar
  localStorage.setItem('admin_settings', JSON.stringify(settings))

  if (profileForm.newPassword) {
    // In real app, this would call an API to change password
    showAlert('密码修改成功！')
  } else {
    showAlert('头像已更新！')
  }

  closeProfileModal()
}

// Ad Banner
const closeAdBanner = () => {
  hideAdBanner.value = true
}

// Image Upload Handlers
const handleLogoUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.site.logoImage = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleHeroBgUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.hero.bgImage = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleSpecIconUpload = (e: Event, index: number) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.specs.items[index].icon = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleFeatureIconUpload = (e: Event, index: number) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.features.items[index].icon = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleGalleryImageUpload = (e: Event, index: number) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.gallery.items[index].src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleNewGalleryUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      newGalleryItem.src = e.target?.result as string
      form.gallery.items.push({
        src: newGalleryItem.src,
        caption: newGalleryItem.caption || '新截图'
      })
      newGalleryItem.caption = ''
      newGalleryItem.src = ''
    }
    reader.readAsDataURL(file)
  }
}

const handleTeamAvatarUpload = (e: Event, index: number) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.team.members[index].avatar = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleCommunityQrUpload = (e: Event, type: 'qq' | 'wechat') => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.community[type].qr = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// Save Settings
const saveSiteSettings = () => {
  if (clearLogo.value) {
    form.site.logoImage = ''
    clearLogo.value = false
  }
  siteStore.site.title = form.site.title
  siteStore.site.description = form.site.description
  siteStore.site.serverIp = form.site.serverIp
  siteStore.site.logoText = form.site.logoText
  siteStore.site.logoImage = form.site.logoImage
  saveToLocalStorage('site_config', siteStore.site)
  showAlert('网站设置已保存！')
}

const saveGeneralSettings = () => {
  const settings = JSON.parse(localStorage.getItem('admin_settings') || '{}')
  settings.hideAdBanner = hideAdBanner.value
  localStorage.setItem('admin_settings', JSON.stringify(settings))
  showAlert('设置已保存！')
}

const saveHeroSettings = () => {
  siteStore.hero.badge = form.hero.badge
  siteStore.hero.titleLine1 = form.hero.titleLine1
  siteStore.hero.titleHighlight = form.hero.titleHighlight
  siteStore.hero.subtitle = form.hero.subtitle
  siteStore.hero.bgImage = form.hero.bgImage
  siteStore.hero.features = form.hero.features.filter(f => f.trim())
  saveToLocalStorage('hero_config', siteStore.hero)
  showAlert('首页横幅设置已保存！')
}

const saveSpecsSettings = () => {
  siteStore.specs.title = form.specs.title
  siteStore.specs.subtitle = form.specs.subtitle
  siteStore.specs.items = form.specs.items
  saveToLocalStorage('specs_config', siteStore.specs)
  showAlert('服务器配置已保存！')
}

const saveHelpSettings = () => {
  siteStore.help.title = form.help.title
  siteStore.help.subtitle = form.help.subtitle
  siteStore.help.steps = form.help.steps
  saveToLocalStorage('help_config', siteStore.help)
  showAlert('加入指南已保存！')
}

const saveFeaturesSettings = () => {
  siteStore.features.title = form.features.title
  siteStore.features.subtitle = form.features.subtitle
  siteStore.features.items = form.features.items
  saveToLocalStorage('features_config', siteStore.features)
  showAlert('游戏特色已保存！')
}

const saveGallerySettings = () => {
  siteStore.gallery.title = form.gallery.title
  siteStore.gallery.subtitle = form.gallery.subtitle
  siteStore.gallery.items = form.gallery.items
  saveToLocalStorage('gallery_config', siteStore.gallery)
  showAlert('游戏截图已保存！')
}

const saveTeamSettings = () => {
  siteStore.team.title = form.team.title
  siteStore.team.subtitle = form.team.subtitle
  siteStore.team.members = form.team.members
  saveToLocalStorage('team_config', siteStore.team)
  showAlert('团队信息已保存！')
}

const saveCommunitySettings = () => {
  siteStore.community.title = form.community.title
  siteStore.community.subtitle = form.community.subtitle
  siteStore.community.qq = { ...form.community.qq }
  siteStore.community.wechat = { ...form.community.wechat }
  saveToLocalStorage('community_config', siteStore.community)
  showAlert('社区链接已保存！')
}

const saveFooterSettings = () => {
  siteStore.footer.desc = form.footer.desc
  siteStore.footer.copyright = form.footer.copyright
  siteStore.footer.friendLinks = form.footer.friendLinks
  saveToLocalStorage('footer_config', siteStore.footer)
  showAlert('页脚设置已保存！')
}

const saveMonitorConfig = () => {
  const settings = JSON.parse(localStorage.getItem('admin_settings') || '{}')
  settings.rainyunApiKey = monitorConfig.apiKey
  settings.rainyunRgsId = monitorConfig.rgsId
  localStorage.setItem('admin_settings', JSON.stringify(settings))
  showAlert('监控配置已保存！')
}

const saveMessageSettings = () => {
  const settings = JSON.parse(localStorage.getItem('admin_settings') || '{}')
  settings.dndMode = messageSettings.dndMode
  settings.autoCleanDays = messageSettings.autoCleanDays
  settings.perPage = messageSettings.perPage
  localStorage.setItem('admin_settings', JSON.stringify(settings))
  showAlert('消息设置已保存！')
}

const addFriendLink = () => {
  if (newFriendLink.name && newFriendLink.url) {
    form.footer.friendLinks.push({ ...newFriendLink })
    newFriendLink.name = ''
    newFriendLink.url = ''
  }
}

// Message Actions
const toggleMessageRead = (msg: any) => {
  msg.read = !msg.read
  saveToLocalStorage('contact_messages', messages.value)
}

const replyToMessage = (msg: any) => {
  showAlert(`回复功能开发中 - 回复给: ${msg.email}`)
}

const deleteMessage = (id: number) => {
  messages.value = messages.value.filter(m => m.id !== id)
  saveToLocalStorage('contact_messages', messages.value)
  showAlert('消息已删除')
}

// User Actions
const editUser = (user: any) => {
  showAlert(`编辑用户: ${user.gameId}`)
}

const deleteUser = (id: number) => {
  users.value = users.value.filter(u => u.id !== id)
  saveToLocalStorage('mc_users', users.value)
  showAlert('用户已删除')
}

// Lightbox
const openLightbox = (image: string) => {
  lightboxImage.value = image
}

const closeLightbox = () => {
  lightboxImage.value = ''
}

const handleLogout = () => {
  authStore.logout()
  router.push('/admin/login')
}
</script>

<style scoped lang="scss">
.admin-layout {
  --bg-primary: #f1f5f9;
  --bg-secondary: #ffffff;
  --bg-card: #ffffff;
  --bg-card-hover: #f8fafc;
  --bg-input: #f8fafc;
  --border: #e2e8f0;
  --border-hover: #cbd5e1;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --green: #10b981;
  --green-dark: #059669;
  --blue: #3b82f6;
  --red: #ef4444;
  --amber: #f59e0b;
  --sidebar-w: 260px;
  --topbar-h: 64px;
  --radius: 16px;
  --radius-sm: 8px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --tr: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-w);
  background: var(--bg-card);
  border-right: 1px solid var(--border);
  z-index: 50;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  height: var(--topbar-h);
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid var(--border);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--green-dark);
  font-weight: 700;
  font-size: 1.25rem;
}

.sidebar-nav {
  padding: 24px 16px;
  flex: 1;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 4px;
  transition: var(--tr);
  text-decoration: none;

  &:hover {
    background: var(--bg-card-hover);
    color: var(--text-primary);
  }

  &.active {
    background: #ecfdf5;
    color: var(--green-dark);
    font-weight: 600;
  }
}

.nav-divider {
  height: 1px;
  background: var(--border);
  margin: 16px 8px;
}

.badge {
  background: var(--red);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: auto;
  min-width: 18px;
  text-align: center;
  line-height: 1.2;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
}

.main-content {
  margin-left: var(--sidebar-w);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  height: var(--topbar-h);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 40;
}

.topbar-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  padding: 8px;
  color: var(--text-secondary);
  cursor: pointer;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.topbar-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 30px;
  cursor: pointer;
  transition: var(--tr);

  &:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-hover);
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
    box-shadow: var(--shadow-sm);
  }
}

.topbar-user {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
}

// Modal
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 480px;
  padding: 32px;
  border-radius: 24px;
  box-shadow: var(--shadow-lg);
  position: relative;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
  }
}

.close-modal {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: var(--tr);

  &:hover {
    color: var(--text-primary);
    transform: rotate(90deg);
  }
}

.avatar-upload-preview {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 16px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--bg-primary);
    box-shadow: var(--shadow);
  }
}

.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background: var(--green);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: var(--tr);

  &:hover {
    background: var(--green-dark);
    transform: scale(1.1);
  }
}

.btn-secondary {
  background: var(--bg-input);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  padding: 10px 24px;
  border-radius: 10px;
  font-weight: 600;
  transition: var(--tr);
  cursor: pointer;

  &:hover {
    background: var(--border);
    color: var(--text-primary);
  }
}

// Ad Banner
.ad-banner {
  background: var(--blue);
  color: white;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 32px 0 32px;
  border-radius: var(--radius);
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
  position: relative;
  overflow: hidden;
}

.ad-content {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  z-index: 1;
}

.ad-icon {
  font-size: 1.2rem;
}

.ad-link {
  background: white;
  color: var(--blue);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: var(--tr);
  text-decoration: none;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
}

.ad-close {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--tr);
  z-index: 10;
  font-size: 1.2rem;
  line-height: 1;
  position: absolute;
  right: 24px;

  &:hover {
    background: rgba(255,255,255,0.3);
  }
}

.alert {
  padding: 16px;
  border-radius: 12px;
  margin: 24px 32px 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;

  &.success {
    background: #ecfdf5;
    color: var(--green-dark);
    border: 1px solid #a7f3d0;
  }

  &.error {
    background: #fef2f2;
    color: var(--red);
    border: 1px solid #fecaca;
  }
}

.page-content {
  padding: 32px;
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.tab-pane {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-section {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 32px;
  margin-bottom: 24px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  margin-bottom: 24px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 0.95rem;
    color: var(--text-secondary);
  }
}

.form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 0.95rem;
  transition: var(--tr);
  background: var(--bg-input);
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: var(--blue);
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
  }
}

textarea.form-input {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  margin-top: 32px;
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-save {
  background: var(--green);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 10px;
  font-weight: 600;
  transition: var(--tr);
  cursor: pointer;

  &:hover {
    background: var(--green-dark);
    box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
  }
}

.btn-add {
  padding: 10px 16px;
  background: #ecfdf5;
  border: 1px dashed var(--green);
  border-radius: 8px;
  color: var(--green-dark);
  font-weight: 500;
  cursor: pointer;
  transition: var(--tr);

  &:hover {
    background: #d1fae5;
  }
}

// Server Mode Selector
.server-mode-selector {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.server-mode-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 18px 32px;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--tr);
  background: var(--bg-input);
  user-select: none;
  min-width: 130px;
  position: relative;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  span {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-secondary);
    transition: color 0.2s;
  }

  &:hover {
    border-color: var(--border-hover);
    background: var(--bg-card-hover);
  }

  &.is-active {
    border-color: var(--green);
    background: rgba(16, 185, 129, 0.06);

    span {
      color: var(--green);
    }
  }
}

.server-mode-card--netease.is-active {
  border-color: #8b5cf6;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.07), rgba(99, 102, 241, 0.04));

  span {
    color: #8b5cf6;
  }
}

.netease-tier-section {
  margin-top: 18px;
  padding: 14px 16px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.04), rgba(99, 102, 241, 0.03));
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: var(--radius-sm);
}

.netease-tier-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: #8b5cf6;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.tier-selector {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tier-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px;
  border: 1.5px solid rgba(139, 92, 246, 0.2);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--tr);
  background: #fff;
  min-width: 100px;
  position: relative;

  .tier-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-primary);
    transition: color 0.2s;
  }

  .tier-spec {
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  &:hover {
    border-color: rgba(139, 92, 246, 0.45);
    background: rgba(139, 92, 246, 0.03);
  }

  &.is-active {
    border-color: #8b5cf6;
    background: rgba(139, 92, 246, 0.08);

    .tier-name {
      color: #8b5cf6;
    }
  }
}

.tier-common-note {
  margin-top: 10px;
  font-size: 0.75rem;
  color: var(--text-muted);
}

// Image Upload
.image-upload-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.preview-img {
  max-width: 100%;
  max-height: 240px;
  width: auto;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  object-fit: contain;
  background: var(--bg-card-hover);
  display: block;

  &.small {
    max-height: 64px;
    max-width: 64px;
  }

  &.round {
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
}

.file-hint {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 4px;
}

.form-file {
  width: 100%;
  padding: 8px;
  background: var(--bg-input);
  border: 1px dashed var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--tr);

  &:hover {
    border-color: var(--green);
    background: #ecfdf5;
  }

  &::file-selector-button {
    margin-right: 12px;
    padding: 6px 16px;
    border-radius: 6px;
    border: none;
    background: var(--green);
    color: white;
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    transition: var(--tr);
  }

  &::file-selector-button:hover {
    background: var(--green-dark);
  }
}

// Switch Toggle
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 26px;
}

.toggle {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
}

.toggle:checked + .slider {
  background-color: var(--green);
}

.toggle:checked + .slider:before {
  transform: translateX(34px);
}

// Messages
.messages-list {
  .message-item {
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    background: var(--bg-card);
    transition: all 0.2s;

    &.unread {
      border-left: 3px solid var(--green);
      background: #f0fdf4;
    }
  }
}

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 10px;
}

.msg-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.msg-name {
  font-weight: 600;
  font-size: 1.1em;
  color: var(--text-primary);
}

.msg-email {
  color: #64748b;
  font-size: 0.9em;
  margin-bottom: 8px;
}

.msg-tag {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75em;
  font-weight: 600;
  white-space: nowrap;
  background: #e0e7ff;
  color: #4338ca;

  &.tag-contact {
    background: #dbeafe;
    color: #1d4ed8;
  }
}

.msg-time {
  color: #94a3b8;
  font-size: 0.85em;
  white-space: nowrap;
}

.msg-content {
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 12px;
}

.msg-image {
  margin: 12px 0;

  img {
    max-width: 200px;
    max-height: 150px;
    border-radius: 8px;
    border: 1px solid var(--border);
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.02);
    }
  }
}

.msg-actions-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.msg-btn {
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-input);
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--tr);

  &:hover {
    background: var(--border);
    color: var(--text-primary);
  }

  &.reply {
    background: #dbeafe;
    border-color: #93c5fd;
    color: #1d4ed8;

    &:hover {
      background: #bfdbfe;
    }
  }

  &.delete {
    background: #fee2e2;
    border-color: #fca5a5;
    color: #dc2626;

    &:hover {
      background: #fecaca;
    }
  }

  &.active {
    background: #ecfdf5;
    border-color: #6ee7b7;
    color: var(--green-dark);
  }
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--tr);

  &:hover {
    background: var(--bg-input);
  }

  &.active {
    background: var(--green);
    border-color: var(--green);
    color: white;
  }
}

// Live indicator
.live-indicator {
  width: 7px;
  height: 7px;
  background: var(--green);
  border-radius: 50%;
  display: inline-block;
  animation: pulse-live 2s infinite;
}

@keyframes pulse-live {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

// Empty state
.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--text-muted);
}

// Monitor placeholder
.monitor-placeholder {
  text-align: center;
  padding: 40px;
  color: var(--text-muted);
}

// Lightbox
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  backdrop-filter: blur(4px);

  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    animation: slideUp 0.3s ease;
  }
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255,255,255,0.2);
  border: none;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255,255,255,0.3);
  }
}

// Responsive
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    &.mobile-open {
      transform: translateX(0);
    }
  }

  .mobile-menu-btn {
    display: block;
  }

  .main-content {
    margin-left: 0;
  }

  .topbar {
    padding: 0 16px;
  }

  .page-content {
    padding: 16px;
  }

  .form-section {
    padding: 20px;
  }

  .ad-banner {
    margin: 16px 16px 0 16px;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 16px;
    text-align: center;

    .ad-content {
      flex-direction: column;
      text-align: center;
    }

    .ad-close {
      position: absolute;
      top: 12px;
      right: 12px;
    }
  }

  .message-item {
    padding: 14px;
  }

  .msg-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .msg-meta {
    gap: 6px;
  }

  .msg-name {
    font-size: 1em;
  }

  .msg-email {
    font-size: 0.8em;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .msg-time {
    font-size: 0.8em;
  }

  .modal-content {
    margin: 16px;
    padding: 20px;
  }
}
</style>
