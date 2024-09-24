export const useKeycloak = () => {
  const { $keycloak, $i18n } = useNuxtApp()

  const loginRedirectUrl = ref<string | null>(null)
  const logoutRedirectUrl = ref<string | null>(null)

  /**
   * Logs the user in using the idpHint 'bcsc', 'idir' or 'bceid' and an optional redirect URL.
   * @param idpHint - The identity provider hint to use for login.
   * @param redirect - An optional URL to redirect to after login. Defaults to location.origin + the current locale
   * @returns A promise that resolves when login is complete.
   */
  function login (idpHint: IdpHint, redirect?: string): Promise<void> {
    return $keycloak.login(
      {
        idpHint,
        redirectUri: redirect ?? loginRedirectUrl.value ?? `${location.origin}/${$i18n.locale.value}`
      }
    )
  }

  /**
   * Logs the user out with an optional redirect URL.
   * @param redirect - An optional URL to redirect to after logout. Defaults to location.origin + the current locale
   * @returns A promise that resolves when logout is complete.
   */
  function logout (redirect?: string): Promise<void> {
    resetPiniaStores()
    return $keycloak.logout({
      redirectUri: redirect ?? logoutRedirectUrl.value ?? `${location.origin}/${$i18n.locale.value}`
    })
  }

  const isAuthenticated = computed<boolean | undefined>(() => {
    if (!$keycloak) {
      return false
    }
    return $keycloak.authenticated
  })

  const kcUser = computed<KCUser>(() => {
    if ($keycloak && $keycloak.tokenParsed) {
      return {
        firstName: $keycloak.tokenParsed.firstname,
        lastName: $keycloak.tokenParsed.lastname,
        fullName: $keycloak.tokenParsed.name,
        userName: $keycloak.tokenParsed.username,
        email: $keycloak.tokenParsed.email,
        keycloakGuid: $keycloak.tokenParsed.sub || '',
        loginSource: $keycloak.tokenParsed.loginSource,
        roles: $keycloak.tokenParsed.realm_access?.roles || []
      }
    }
    return {} as KCUser
  })

  /**
   * Retrieves the current session token, with an optional force refresh.
   * @param forceRefresh - A boolean to force a token refresh.
   * @returns The session token or undefined if the token can't be retrieved.
   */
  async function getToken (forceRefresh = false): Promise<string | undefined> {
    const minValidity = forceRefresh ? -1 : 30
    return await $keycloak
      .updateToken(minValidity)
      .then((_refreshed) => {
        return $keycloak.token
      })
      .catch((error) => {
        console.error(`Failed to get session token: ${error}`)
        return undefined
      })
  }

  function setLoginRedirectUrl (url: string) {
    loginRedirectUrl.value = url
  }

  function setLogoutRedirectUrl (url: string) {
    logoutRedirectUrl.value = url
  }

  function clearLoginRedirectUrl () {
    loginRedirectUrl.value = null
  }

  function clearLogoutRedirectUrl () {
    logoutRedirectUrl.value = null
  }

  return {
    login,
    logout,
    getToken,
    clearLoginRedirectUrl,
    clearLogoutRedirectUrl,
    setLoginRedirectUrl,
    setLogoutRedirectUrl,
    isAuthenticated,
    kcUser,
    loginRedirectUrl,
    logoutRedirectUrl
  }
}
