<template>
  <div class="search-container">
    <div>
        <button @click="$router.go(-1)">Back</button>
    </div>
    <h1 class="title">Search News Articles</h1>
    <form class="search-box" @submit.prevent="searchArticles">
      <input type="text" v-model="searchKeyword" placeholder="Search for news articles" />
      <button type="submit">Search</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchKeyword: '',
    };
  },
  methods: {
    searchArticles() {
      localStorage.setItem('searchKeyword', this.searchKeyword);
      this.$router.push('/newsresults');
    },
  },
};
</script>

<style>
  .search-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    font-size: 36px;
    text-align: center;
    margin-bottom: 30px;
  }

  .search-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .search-box input[type="text"] {
    font-size: 16px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    flex: 1;
  }

  .search-box button[type="submit"] {
    background-color: #333;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
    transition: background-color 0.2s ease-in-out;
  }

  .search-box button[type="submit"]:hover {
    background-color: #555;
  }

  button {
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

  button:hover {
    background-color: #555;
  }
</style>

