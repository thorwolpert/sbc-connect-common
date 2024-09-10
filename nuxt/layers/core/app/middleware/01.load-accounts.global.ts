export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.client) { // only run on client
    const { isAuthenticated, kcUser } = useKeycloak()
    if (isAuthenticated.value) {
      const accountStore = useConnectAccountStore()
      if (accountStore.userAccounts.length === 0) { // only try loading accounts if there is none
        await accountStore.setAccountInfo()
      }
      if (accountStore.currentAccount.id && kcUser.value.keycloakGuid) { // check for pending approvals
        await accountStore.getPendingApprovalCount(parseInt(accountStore.currentAccount.id), kcUser.value.keycloakGuid)
      }
    }
  }
})
