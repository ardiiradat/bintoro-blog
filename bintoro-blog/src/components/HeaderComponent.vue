<template>
  <header :class="headerClass" class="sticky top-0 w-full z-10 transition-all duration-300">
    <div class="container max-w-screen-xl mx-auto p-4 flex justify-between items-center">
      <div class="w-full flex items-center justify-between">
        <img :src="logoSrc" alt="Logo" class="h-auto w-40 mr-4" />
        <nav class="hidden md:flex space-x-4 items-center gap-8">
          <router-link to="/" :class="textSticky" class="font-medium">Home</router-link>
          <router-link to="/blog" :class="textSticky" class="font-medium">Blog</router-link>
          <router-link
            to="/add"
            class="inline-block bg-amber-600 text-white py-2 px-4 rounded-lg shadow hover:bg-amber-500 transition-colors"
            >Add New Blog</router-link
          >
        </nav>
      </div>
      <div class="md:hidden flex">
        <button @click="toggleMenu" class="text-gray-800 focus:outline-none">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="#d97706"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div v-if="isMenuOpen" class="fixed inset-0 bg-white z-20 flex flex-col p-4">
        <button @click="toggleMenu" class="self-end mb-4 text-gray-800 focus:outline-none">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="#d97706"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <nav class="flex flex-col space-y-4">
          <router-link @click="toggleMenu" to="/" class="text-gray-800 hover:text-amber-500"
            >Home</router-link
          >
          <router-link @click="toggleMenu" to="/blog" class="text-gray-800 hover:text-amber-500"
            >Blog</router-link
          >
          <router-link
            @click="toggleMenu"
            to="/add"
            class="inline-block bg-amber-600 text-white py-2 px-4 rounded-lg shadow hover:bg-amber-500 transition-colors text-center"
            >Add New Blog</router-link
          >
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      isScrolled: false
    }
  },
  computed: {
    headerClass() {
      return this.isScrolled ? 'bg-white shadow-lg ' : 'bg-neutral-950'
    },
    textSticky() {
      return this.isScrolled
        ? 'text-gray-900 hover:text-amber-500'
        : 'text-gray-100 hover:text-amber-500'
    },
    logoSrc() {
      return this.isScrolled ? '/bintoro-logo-dark.webp' : '/bintoro-logo.webp'
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
}
</style>
