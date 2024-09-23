<script setup lang="ts">
const ldStore = useConnectLaunchdarklyStore()
const { $sanitize } = useNuxtApp()

defineProps({
  message: { type: String, default: '' }
})

const systemMessage = ref('')

onMounted(async () => {
  await ldStore.ldClient?.waitUntilReady()
  systemMessage.value = $sanitize(ldStore.getStoredFlag('banner-text'))
})
</script>
<template>
  <div class="flex justify-center bg-bcGovColor-navDivider px-5 py-2">
    <!-- eslint-disable vue/no-v-html tailwindcss/no-custom-classname -->
    <span class="vhtml mx-auto max-w-bcGovLg text-bcGovColor-darkGray" v-html="systemMessage" />
  </div>
</template>
<!-- must style globally for vhtml style to work  -->
<style>
.vhtml > a {
  color: #212529;
  text-decoration: underline;
}
</style>
