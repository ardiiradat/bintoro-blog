<template>
  <div class="container max-w-screen-xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Add New Blog</h1>
    <form @submit.prevent="addArticle">
      <div class="mb-4">
        <label class="block text-gray-700">Title</label>
        <input v-model="title" class="w-full border border-gray-300 p-2" type="text" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Image</label>
        <input
          @change="onFileChange"
          class="w-full border border-gray-300 p-2"
          type="file"
          accept="image/*"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Content</label>
        <textarea
          v-model="content"
          class="w-full border border-gray-300 p-2"
          rows="5"
          required
        ></textarea>
      </div>
      <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded">
        Add
      </button>
    </form>
  </div>
</template>

<script>
import { useBlogStore } from '../stores/blogStore'

export default {
  data() {
    return {
      title: '',
      content: '',
      imageUrl: ''
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageUrl = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    addArticle() {
      const blogStore = useBlogStore()
      const newArticle = {
        id: Date.now(),
        title: this.title,
        content: this.content,
        imageUrl: this.imageUrl,
        author: 'admin',
        createdAt: new Date()
      }
      blogStore.addArticle(newArticle)
      blogStore.saveArticles()
      this.$router.push('/')
    }
  }
}
</script>
