import { type ApiError, ErrorCategory } from '#imports'
/** Manages connect account data */
export const useConnectAccountStore = defineStore('nuxt-core-connect-account-store', () => {
  const { $authApi } = useNuxtApp()
  const { kcUser, isAuthenticated } = useKeycloak()
  // selected user account
  const currentAccount = ref<Account>({} as Account)
  const userAccounts = ref<Account[]>([])
  const currentAccountName = computed<string>(() => currentAccount.value?.label || '')
  const pendingApprovalCount = ref<number>(0)
  const user = computed(() => kcUser.value)
  const userFirstName: Ref<string> = ref(user.value?.firstName || '-')
  const userLastName: Ref<string> = ref(user.value?.lastName || '')
  const userFullName = computed(() => `${userFirstName.value} ${userLastName.value}`)
  const errors = ref<ApiError[]>([])

  const isStaffOrSbcStaff = computed<boolean>(() => {
    if (!isAuthenticated.value) { return false }
    const currentAccountIsStaff = [AccountType.STAFF, AccountType.SBC_STAFF].includes(currentAccount.value.accountType)
    return currentAccountIsStaff || kcUser.value.roles.includes(UserRole.Staff)
  })

  /**
   * Checks if the current account or the Keycloak user has any of the specified roles.
   *
   * @param roles - An array of roles to check against the current account or Keycloak user roles.
   * @returns Returns `true` if the current account has one of the roles, or if the Keycloak user has one of the roles.
   *
   * @example
   * // Assuming the current account has the type 'admin' and the kcUser has the roles ['editor', 'viewer', 'admin']:
   * const rolesToCheck = ['admin', 'superadmin'];
   * const hasRequiredRole = hasRoles(rolesToCheck); // true
  */
  function hasRoles (roles: string[]): boolean {
    const currentAccountHasRoles = roles.includes(currentAccount.value.accountType)
    const kcUserHasRoles = roles.some(role => kcUser.value.roles.includes(role))
    return currentAccountHasRoles || kcUserHasRoles
  }

  // TODO: implement
  /** Get user information from AUTH */
  // async function getAuthUserProfile (identifier: string): Promise<KCUser> {
  //   const token = await getToken()
  //   return await $fetch<KCUser>(`${apiURL}/users/${identifier}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  // }

  // TODO: implement
  /** Update user information in AUTH with current token info */
  // async function updateAuthUserInfo (): Promise<void | KCUser> {
  //   const token = await getToken()
  //   return await $fetch<KCUser | void>(`${apiURL}/users`, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     },
  //     isLogin: true
  //   })
  // }

  // TODO: implement
  /** Set user name information */
  // async function setUserName () {
  //   if (kcUser.value?.loginSource === LoginSource.BCEID) {
  //     // get from auth
  //     const authUserInfo = await getAuthUserProfile('@me')
  //     if (authUserInfo) {
  //       userFirstName.value = authUserInfo.firstName
  //       userLastName.value = authUserInfo.lastName
  //     }
  //     return
  //   }
  // }

  /** Get the user's account list */
  async function getUserAccounts (keycloakGuid: string): Promise<Account[] | undefined> {
    try {
      const response = await $authApi<UserSettings[]>(`/users/${keycloakGuid}/settings`, {
        onResponseError ({ response }) {
          errors.value.push({
            statusCode: response.status || 500,
            message: response._data?.message || 'Error retrieving user accounts.',
            detail: response._data.detail || '',
            category: ErrorCategory.ACCOUNT_LIST
          })
        }
      })

      if (response) {
        return response.filter(userSettings => (userSettings.type === UserSettingsType.ACCOUNT)) as Account[]
      } else {
        return undefined
      }
    } catch (e) {
      logFetchError(e, 'Error retrieving user accounts')
      return undefined
    }
  }

  /** Set the user account list and current account */
  async function setAccountInfo () {
    if (kcUser.value?.keycloakGuid) {
      const response = await getUserAccounts(kcUser.value?.keycloakGuid)
      if (response && response[0] !== undefined) {
        userAccounts.value = response
        currentAccount.value = response[0]
      }
    }
  }

  /** Switch the current account to the given account ID if it exists in the user's account list */
  function switchCurrentAccount (accountId: string) {
    const account = userAccounts.value.find(account => account.id === accountId)
    if (account) {
      currentAccount.value = account
    }
  }

  async function getPendingApprovalCount (accountId: number, keycloakGuid: string): Promise<void> { // Promise<AxiosResponse<Count>>
    try {
      const response = await $authApi<{ count: number }>(`/users/${keycloakGuid}/org/${accountId}/notifications`, {
        onResponseError ({ response }) {
          errors.value.push({
            statusCode: response.status || 500,
            message: response._data.message || 'Error retrieving pending approvals.',
            detail: response._data.detail || '',
            category: ErrorCategory.PENDING_APPROVAL_COUNT
          })
        }
      })

      if (response) {
        pendingApprovalCount.value = response.count
      }
    } catch (e) {
      logFetchError(e, 'Error retrieving pending approvals')
    }
  }

  function $reset () {
    sessionStorage.removeItem('nuxt-core-connect-account-store')
    currentAccount.value = {} as Account
    userAccounts.value = []
    pendingApprovalCount.value = 0
    errors.value = []
  }

  return {
    currentAccount,
    currentAccountName,
    userAccounts,
    pendingApprovalCount,
    errors,
    userFullName,
    isStaffOrSbcStaff,
    // updateAuthUserInfo,
    hasRoles,
    setAccountInfo,
    getUserAccounts,
    switchCurrentAccount,
    getPendingApprovalCount,
    $reset
  }
},
{ persist: true } // persist in session storage
)
