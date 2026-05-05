<template>
  <div class="gallery-settings">
    <div class="placeholder">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <h3>游戏截图管理</h3>
      <p>此功能正在开发中...</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery-settings {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.placeholder {
  text-align: center;
  color: var(--text-muted);

  svg {
    margin-bottom: 20px;
    opacity: 0.5;
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 8px;
    color: var(--primary-color);
  }

  p {
    font-size: 0.95rem;
  }
}
</style>
