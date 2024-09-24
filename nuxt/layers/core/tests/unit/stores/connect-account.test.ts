import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { setActivePinia, createPinia } from 'pinia'
import { AccountStatus, AccountType, useConnectAccountStore, ErrorCategory } from '#imports'

mockNuxtImport('useRuntimeConfig', () => {
  return () => (
    {
      public: {
        authApiURL: 'https://auth.example.com/'
      }
    }
  )
})

mockNuxtImport('useKeycloak', () => {
  return () => ({
    login: vi.fn(),
    logout: vi.fn(),
    getToken: vi.fn().mockResolvedValue('123'),
    isAuthenticated: true,
    kcUser: {
      value: {
        loginSource: 'BCSC',
        keycloakGuid: '123'
      }
    }
  })
})

const mockAuthApi = vi.fn()
mockNuxtImport('useNuxtApp', () => {
  return () => (
    {
      $authApi: mockAuthApi
    }
  )
})

describe('Account Store Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.resetAllMocks()
    vi.restoreAllMocks()
  })

  it('inits the store with empty values', () => {
    const accountStore = useConnectAccountStore()

    expect(accountStore.currentAccount).toEqual({})
    expect(accountStore.userAccounts).toEqual([])
    expect(accountStore.currentAccountName).toEqual('')
    expect(accountStore.pendingApprovalCount).toEqual(0)
    expect(accountStore.errors).toEqual([])
  })

  describe('getUserAccounts', () => {
    it('fetches and filters userAccounts', async () => {
      mockAuthApi.mockResolvedValue([
        { type: 'ACCOUNT', id: '1', accountType: 'PREMIUM', accountStatus: 'ACTIVE', label: 'Account 1', urlpath: '/account-1', urlorigin: 'https://example.com' },
        { type: 'other', id: '2', accountType: 'BASIC', accountStatus: 'INACTIVE', label: 'Account 2', urlpath: '/account-2', urlorigin: 'https://example.com' },
        { type: 'ACCOUNT', id: '3', accountType: 'PREMIUM', accountStatus: 'ACTIVE', label: 'Account 3', urlpath: '/account-3', urlorigin: 'https://example.com' }
      ])
      const accountStore = useConnectAccountStore()
      // get user accounts
      const accounts = await accountStore.getUserAccounts('123')
      // assert
      expect(mockAuthApi).toBeCalledTimes(1)
      expect(accounts?.length).toEqual(2)
    })
  })

  it('sets account info', async () => {
    mockAuthApi.mockResolvedValue([
      { type: 'ACCOUNT', id: '1', accountType: 'PREMIUM', accountStatus: 'ACTIVE', label: 'Account 1', urlpath: '/account-1', urlorigin: 'https://example.com' },
      { type: 'other', id: '2', accountType: 'BASIC', accountStatus: 'INACTIVE', label: 'Account 2', urlpath: '/account-2', urlorigin: 'https://example.com' },
      { type: 'ACCOUNT', id: '3', accountType: 'PREMIUM', accountStatus: 'ACTIVE', label: 'Account 3', urlpath: '/account-3', urlorigin: 'https://example.com' }
    ])

    const accountStore = useConnectAccountStore()

    // set account info
    await accountStore.setAccountInfo()
    // assert
    expect(mockAuthApi).toBeCalledTimes(1)
    expect(accountStore.currentAccount.label).toEqual('Account 1')
  })

  describe('getPendingApprovalAccount', () => {
    it('getPendingApprovalCount', async () => {
      mockAuthApi.mockResolvedValue({ count: 3 })

      const accountStore = useConnectAccountStore()

      // set account info
      await accountStore.getPendingApprovalCount(1, '1')
      // assert
      expect(mockAuthApi).toBeCalledTimes(1)
      expect(accountStore.pendingApprovalCount).toEqual(3)
    })
  })

  it('can switch the current account', () => {
    const accountStore = useConnectAccountStore()
    const accounts: Account[] = [
      { type: UserSettingsType.ACCOUNT, id: '1', accountType: AccountType.PREMIUM, accountStatus: AccountStatus.ACTIVE, label: 'Account 1', urlpath: '/account-1', urlorigin: 'https://example.com' },
      { type: UserSettingsType.ACCOUNT, id: '2', accountType: AccountType.PREMIUM, accountStatus: AccountStatus.INACTIVE, label: 'Account 2', urlpath: '/account-2', urlorigin: 'https://example.com' },
      { type: UserSettingsType.ACCOUNT, id: '3', accountType: AccountType.PREMIUM, accountStatus: AccountStatus.ACTIVE, label: 'Account 3', urlpath: '/account-3', urlorigin: 'https://example.com' }
    ]

    accountStore.userAccounts = accounts
    accountStore.currentAccount = accounts[0]!
    expect(accountStore.currentAccount.label).toEqual(accounts[0]!.label)
    accountStore.switchCurrentAccount(accounts[2]!.id)
    expect(accountStore.currentAccount.label).toEqual(accounts[2]!.label)
  })

  it('can reset the store back to default values', () => {
    const accountStore = useConnectAccountStore()
    const accounts: Account[] = [
      { type: UserSettingsType.ACCOUNT, id: '1', accountType: AccountType.PREMIUM, accountStatus: AccountStatus.ACTIVE, label: 'Account 1', urlpath: '/account-1', urlorigin: 'https://example.com' },
      { type: UserSettingsType.ACCOUNT, id: '2', accountType: AccountType.PREMIUM, accountStatus: AccountStatus.INACTIVE, label: 'Account 2', urlpath: '/account-2', urlorigin: 'https://example.com' },
      { type: UserSettingsType.ACCOUNT, id: '3', accountType: AccountType.PREMIUM, accountStatus: AccountStatus.ACTIVE, label: 'Account 3', urlpath: '/account-3', urlorigin: 'https://example.com' }
    ]

    accountStore.userAccounts = accounts
    accountStore.currentAccount = accounts[0]!
    accountStore.pendingApprovalCount = 4
    accountStore.errors.push({
      statusCode: 500,
      message: 'Test Error',
      detail: 'Detailed error info',
      category: ErrorCategory.ACCOUNT_LIST
    })

    // check store has values
    expect(accountStore.userAccounts.length).toEqual(3)
    expect(accountStore.currentAccount).not.toEqual({})
    expect(accountStore.pendingApprovalCount).toEqual(4)
    expect(accountStore.errors.length).toEqual(1)

    // reset store
    accountStore.$reset()

    expect(accountStore.userAccounts.length).toEqual(0)
    expect(accountStore.currentAccount).toEqual({})
    expect(accountStore.pendingApprovalCount).toEqual(0)
    expect(accountStore.errors.length).toEqual(0)
  })
})
