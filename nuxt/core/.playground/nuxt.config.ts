export default defineNuxtConfig({
  extends: ['..'],
  modules: ['@nuxtjs/eslint-module', '@nuxt/test-utils/module', "@nuxt/image"],
  compatibilityDate: "2024-07-16",
  future: {
    compatibilityVersion: 4
  },
})