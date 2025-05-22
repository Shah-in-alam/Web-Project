<template>
  <div class="payment-page-bg">
    <div class="payment-container">
      <div class="payment-gateway">
        <div class="gateway-header">
          <img src="https://img.icons8.com/color/48/000000/bank-card-back-side.png" alt="Card" class="gateway-icon" />
          <h2>Secure Payment</h2>
        </div>
        <p class="gateway-desc">Complete your payment to confirm your booking.</p>
        <form @submit.prevent="payNow" class="gateway-form">
          <div class="input-row">
            <label>Card Number</label>
            <input type="text" maxlength="16" placeholder="1234 5678 9012 3456" required />
          </div>
          <div class="input-row input-row-half">
            <div>
              <label>Expiry</label>
              <input type="text" maxlength="5" placeholder="MM/YY" required />
            </div>
            <div>
              <label>CVV</label>
              <input type="password" maxlength="3" placeholder="123" required />
            </div>
          </div>
          <button class="pay-btn" type="submit">
            <span>Pay Now</span>
            <span class="pay-arrow">→</span>
          </button>
        </form>
        <p v-if="success" class="success-msg">Payment Successful! 🎉</p>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from './Footer.vue'
export default {
  name: 'PaymentPage',
  components: { AppFooter },
  data() {
    return {
      success: false
    }
  },
  methods: {
    payNow() {
      this.success = true;
      setTimeout(() => {
        this.$router.push('/');
      }, 2000);
    }
  }
}
</script>

<style scoped>
.payment-page-bg {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%);
}
.payment-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.payment-gateway {
  background: #fff;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60,120,60,0.13);
  width: 370px;
  text-align: center;
  margin: 2rem 0;
  position: relative;
  animation: fadeInUp 0.5s;
}
.gateway-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.7rem;
}
.gateway-icon {
  width: 48px;
  margin-bottom: 0.3rem;
}
.gateway-desc {
  color: #388e3c;
  margin-bottom: 1.2rem;
  font-size: 1.07rem;
}
.gateway-form {
  margin-bottom: 0.5rem;
}
.input-row {
  margin-bottom: 1.1rem;
  text-align: left;
}
.input-row label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.3rem;
  color: #388e3c;
}
.input-row input {
  width: 100%;
  padding: 9px 12px;
  border: 1.5px solid #b2dfdb;
  border-radius: 7px;
  font-size: 1.05rem;
  background: #f7faf9;
  transition: border 0.2s;
}
.input-row input:focus {
  border-color: #43a047;
  outline: none;
}
.input-row-half {
  display: flex;
  gap: 1rem;
}
.input-row-half > div {
  flex: 1;
}
.pay-btn {
  background: linear-gradient(90deg, #43a047 0%, #388e3c 100%);
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 12px 0;
  width: 100%;
  font-size: 1.13rem;
  font-weight: bold;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(60, 120, 60, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
}
.pay-btn:hover {
  background: linear-gradient(90deg, #388e3c 0%, #43a047 100%);
  box-shadow: 0 4px 16px rgba(60, 120, 60, 0.13);
}
.pay-arrow {
  font-size: 1.3rem;
  margin-left: 2px;
}
.success-msg {
  color: #388e3c;
  margin-top: 1.2rem;
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
}
</style>