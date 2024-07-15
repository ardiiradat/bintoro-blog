<template>
  <div>
    <HeaderComponent />
    <HeroBlog
      title="Blog"
      subtitle="Latest articles from our blog"
      backgroundImage="https://bintoroarchitect.co.id/wp-content/uploads/2021/11/bintoroarchitect-Tips-and-Tricks.webp"
      :breadcrumbs="breadcrumbs"
    />
    <div class="container max-w-screen-xl mx-auto p-4 sm:p-6 md:p-6 lg:p-6 flex flex-wrap">
      <main class="w-full md:w-4/6 lg:w-4/6 p-4 sm:p-6 md:p-4 lg:p-4">
        <div v-if="articles.length === 0" class="text-gray-600 text-xl text-semibold pt-4 mb-24">
          No articles available.
        </div>
        <div v-for="article in articles" :key="article.id" class="mb-8">
          <router-link
            :to="{ name: 'view', params: { id: article.id } }"
            class="text-xl font-semibold text-gray-700 hover:text-amber-500"
          >
            <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
              <div>
                <div v-if="article.imageUrl" class="h-96">
                  <img
                    :src="article.imageUrl"
                    alt="Thumbnail"
                    class="w-full h-full object-cover pr-8 sm:pr-12"
                  />
                </div>
                <div class="border overflow-hidden shadow-xl">
                  <div class="px-4 pt-4">
                    {{ article.title }}
                  </div>
                  <p>
                    <span class="text-sm font-normal text-gray-500 p-4">
                      {{ article.formattedDate }}
                    </span>
                    <span class="text-sm font-normal text-gray-500 p-4">
                      {{ article.author }}
                    </span>
                  </p>
                  <p class="text-sm font-normal text-gray-500 p-4">
                    {{ article.content.slice(0, 350)
                    }}{{ article.content.length > 100 ? '...' : '' }}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </main>
      <aside class="w-full md:w-2/6 lg:w-2/6 p-4 sm:p-6 md:p-4 lg:p-4">
        <SidebarBlog />
      </aside>
    </div>
    <div v-if="isLoading" class="text-center my-8">Loading more articles...</div>
  </div>
</template>

<script>
import { useBlogStore } from '@/stores/blogStore'
import { computed, onMounted, ref, onUnmounted } from 'vue'
import HeaderComponent from './HeaderComponent.vue'
import HeroBlog from './HeroBlog.vue'
import SidebarBlog from './SidebarBlog.vue'
import { formatDate } from '@/helpers/dateFormatter'

export default {
  components: {
    HeaderComponent,
    HeroBlog,
    SidebarBlog
  },
  setup() {
    const blogStore = useBlogStore()
    const isLoading = ref(false)
    const articles = ref([])

    const loadMore = () => {
      if (!isLoading.value && articles.value.length < blogStore.totalArticles) {
        isLoading.value = true
        setTimeout(() => {
          const newArticles = blogStore.loadArticles()
          articles.value = [...articles.value, ...newArticles]
          isLoading.value = false
        }, 1000) // Simulate a 1-second loading delay
      }
    }

    const handleScroll = () => {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100
      if (bottomOfWindow) {
        loadMore()
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      blogStore.initializeArticles()
      loadMore() // Load initial articles
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const formattedArticles = computed(() =>
      articles.value.map((article) => ({
        ...article,
        formattedDate: formatDate(article.createdAt)
      }))
    )

    const breadcrumbs = computed(() => [{ path: '/', text: 'Blog' }])
    return { articles: formattedArticles, breadcrumbs, isLoading }
  }
}
</script>
