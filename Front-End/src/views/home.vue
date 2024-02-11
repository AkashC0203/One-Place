<style>
  .links {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
  }

  h1 {
    text-align: center;
    margin-top: 50px;
  }
</style>

<template>
  <div class="background-image">
    <h1>Welcome to One - Place</h1>
    <div class="links">
      <button @click="goToLogin">Login</button>
      <button @click="goToSignup">Signup</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToSignup() {
      this.$router.push('/signup');
    }
  }
};
</script>
