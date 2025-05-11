<template>
  <footer class="footer">
    <div class="footer-content">
      <span>© 2025 Campaign Management System</span>
      <div class="footer-links">
        <router-link to="/about" class="footer-link">About Us</router-link>
        <router-link to="/contact" class="footer-link">Contact Us</router-link>
      </div>
      <div class="footer-social">
        <a href="https://x.com" target="_blank" aria-label="X"><i class="fab fa-x-twitter"></i></a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
      </div>
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
  background: linear-gradient(90deg, #43a047, #388e3c);
  color: #fff;
  padding: 1.2rem 0 0.7rem 0;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
  margin-top: 2rem;
  box-shadow: 0 -2px 8px rgba(60, 60, 60, 0.07);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.footer-links {
  margin: 0.2rem 0;
}

.footer-link {
  color: #fff;
  text-decoration: underline;
  font-size: 1rem;
  margin: 0 10px;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #b2ff59;
}

.footer-social {
  margin-top: 0.2rem;
}

.footer-social a {
  color: #fff;
  margin: 0 10px;
  font-size: 1.6rem;
  transition: color 0.3s;
}

.footer-social a:hover {
  color: #b2ff59;
}
</style>