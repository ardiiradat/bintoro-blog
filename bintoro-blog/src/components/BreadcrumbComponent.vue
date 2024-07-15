<template>
  <nav class="bg-white p-4">
    <div class="container mx-auto">
      <ol class="list-reset flex text-gray-500">
        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
          <router-link :to="crumb.path" class="hover:text-blue-500">{{ crumb.text }}</router-link>
          <span v-if="index < breadcrumbs.length - 1" class="mx-2">/</span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      required: true
    }
  }
}
</script>
