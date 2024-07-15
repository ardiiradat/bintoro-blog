<template>
  <div>
    <HeaderComponent />
    <HeroBlog
      title="News & Articles"
      subtitle="Latest articles from our blog"
      backgroundImage="https://bintoroarchitect.co.id/wp-content/uploads/2021/11/bintoroarchitect-Tips-and-Tricks.webp"
      :breadcrumbs="breadcrumbs"
    />
    <div class="container max-w-screen-xl mx-auto p-6 flex flex-wrap">
      <main class="w-full md:w-4/6 lg:w-4/6 p-4">
        <div v-if="articles.length === 0" class="text-center text-gray-600">
          No articles available!
        </div>
        <div v-for="article in articles" :key="article.id" class="mb-16">
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
                    class="w-full h-full object-cover pr-10"
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
                    {{ article.content.slice(0, 500)
                    }}{{ article.content.length > 100 ? '...' : '' }}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </main>
      <aside class="w-full md:w-2/6 lg:w-2/6 p-4">
        <SidebarBlog />
      </aside>
    </div>
  </div>
</template>

<script>
import { useBlogStore } from '@/stores/blogStore'
import { computed } from 'vue'
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
    blogStore.loadArticles()
    const articles = computed(() => blogStore.articles)
    const formattedArticles = computed(() =>
      articles.value.map((article) => ({
        ...article,
        formattedDate: formatDate(article.createdAt)
      }))
    )
    const breadcrumbs = computed(() => [{ path: '/', text: 'Blog' }])
    return { articles: formattedArticles, breadcrumbs }
  },

  mounted() {
    window.scrollTo(0, 0)
  }
}
</script>
