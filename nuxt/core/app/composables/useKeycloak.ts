export const useKeycloak = () => {
  const { $keycloak, $i18n } = useNuxtApp()

  function login (idpHint: IdpHint, redirect?: string): Promise<void> {
    return $keycloak.login(
      {
        idpHint,
        redirectUri: redirect ?? `${location.origin}/${$i18n.locale.value}`
      }
    )
  }

  function logout (redirect?: string): Promise<void> {
    return $keycloak.logout({
      redirectUri: redirect ?? `${location.origin}/${$i18n.locale.value}`
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

  return {
    login,
    logout,
    getToken,
    isAuthenticated,
    kcUser
  }
}
