export default defineAppConfig({
  myLayer: {
    name: 'Hello from Nuxt layer'
  },
  ui: {
    primary: 'bcGovBlue',
    gray: 'bcGovGray'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
