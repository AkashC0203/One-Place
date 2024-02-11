<template>
  <div class="signup-container">
    <h2>Sign up</h2>
    <form @submit.prevent="signup">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" class="form-control" v-model.trim="firstName" :class="{ 'is-invalid': errors.firstName }" required>
        <div class="invalid-feedback" v-if="errors.firstName">{{ errors.firstName }}</div>
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" class="form-control" v-model.trim="lastName" :class="{ 'is-invalid': errors.lastName }" required>
        <div class="invalid-feedback" v-if="errors.lastName">{{ errors.lastName }}</div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" v-model.trim="email" :class="{ 'is-invalid': errors.email }" required>
        <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control" v-model.trim="password" :class="{ 'is-invalid': errors.password }" required>
        <div class="invalid-feedback" v-if="errors.password">{{ errors.password }}</div>
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Sign up</button>
      </div>
    </form>
    <br>
    <div>
      <button @click="$router.go(-1)">Back</button>      
    </div>
  </div>
</template>

<style>
.signup-container {
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

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  margin-top: 5px;
  font-size: 14px;
}
</style>

<script>
export default {
  data() 
  {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {},
    };
  },
  methods: {
    async validateForm() 
    {
      this.errors = {};

      if (!this.firstName) 
      {
        this.errors.firstName = 'Please enter your first name';
      } 
      else if (!/^[A-Za-z]+$/.test(this.firstName))
      {
        this.errors.firstName = 'Please enter a valid first name';
      }

      if (!this.lastName) 
      {
        this.errors.lastName = 'Please enter your last name';
      }
      else if (!/^[A-Za-z]+$/.test(this.lastName))
      {
        this.errors.lastName = 'Please enter a valid last name';
      }

      if (!this.email) 
      {
        this.errors.email = 'Please enter your email address';
      } 
      else if (!/\S+@\S+\.\S+/.test(this.email)) 
      {
        this.errors.email = 'Please enter a valid email address';
      }

      if (!this.password) 
      {
        this.errors.password = 'Please enter a password';
      } else if (this.password.length < 8)
      {
        this.errors.password = 'Password must be at least 8 characters long';
      }

      return Object.keys(this.errors).length === 0;
    },
    async signup() 
    {
      const isValid = await this.validateForm();
      if (isValid) 
      {
        try 
        {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password,
            }),
          });

          if (!response.ok) 
          {
            const errorData = await response.json();
            throw new Error(errorData.message);
          }
          localStorage.setItem('userEmail', this.email);
          this.$router.push('/config');
        } 
        catch (error) 
        {
          console.error(error);
        }
      }
    },
  },
};
</script>


