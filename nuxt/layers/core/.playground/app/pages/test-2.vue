<script setup lang="ts">
setBreadcrumbs([
  { label: 'test 2nd page', to: useRuntimeConfig().public.registryHomeURL }
])
</script>
<template>
  <div class="flex flex-col gap-8 border border-black px-2 py-8">
    <h1>
      Testing 2 page
    </h1>
  </div>
</template>
