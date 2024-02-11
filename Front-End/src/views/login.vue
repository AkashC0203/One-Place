<template>
  <div class="login-container">
    <h2>Login</h2>
    <form>
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>
      <p class="signup-link">
        New user? <router-link to="/signup">Sign up here</router-link>.
      </p>
    </form>
    <div>
      <button @click="$router.go(-1)">Back</button>      
    </div>
  </div>
</template>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 300px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0069d9;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() 
    {
      try 
      {
        const response = await axios.post('/api/login', {
          email: this.email,
          password: this.password,
        });
        const { token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userEmail', this.email);
        this.$router.push('/articles');
      } 
      catch (error) 
      {
        if (error.response.status === 401) 
        {
          alert('Invalid email or password');
        } 
        else 
        {
          console.error(error);
        }
      }
    },
  },
};
</script>
