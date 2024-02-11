<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/HeaderComponent.vue';
import { computed, onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'App',
  components: {
    Header,
  },
  mounted() {
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('userEmail', '');
    localStorage.setItem('isFirstTimeUser', false);
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      isLoggedIn: false,
      userEmail: '',
      isFirstTimeUser: false,
    });

    const logout = () => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.userEmail = '';
      state.isFirstTimeUser = false;
      router.push('/');
    };

    const isLoggedIn = computed(() => state.isLoggedIn);
    const userEmail = computed(() => state.userEmail);

    onMounted(() => {
      state.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      state.userEmail = localStorage.getItem('userEmail') || '';
      state.isFirstTimeUser = localStorage.getItem('isFirstTimeUser') === 'true';
    });

    watch(() => route.path, () => {
      state.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      state.userEmail = localStorage.getItem('userEmail') || '';
      state.isFirstTimeUser = localStorage.getItem('isFirstTimeUser') === 'true';
    });
    router.beforeEach((to, from, next) => {
      if (state.isLoggedIn && (to.name === 'Login' || to.name === 'Signup' || to.name === 'Config')) {
        next('/');
      } else if (state.isLoggedIn && to.name === 'Login') {
        next('/');
      } else {
        next();
      }
    });
    return { isLoggedIn, userEmail, logout };
  },
};
</script>