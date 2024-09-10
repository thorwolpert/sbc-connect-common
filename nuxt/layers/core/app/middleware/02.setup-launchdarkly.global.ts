export default defineNuxtRouteMiddleware(() => {
  // initialize ldarkly
  if (import.meta.client) {
    useConnectLaunchdarklyStore().init()
  }
})
