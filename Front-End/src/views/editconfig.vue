<template>
    <div>
      <h1>Edit Personalized Setting</h1>
      <form @submit.prevent="saveConfig">
        <label for="category">Category:</label>
        <select id="category" v-model="category">
          <option value="">Select a category</option>
          <option value="general">General</option>
          <option value="world">World</option>
          <option value="nation">Nation</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="entertainment">Entertainment</option>
          <option value="sports">Sports</option>
          <option value="science">Science</option>
          <option value="health">Health</option>
        </select>
        <br>
  
        <label for="lang">Language:</label>
        <select id="lang" v-model="lang">
          <option value="">Select a language</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
        </select>
        <br>
  
        <label for="country">Country:</label>
        <select id="country" v-model="country">
          <option value="">Select a country</option>
          <option value="in">India</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
        </select>
        <br>
  
        <label for="max">Max Results:</label>
        <input type="number" id="max" v-model="max"><br>
  
        <button type="submit">Save</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'App',
    data() {
      return {
        category: '',
        lang: '',
        country: '',
        max: '',
        email: '',
        message: '',
      };
    },
methods: {
    saveConfig() {
      if (!this.category || !this.lang || !this.country) {
        this.message = 'Missing Fields';
        return;
      }

      const configObj = {
        category: this.category,
        lang: this.lang,
        country: this.country,
        max: this.max,
        email: localStorage.getItem('userEmail'),
      };

      axios.post('/api/editgnewsconfig', configObj)
        .then(response => {
          if (response.data.status === 'success') {
            Swal.fire({
              title: 'Success!',
              text: 'Configuration saved successfully',
              icon: 'success',
              confirmButtonText: 'Continue'
            }).then((result) => {
              if (result.isConfirmed) {
                this.$router.push('/articles');
              }
            });
          } else {
            this.message = 'Failed to save configuration';
          }
        })
        .catch(error => {
          console.error(error);
          this.message = 'Failed to save configuration';
        });
    }
  }
};
</script>
<style>
div {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

label {
  font-size: 1.2rem;
}

select {
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="number"] {
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  background-color: #0077ff;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0055cc;
}

</style>  