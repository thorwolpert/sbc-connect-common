import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enI18n, frI18n } from '~~/tests/unit/mocks/i18n'
import { ConnectHeaderAccountLabel } from '#components'

describe('<ConnectHeaderAccountLabel />', () => {
  it('renders with default props', async () => {
    const wrapper = await mountSuspended(ConnectHeaderAccountLabel, {
      global: {
        plugins: [enI18n]
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.html()).toContain('N/A')
  })

  it('renders with props', async () => {
    const wrapper = await mountSuspended(ConnectHeaderAccountLabel, {
      global: {
        plugins: [enI18n]
      },
      props: {
        accountName: 'John Doe',
        username: 'jdoe',
        theme: 'header'
      }
    })
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('jdoe')
    expect(wrapper.html()).toContain('text-bcGovColor-darkGray')
  })

  it('renders correctly with empty username', async () => {
    const wrapper = await mountSuspended(ConnectHeaderAccountLabel, {
      global: {
        plugins: [enI18n]
      },
      props: {
        accountName: 'Jane Doe',
        username: '',
        theme: 'header'
      }
    })
    expect(wrapper.text()).toContain('Jane Doe')
    expect(wrapper.html()).toContain('U') // default initial when username is empty
  })

  it('renders correctly with different locale', async () => {
    const wrapper = await mountSuspended(ConnectHeaderAccountLabel, {
      global: {
        plugins: [frI18n]
      },
      props: {
        accountName: 'François Dupont',
        username: 'fdupont',
        theme: 'header'
      }
    })
    expect(wrapper.text()).toContain('François Dupont')
    expect(wrapper.text()).toContain('Ffdupont')
  })
})
