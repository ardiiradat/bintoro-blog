<template>
  <div>
    <HeaderComponent />
    <HeroBlog
      :title="article.title"
      subtitle="Blog"
      backgroundImage="https://bintoroarchitect.co.id/wp-content/uploads/2021/11/bintoroarchitect-Tips-and-Tricks.webp"
      :breadcrumbs="breadcrumbs"
    />
    <div class="container max-w-screen-xl mx-auto p-4 sm:p-6 md:p-6 lg:p-6 flex flex-wrap">
      <main class="w-full md:w-4/6 lg:w-4/6 p-4 sm:p-6 md:p-4 lg:p-4">
        <div v-if="article.imageUrl">
          <img
            :src="article.imageUrl"
            alt="Article Image"
            class="w-full h-auto object-cover pr-8 sm:pr-12"
          />
        </div>
        <div class="border border-gray-100 shadow-2xl p-8 sm:p-12">
          <h1 class="text-4xl font-bold mb-4">{{ article.title }}</h1>
          <p class="mb-8">
            <span class="text-sm font-normal text-gray-500">
              {{ article.formattedDate }}
            </span>
            <span class="text-sm font-normal text-gray-500 pl-8">
              {{ article.author }}
            </span>
          </p>
          <p class="text-base font-normal text-gray-600">{{ article.content }}</p>
        </div>
      </main>
      <aside class="w-full md:w-2/6 lg:w-2/6 p-4 sm:p-6 md:p-4 lg:p-4">
        <SidebarBlog />
      </aside>
    </div>
  </div>
</template>

<script>
import { useBlogStore } from '@/stores/blogStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HeaderComponent from './HeaderComponent.vue'
import SidebarBlog from './SidebarBlog.vue'
import HeroBlog from './HeroBlog.vue'
import { formatDate } from '@/helpers/dateFormatter'

export default {
  components: {
    HeaderComponent,
    HeroBlog,
    SidebarBlog
  },
  setup() {
    const blogStore = useBlogStore()
    const route = useRoute()
    const article = computed(() => {
      const foundArticle = blogStore.articles.find(
        (article) => article.id === parseInt(route.params.id)
      )
      return foundArticle
        ? {
            ...foundArticle,
            formattedDate: formatDate(foundArticle.createdAt)
          }
        : null
    })

    const breadcrumbs = computed(() => [
      { path: '/', text: 'Blog' },
      { path: route.fullPath, text: article.value ? article.value.title : 'Article' }
    ])

    return { article, breadcrumbs }
  },
  mounted() {
    window.scrollTo(0, 0)
  }
}
</script>
