// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  devtools: { enabled: false },

  compatibilityDate: "2024-07-16",

  future: {
    compatibilityVersion: 4
  },

  css: [join(currentDir, "./app/assets/css/main.css")],

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@pinia/nuxt",
    '@pinia-plugin-persistedstate/nuxt',
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    '@nuxtjs/eslint-module',
    '@nuxt/test-utils/module'
  ],

  ui: {
    icons: ["mdi"],
  },

  alias: {
    BCGovFonts: join(currentDir, "./public/fonts/BCSans"),
    BCGovLogoSmEn: join(
      currentDir,
      "./public/BCGovLogo/gov_bc_logo_vert_en.png"
    ),
    BCGovLogoSmFr: join(
      currentDir,
      "./public/BCGovLogo/gov_bc_logo_vert_fr.png"
    ),
    BCGovLogoLgEn: join(
      currentDir,
      "./public/BCGovLogo/gov_bc_logo_horiz_en.png"
    ),
    BCGovLogoLgFr: join(
      currentDir,
      "./public/BCGovLogo/gov_bc_logo_horiz_fr.png"
    ),
  },

  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  vite: {
    optimizeDeps: {
      include: ['keycloak-js', 'js-sha256']
    }
  }
})