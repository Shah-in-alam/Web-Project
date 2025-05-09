<template>
  <footer class="footer">
    <p>© 2025 All Rights Reserved!</p>
    <div class="social-icons">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-facebook"></i>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
};
</script>

<style scoped>
.footer {
  background-color: #2e7d32;
  color: white;
  text-align: center;
  padding: 1rem 0;
  font-family: 'Segoe UI', sans-serif;
}

.footer p {
  margin: 0;
  font-size: 1rem;
}

.social-icons {
  margin-top: 0.5rem;
}

.social-icons a {
  margin: 0 10px;
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #a5d6a7;
}
</style>