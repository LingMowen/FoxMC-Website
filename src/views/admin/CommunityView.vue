<template>
  <div class="community-settings">
    <div class="placeholder">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
      <h3>社区链接管理</h3>
      <p>此功能正在开发中...</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.community-settings {
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
