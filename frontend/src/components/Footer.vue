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
  background: linear-gradient(90deg, #43a047 0%, #388e3c 100%);
  color: #fff;
  padding: 1.5rem 0 1rem 0;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
  margin-top: 2rem;
  box-shadow: 0 -2px 16px rgba(60, 60, 60, 0.09);
  border-top: 3px solid #b2ff59;
  letter-spacing: 0.03em;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer-links {
  margin: 0.3rem 0;
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: #fff;
  text-decoration: none;
  font-size: 1.08rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
  background: rgba(255,255,255,0.04);
}

.footer-link:hover {
  background: #b2ff59;
  color: #2e7d32;
  text-decoration: none;
}

.footer-social {
  margin-top: 0.2rem;
  display: flex;
  gap: 1.2rem;
}

.footer-social a {
  color: #fff;
  background: rgba(255,255,255,0.08);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(60, 120, 60, 0.07);
}

.footer-social a:hover {
  background: #b2ff59;
  color: #2e7d32;
  transform: translateY(-3px) scale(1.08);
}

@media (max-width: 600px) {
  .footer-content {
    gap: 0.7rem;
  }
  .footer-links {
    gap: 0.7rem;
    font-size: 0.98rem;
  }
  .footer-social a {
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
  }
}
</style>