import { FetchError, ErrorCategory } from '#imports'
/** Manages connect account data */
export const useConnectAccountStore = defineStore('nuxt-core-connect-account-store', () => {
  const apiURL = useRuntimeConfig().public.authApiURL
  const { getToken, kcUser } = useKeycloak()
  // selected user account
  const currentAccount = ref<Account>({} as Account)
  const userAccounts = ref<Account[]>([])
  const currentAccountName = computed<string>(() => currentAccount.value?.label || '')
  const pendingApprovalCount = ref<number>(0)
  const errors = ref<FetchError[]>([])

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
      const token = await getToken()
      const response = await $fetch<UserSettings[]>(`${apiURL}/users/${keycloakGuid}/settings`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
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
      console.error('Error retrieving user accounts.', e)
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
      const token = await getToken()
      const response = await $fetch<{ count: number }>(`${apiURL}/users/${keycloakGuid}/org/${accountId}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
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
      console.error('Error retrieving pending approvals.', e)
    }
  }

  function $reset () {
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
    // updateAuthUserInfo,
    setAccountInfo,
    getUserAccounts,
    switchCurrentAccount,
    getPendingApprovalCount,
    $reset
  }
},
{ persist: true } // persist in session storage
)
