<template>
  <div class="features-settings">
    <div class="placeholder">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      <h3>游戏特色管理</h3>
      <p>此功能正在开发中...</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.features-settings {
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
