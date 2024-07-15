<template>
  <section
    class="page-title h-screen flex items-center"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="container px-8 sm:px-16 mx-auto max-w-screen-xl">
      <div class="mx-auto flex flex-col items-start">
        <div class="inner-container text-center">
          <div class="title-box">
            <h1 class="text-5xl font-medium text-white text-left">{{ title }}</h1>
          </div>
        </div>
      </div>

      <div class="mx-auto flex flex-col items-start md:items-end mt-24">
        <ul class="bread-crumb flex justify-center mt-4 text-white">
          <li
            v-for="(crumb, index) in breadcrumbs"
            :key="index"
            class="breadcrumb-item flex items-center"
          >
            <router-link :to="crumb.path" class="hover:text-amber-500 font-bold">{{
              crumb.text
            }}</router-link>
            <span v-if="index < breadcrumbs.length - 1" class="mx-2">/</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    backgroundImage: {
      type: String,
      required: true
    },
    breadcrumbs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.page-title {
  background-size: cover;
  background-position: center;
}
</style>
