import { describe, expect, it, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ConnectHeader } from '#components'
import { enI18n } from '~~/tests/unit/mocks/i18n'

let mockIsAuthenticated = true
mockNuxtImport('useKeycloak', () => {
  return () => ({
    isAuthenticated: mockIsAuthenticated,
    kcUser: {
      firstname: 'First',
      lastname: 'Last',
      fullName: 'Test User',
      name: 'First Last',
      username: 'Username',
      email: 'test@email.com',
      sub: '123456',
      loginSource: 'BCSC',
      realm_access: { roles: ['role1', 'role2'] },
      roles: ['public_user'],
      value: {
        firstname: 'First',
        lastname: 'Last',
        fullName: 'Test User',
        name: 'First Last',
        username: 'Username',
        email: 'test@email.com',
        sub: '123456',
        loginSource: 'BCSC',
        realm_access: { roles: ['role1', 'role2'] },
        roles: ['public_user']
      }
    }
  })
})

const setLocaleMock = vi.fn()
mockNuxtImport('useI18n', () => {
  return () => (
    {
      locale: 'en-CA',
      locales: ref([
        {
          name: 'English',
          code: 'en-CA',
          iso: 'en-CA',
          dir: 'ltr',
          file: 'en-CA.ts'
        },
        {
          name: 'French',
          code: 'fr-CA',
          iso: 'fr-CA',
          dir: 'ltr',
          file: 'fr-CA.ts'
        }
      ]),
      t: (key: string) => key,
      setLocale: setLocaleMock
    }
  )
})

describe('<ConnectHeader />', () => {
  it('renders when authenticated', async () => {
    const wrapper = await mountSuspended(ConnectHeader, {
      global: {
        plugins: [enI18n]
      }
    })

    expect(wrapper).toBeDefined()

    // logo link should be rendered
    const homeLogoLink = wrapper.find('#header-logo-home-link')
    expect(homeLogoLink.exists()).toBe(true)

    // locale select should be rendered
    const localeSelectDropdown = wrapper.find('#locale-select-dropdown')
    expect(localeSelectDropdown.exists()).toBe(true)

    // unauthenticated options should NOT be rendered
    const unauthenticatedOptions = wrapper.find('#connect-header-unauth-options')
    expect(unauthenticatedOptions.exists()).toBe(false)

    // authenticated options should be rendered
    const authenticatedOptions = wrapper.find('#connect-header-auth-options')
    expect(authenticatedOptions.exists()).toBe(true)
    expect(authenticatedOptions).toBeDefined()

    // header title should be Service BC Connect
    expect(wrapper.html()).toContain('Service BC Connect')
  })

  it('renders when unauthenticated', async () => {
    mockIsAuthenticated = false
    const wrapper = await mountSuspended(ConnectHeader, {
      global: {
        plugins: [enI18n]
      }
    })

    expect(wrapper).toBeDefined()

    // logo link should be rendered
    const homeLogoLink = wrapper.find('#header-logo-home-link')
    expect(homeLogoLink.exists()).toBe(true)

    // locale select should be rendered
    const localeSelectDropdown = wrapper.find('#locale-select-dropdown')
    expect(localeSelectDropdown.exists()).toBe(true)

    // unauthenticated options should be rendered
    const unauthenticatedOptions = wrapper.find('#connect-header-unauth-options')
    expect(unauthenticatedOptions.exists()).toBe(true)
    expect(unauthenticatedOptions).toBeDefined()

    // authenticated options should NOT be rendered
    const authenticatedOptions = wrapper.find('#connect-header-auth-options')
    expect(authenticatedOptions.exists()).toBe(false)

    // header title should be Service BC Connect
    expect(wrapper.html()).toContain('Service BC Connect')
  })
})
