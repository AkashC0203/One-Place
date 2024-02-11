<template>
  <header>
    <div class="header-left">
      <nav class="nav-menu">
        <router-link to="/articles">Articles</router-link>
      </nav>
    </div>
    <div class="header-right">
      <div v-if="isLoggedIn" class="user-info">
        <p>{{ userEmail }}</p>
        <button @click="logout" class="nav-button" style="display:inline-block">Logout</button>
        <router-link to="/editconfig" class="nav-button" style="display:inline-block">Edit Config</router-link>
      </div>
      <div v-else class="user-info">
        <router-link to="/login" class="nav-link">Login</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'Header',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      isLoggedIn: false,
      userEmail: '',
    });

    const logout = () => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.userEmail = '';
      router.push('/');
    };

    onMounted(() => {
      state.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      state.userEmail = localStorage.getItem('userEmail') || '';
    });

    watch(() => route.path, () => {
      state.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      state.userEmail = localStorage.getItem('userEmail') || '';
    });

    const isLoggedIn = computed(() => state.isLoggedIn);
    const userEmail = computed(() => state.userEmail);

    return { isLoggedIn, userEmail, logout };
  },
};
</script>

<style>
header {
  background-color: #333;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
}


.nav-menu {
  display: flex;
  list-style: none;
}

.nav-menu li {
  margin-right: 20px;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}
.nav-link {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  color: #ddd;
  background-color: #444;
}

.nav-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

.nav-button:hover {
  background-color: #0069d9;
}
.nav-menu a:hover {
  color: #ddd;
  background-color: #444;
}
nav ul {
  display: flex;
  list-style: none;
}

nav li {
  margin-right: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

nav a:hover {
  color: #ddd;
  background-color: #444;
}

.login-link {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.login-link:hover {
  color: #ddd;
  background-color: #444;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0069d9;
}
</style>


