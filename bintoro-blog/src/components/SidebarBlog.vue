<template>
  <aside class="p-4">
    <h2 class="text-2xl font-medium mb-4">Artikel Terbaru</h2>
    <ul>
      <li v-for="article in latestArticles" :key="article.id" class="mb-4">
        <div class="flex items-start py-2">
          <img :src="article.imageUrl" alt="Thumbnail" class="w-24 h-24 mr-4 object-cover" />
          <div>
            <h3 class="text-md font-medium hover:text-amber-500 leading-6">
              <router-link :to="{ name: 'view', params: { id: article.id } }">{{
                article.title
              }}</router-link>
            </h3>
            <p class="text-gray-600 text-sm mt-2">
              <i>By {{ article.author }}</i>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script>
import { useBlogStore } from '../stores/blogStore'
import { computed } from 'vue'

export default {
  setup() {
    const blogStore = useBlogStore()
    const latestArticles = computed(() => blogStore.articles.slice(-3).reverse())
    return { latestArticles }
  }
}
</script>
