<template>
  <div class="team-settings">
    <div class="placeholder">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
      <h3>团队管理</h3>
      <p>此功能正在开发中...</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.team-settings {
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
