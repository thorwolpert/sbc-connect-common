import { describe, expect, it, beforeEach, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { setActivePinia, createPinia } from 'pinia'
import { flushPromises } from '@vue/test-utils'

let ldClientId = '1234567890'
mockNuxtImport('useRuntimeConfig', () => {
  return () => (
    {
      public: {
        authApiURL: 'https://auth.example.com/',
        ldClientId,
        appName: 'Test App'
      }
    }
  )
})

let isAuthenticated = true
mockNuxtImport('useKeycloak', () => {
  return () => ({
    login: vi.fn(),
    logout: vi.fn(),
    getToken: vi.fn().mockResolvedValue('123'),
    isAuthenticated,
    kcUser: {
      value: {
        loginSource: 'BCSC',
        keycloakGuid: '123'
      }
    }
  })
})

mockNuxtImport('useConnectAccountStore', () => {
  return () => ({
    currentAccount: {
      id: '456',
      accountType: 'business',
      accountStatus: 'active',
      type: 'corporation',
      label: 'Test Account'
    }
  })
})

vi.mock('launchdarkly-js-client-sdk', () => ({
  initialize: vi.fn().mockReturnValue({
    on: vi.fn((event, callback) => {
      if (event === 'initialized') {
        // Simulate the callback being called after initialization
        callback()
      }
    }),
    allFlags: vi.fn().mockReturnValue({ testFlag: true }),
    variation: vi.fn(flagName => (flagName === 'testFlag' ? true : null))
  })
}))

describe('useConnectLaunchdarklyStore', () => {
  let ldStore: ReturnType<typeof useConnectLaunchdarklyStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    ldStore = useConnectLaunchdarklyStore()
  })

  it('should initialize LaunchDarkly if not already initialized', async () => {
    ldStore.init()

    await flushPromises()

    expect(ldStore.ldInitialized).toBe(true)
    expect(ldStore.ldClient).not.toBeNull()
    expect(ldStore.ldFlagSet).toEqual({ testFlag: true })
  })

  it('should not initialize LaunchDarkly if already initialized', () => {
    ldStore.ldInitialized = true

    const consoleSpy = vi.spyOn(console, 'info')
    ldStore.init()

    expect(consoleSpy).toHaveBeenCalledWith('Launchdarkly already initialized.')
  })

  it('should return correct feature flag value', () => {
    ldStore.init()

    expect(ldStore.getFeatureFlag('testFlag')).toBe(true)
    expect(ldStore.getFeatureFlag('unknownFlag')).toBe(null)
  })

  it('should return stored flag value', () => {
    ldStore.ldFlagSet = { testFlag: true }

    expect(ldStore.getStoredFlag('testFlag')).toBe(true)
  })

  it('should reset the store state', () => {
    ldStore.ldInitialized = true
    ldStore.ldClient = {} as any
    ldStore.ldFlagSet = { testFlag: true }

    ldStore.$reset()

    expect(ldStore.ldInitialized).toBe(false)
    expect(ldStore.ldClient).toBeNull()
    expect(ldStore.ldFlagSet).toEqual({})
  })

  it('should not initialize LaunchDarkly if ldClientId is missing', () => {
    ldClientId = ''

    const consoleSpy = vi.spyOn(console, 'info')

    ldStore.init()

    expect(consoleSpy).toHaveBeenCalledWith('No launchdarkly sdk variable set. Aborting launchdarkly setup.')
    expect(ldStore.ldClient).toBeNull()
    expect(ldStore.ldInitialized).toBe(false)
  })

  it('should initialize LaunchDarkly with anonymous user if not authenticated', async () => {
    isAuthenticated = false

    ldStore.init()
    await flushPromises()

    // @ts-expect-error // ignore key type not matching
    expect(ldStore.ldContext.user?.key).toBe('anonymous')
    // @ts-expect-error
    expect(ldStore.ldContext.org?.key).toBe('anonymous')
  })

  it('should return null from getFeatureFlag if ldClient is null', () => {
    ldStore.ldClient = null

    const flag = ldStore.getFeatureFlag('someFlag')

    expect(flag).toBe(null)
  })
})
