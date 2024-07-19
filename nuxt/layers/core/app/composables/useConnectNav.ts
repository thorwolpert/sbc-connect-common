import type { DropdownItem } from '#ui/types'

// handle navigation items and functionality
export function useConnectNav () {
  const config = useRuntimeConfig()
  // const localePath = useLocalePath()
  const { t } = useI18n()
  const { login, logout, isAuthenticated, kcUser } = useKeycloak()
  // const accountStore = useAccountStore()

  /** redirect to the correct creation screen based on auth state */
  function createAccountUrl () {
    if (isAuthenticated.value) {
      return config.public.authWebURL + 'setup-account'
    } else {
      return config.public.authWebURL + 'choose-authentication-method'
    }
  }

  const basicAccountOptions = computed(() => {
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
        to: config.public.authWebURL + 'userprofile'
      })
    }
    options.push({
      label: t('btn.logout'),
      icon: 'i-mdi-logout-variant',
      click: () => logout() // localePath(config.public.appBaseUrl) ?
    })
    return options
  })

  const accountSettingsOptions = computed(() => {
    const options: DropdownItem[] = [
      { label: 'n/a', slot: 'settings', disabled: true },
      { label: t('btn.accountInfo'), icon: 'i-mdi-information-outline', to: config.public.authWebURL + 'account/' }, // config.public.authWebURL + `account/${account.currentAccount.id}/settings/account-info`
      { label: t('btn.teamMembers'), icon: 'i-mdi-account-group-outline', to: config.public.authWebURL + 'account/' } // config.public.authWebURL + `account/${account.currentAccount.id}/settings/team-members`
    ]
    // if ([AccountTypeE.PREMIUM, AccountTypeE.SBC_STAFF, AccountTypeE.STAFF].includes(currentAccount.value.accountType)) {
    //   options.push({
    //     label: t('btn.transactions'),
    //     icon: 'i-mdi-file-document-outline',
    //     to: config.public.authWebURL + `account/` // config.public.authWebURL + `account/${account.currentAccount.id}/settings/transactions`
    //   })
    // }
    return options
  })

  // will add account options in new pr
  // const switchAccountOptions = computed(() => {
  //   const options: HeaderMenuItemI[] = []
  //   for (const i in userAccounts.value) {
  //     const isActive = currentAccount.value.id === userAccounts.value[i].id
  //     // add active account stuff to menu list item
  //     options.push({
  //       label: userAccounts.value[i].label,
  //       action: isActive ? undefined : switchAccount,
  //       args: userAccounts.value[i].id,
  //       icon: isActive ? 'i-mdi-check' : '',
  //       setActive: isActive
  //     })
  //   }
  //   return options
  // })

  const createAccountOptions = computed<DropdownItem[]>(() => {
    if ([LoginSource.BCROS, LoginSource.IDIR].includes(kcUser?.value.loginSource)) {
      return []
    }
    return [{ label: t('btn.createAccount'), icon: 'i-mdi-plus', to: createAccountUrl() }]
  })

  const loggedInUserOptions = computed<DropdownItem[][]>(() => {
    const fullOptions: DropdownItem[][] = []

    fullOptions.push(basicAccountOptions.value)
    fullOptions.push(accountSettingsOptions.value)
    // fullOptions.push(switchAccountOptions.value) need to add in account store
    fullOptions.push(createAccountOptions.value)

    return fullOptions
  })

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
          label: 'Log in bcsc',
          icon: 'i-mdi-account-card-details-outline',
          click: () => login(IdpHint.BCSC)
        },
        {
          label: 'Log in bceid',
          icon: 'i-mdi-two-factor-authentication',
          click: () => login(IdpHint.BCEID)
        },
        {
          label: 'Log in idir',
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
