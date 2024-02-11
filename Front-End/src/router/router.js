import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import Login from '../views/login.vue';
import Signup from '../views/signup.vue';
import Articles from '../views/articles.vue';
import Config from '../views/config.vue'
import Articlesconfig from '../views/acticlesconfig.vue'
import NewsArchival from '../views/NewsArchival.vue'
import searchArchival from '../views/searchArchival.vue'
import editconfig from '../views/editconfig.vue'
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/config',
      name: 'config',
      component: Config
    },
    {
      path: '/newsarchival',
      name: 'newsarchival',
      component: NewsArchival,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editconfig',
      name: 'editconfig',
      component: editconfig,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/newsresults',
      name: 'newsresults',
      component: searchArchival,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/articlesconfig',
      name: 'articlesconfig',
      component: Articlesconfig,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
