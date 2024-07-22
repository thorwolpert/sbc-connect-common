import type { DropdownItem } from '#ui/types'

// handle navigation items and functionality
export function useConnectNav () {
  const config = useRuntimeConfig()
  const authWebUrl = config.public.authWebURL
  // const localePath = useLocalePath()
  const { t } = useI18n()
  const { login, logout, isAuthenticated, kcUser } = useKeycloak()
  const accountStore = useConnectAccountStore()

  /** return the correct account creation link based on auth state */
  function createAccountUrl (): string {
    if (isAuthenticated.value) {
      return authWebUrl + 'setup-account'
    } else {
      return authWebUrl + 'choose-authentication-method'
    }
  }

  const basicAccountOptions = computed<DropdownItem[]>(() => {
    const options: DropdownItem[] = [
      {
        label: 'n/a',
        slot: 'account',
        disabled: true
      }
    ]
    if ([LoginSource.BCEID, LoginSource.BCSC].includes(kcUser?.value.loginSource)) {
      options.push({
        label: t('btn.editProfile'),
        icon: 'i-mdi-account-outline',
        to: authWebUrl + 'userprofile'
      })
    }
    options.push({
      label: t('btn.logout'),
      icon: 'i-mdi-logout-variant',
      click: () => logout() // localePath(config.public.appBaseUrl) ?
    })
    return options
  })

  const accountSettingsOptions = computed<DropdownItem[]>(() => {
    const options: DropdownItem[] = [
      {
        label: 'n/a',
        slot: 'settings',
        disabled: true
      },
      {
        label: t('btn.accountInfo'),
        icon: 'i-mdi-information-outline',
        to: authWebUrl + `account/${accountStore.currentAccount.id}/settings/account-info`
      },
      {
        label: t('btn.teamMembers'),
        icon: 'i-mdi-account-group-outline',
        to: authWebUrl + `account/${accountStore.currentAccount.id}/settings/team-members`
      }
    ]
    if ([AccountType.PREMIUM, AccountType.SBC_STAFF, AccountType.STAFF].includes(accountStore.currentAccount.accountType)) {
      options.push({
        label: t('btn.transactions'),
        icon: 'i-mdi-file-document-outline',
        to: authWebUrl + `account/${accountStore.currentAccount.id}/settings/transactions`
      })
    }
    return options
  })

  const switchAccountOptions = computed<DropdownItem[]>(() => {
    const options: DropdownItem[] = [
      { label: 'n/a', slot: 'accounts', disabled: true }
    ]
    accountStore.userAccounts.forEach((account) => {
      const isActive = accountStore.currentAccount.id === account.id
      options.push({
        label: account.label,
        click: () => {
          if (!isActive && account.id) {
            accountStore.switchCurrentAccount(account.id)
          }
        },
        icon: isActive ? 'i-mdi-check' : ''
      })
    })
    return options
  })

  const createAccountOptions = computed<DropdownItem[]>(() => {
    if ([LoginSource.BCROS, LoginSource.IDIR].includes(kcUser?.value.loginSource)) {
      return []
    }
    return [{ label: t('btn.createAccount'), icon: 'i-mdi-plus', to: createAccountUrl() }]
  })

  const loggedInUserOptions = computed<DropdownItem[][]>(() => [
    basicAccountOptions.value,
    accountSettingsOptions.value,
    switchAccountOptions.value,
    createAccountOptions.value
  ])

  const loggedOutUserOptions = computed<DropdownItem[][]>(() => {
    return [
      [
        {
          label: 'n/a',
          slot: 'method',
          disabled: true
        }
      ],
      [
        {
          label: t('label.bcsc'),
          icon: 'i-mdi-account-card-details-outline',
          click: () => login(IdpHint.BCSC)
        },
        {
          label: t('label.bceid'),
          icon: 'i-mdi-two-factor-authentication',
          click: () => login(IdpHint.BCEID)
        },
        {
          label: t('label.idir'),
          icon: 'i-mdi-account-group-outline',
          click: () => login(IdpHint.IDIR)
        }
      ]
    ]
  })

  return {
    loggedInUserOptions,
    loggedOutUserOptions,
    createAccountUrl
  }
}
