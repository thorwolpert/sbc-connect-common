import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ConnectHeaderAuthenticatedOptionsAccountLabel } from '#components'
import { enI18n, frI18n } from '~/tests/unit/mocks/i18n'

describe('<ConnectHeaderAuthenticatedOptionsAccountLabel />', () => {
  it('renders with default props', async () => {
    const wrapper = await mountSuspended(ConnectHeaderAuthenticatedOptionsAccountLabel, {
      global: {
        plugins: [enI18n]
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.html()).toContain('N/A')
  })

  it('renders with props', async () => {
    const wrapper = await mountSuspended(ConnectHeaderAuthenticatedOptionsAccountLabel, {
      global: {
        plugins: [enI18n]
      },
      props: {
        accountName: 'John Doe',
        username: 'jdoe',
        theme: 'header'
      }
    })
    expect(wrapper.text()).toContain('JOHN DOE')
    expect(wrapper.text()).toContain('JDOE')
    expect(wrapper.html()).toContain('text-bcGovColor-darkGray')
  })

  it('renders correctly with empty username', async () => {
    const wrapper = await mountSuspended(ConnectHeaderAuthenticatedOptionsAccountLabel, {
      global: {
        plugins: [enI18n]
      },
      props: {
        accountName: 'Jane Doe',
        username: '',
        theme: 'header'
      }
    })
    expect(wrapper.text()).toContain('JANE DOE')
    expect(wrapper.html()).toContain('U') // default initial when username is empty
  })

  it('renders correctly with different locale', async () => {
    const wrapper = await mountSuspended(ConnectHeaderAuthenticatedOptionsAccountLabel, {
      global: {
        plugins: [frI18n]
      },
      props: {
        accountName: 'François Dupont',
        username: 'fdupont',
        theme: 'header'
      }
    })
    expect(wrapper.text()).toContain('FRANÇOIS DUPONT')
    expect(wrapper.text()).toContain('FDUPONT')
  })
})
