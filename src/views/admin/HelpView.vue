<template>
  <div class="help-settings">
    <div class="placeholder">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <h3>加入指南管理</h3>
      <p>此功能正在开发中...</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.help-settings {
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
