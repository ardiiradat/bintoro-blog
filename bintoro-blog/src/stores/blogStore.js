import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    articles: []
  }),
  actions: {
    addArticle(article) {
      this.articles.push(article)
    },
    loadArticles() {
      // Simulate loading articles from a persistent source
      this.articles = JSON.parse(localStorage.getItem('articles')) || []
    },
    saveArticles() {
      localStorage.setItem('articles', JSON.stringify(this.articles))
    }
  }
})
