<template>
  <div class="articles-container">
    <h1 class="title">Top Headlines</h1>
    <div class="articles-wrapper">
      <div v-if="currentArticle" class="article">
        <section>
        <h2 class="article-title">{{ currentArticle.title }}</h2>
        <span>{{ formatDate(currentArticle.publishedAt) }}</span>
        <img :src="currentArticle.image" class="article-image" />
        <p class="article-desc">{{ currentArticle.desc }}</p>
        <p class="article-content">{{ currentArticle.content }}</p>
        <a :href="currentArticle.url" class="article-url">{{ currentArticle.url }}</a>
        </section>
      </div>
    </div>
    <div class="nav-buttons">
      <button @click="showPreviousArticle" :disabled="currentIndex <= 0">Previous</button>
      <button @click="showNextArticle" :disabled="currentIndex >= articles.length - 1">Next</button>
      <router-link to="/articlesconfig">Favourites</router-link>
      <router-link to="/newsarchival">Search News</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      currentIndex: 0,
    };
  },
  
  mounted() {
    fetch('/api/newsx')
      .then((response) => response.json())
      .then((data) => {
        this.articles = data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  computed: {
    currentArticle() {
      return this.articles[this.currentIndex];
    },
  },
  methods: {
    showNextArticle() {
      this.currentIndex = Math.min(this.currentIndex + 1, this.articles.length - 1);
    },
    showPreviousArticle() {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
    },
    formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
  },
  },
};
</script>

<style scoped>
div.nav-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

div.nav-buttons button {
  background-color: #333;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

div.nav-buttons button:disabled {
  background-color: #ddd;
  cursor: default;
}

div.nav-buttons button:hover:not(:disabled) {
  background-color: #555;
}

div.nav-buttons router-link {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
}

div.nav-buttons router-link:hover {
  background-color: #ddd;
}

.articles-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 36px;
  margin-bottom: 30px;
}

.articles-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.article {
  flex: 0 0 100%;
  margin-bottom: 40px;
  position: relative;
}

.article:not(:last-child):after {
  content: "";
  position: absolute;
  top: 50%;
  right: -20px;
  width: 20px;
  height: 20px;
  background-size: contain;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
}

.article:not(:first-child):before {
  content: "";
  position: absolute;
  top: 50%;
  left: -20px;
  width: 20px;
  height: 20px;
  background-size: contain;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
}

.article-title {
  font-size: 28px;
  margin-bottom: 10px;
}

.article-desc {
  font-size: 18px;
  margin-bottom: 10px;
}

.article-content {
  font-size: 16px;
  margin-bottom: 10px;
}

.article-publishedAt {
  font-size: 14px;
  margin-bottom: 10px;
}

.article-url {
  font-size: 14px;
  margin-bottom: 10px;
  display: block;
}

.article-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

</style>
