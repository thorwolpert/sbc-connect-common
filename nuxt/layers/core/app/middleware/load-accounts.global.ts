export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.client) {
    const { isAuthenticated } = useKeycloak()
    if (isAuthenticated.value) {
      const accountStore = useConnectAccountStore()
      if (accountStore.userAccounts.length === 0) {
        await accountStore.setAccountInfo()
      }
    }
  }
})
