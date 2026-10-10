<template>
  <div class="about-section glass-panel">
    <h1 class="text-gradient">About This Project</h1>
    <p>This is a modern Vue 3 application built with Vite.</p>
    <p>It features a beautiful dark theme with glassmorphism, powered by standard CSS variables.</p>
  </div>
</template>

<style scoped>
.about-section {
  width: 100%;
  max-width: 800px;
  margin: 4rem auto;
  padding: 3rem;
  text-align: center;
  animation: fade-in 0.8s ease-out;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

p {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
