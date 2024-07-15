import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    articles: JSON.parse(localStorage.getItem('articles')) || [],
    currentPage: 0,
    articlesPerPage: 2,
    totalArticles: JSON.parse(localStorage.getItem('articles'))?.length || 0
  }),
  actions: {
    loadArticles() {
      const start = this.currentPage * this.articlesPerPage
      const end = start + this.articlesPerPage
      const newArticles = this.articles.slice(start, end)
      this.currentPage += 1
      return newArticles
    },
    addArticle(article) {
      this.articles.push(article)
      this.totalArticles += 1
      localStorage.setItem('articles', JSON.stringify(this.articles))
    },
    initializeArticles() {
      const storedArticles = JSON.parse(localStorage.getItem('articles'))
      if (storedArticles) {
        this.articles = storedArticles
        this.totalArticles = storedArticles.length
      }
    }
  }
})
