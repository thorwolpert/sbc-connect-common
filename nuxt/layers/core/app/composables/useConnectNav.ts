import type { DropdownItem } from '#ui/types'
import { IdpHint } from '../enums/idp-hint'

// handle navigation items and functionality
export function useConnectNav () {
  const config = useRuntimeConfig()
  const localePath = useLocalePath()
  const { t } = useI18n()
  const { login, logout, isAuthenticated } = useKeycloak()
  // const accountStore = useAccountStore()

  /** redirect to the correct creation screen based on auth state */
  function createAccountUrl () {
    if (isAuthenticated.value) {
      return config.public.authWebURL + 'setup-account'
    } else {
      return config.public.authWebURL + 'choose-authentication-method'
    }
  }

  const mainLinks = computed<DropdownItem[]>(() => {
    return [
      {
        icon: 'i-mdi-home',
        label: t('btn.sbcConnect'),
        to: localePath('/')
      }
    ]
  })

  const loggedInUserOptions = computed<DropdownItem[][]>(() => {
    const fullOptions: DropdownItem[][] = [
      [
        {
          label: 'Account',
          slot: 'account',
          disabled: true
        }
      ]
    ]

    // const accountOptions = accountStore.userAccounts
    //   .filter(account => accountStore.currentAccount.id !== account.id)
    //   .map(account => ({
    //     label: account.name,
    //     click: () => accountStore.selectUserAccount(account.id)
    //   }))

    // only allow switching account if theres no filing
    // if (accountOptions.length > 0 && (Object.keys(arStore.arFiling).length === 0)) {
    //   fullOptions.push([
    //     {
    //       label: 'Switch Accounts',
    //       disabled: true
    //     }
    //   ])
    //   fullOptions.push([
    //     ...accountOptions
    //   ])
    // }

    fullOptions.push([
      {
        label: t('btn.logout'),
        icon: 'i-mdi-logout',
        click: () => logout()
      }
    ])
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
        // {
        //   label: 'Create Account',
        //   icon: 'i-mdi-account-plus'
        // }
      ]
    ]
  })

  return {
    mainLinks,
    loggedInUserOptions,
    loggedOutUserOptions,
    createAccountUrl
  }
}
