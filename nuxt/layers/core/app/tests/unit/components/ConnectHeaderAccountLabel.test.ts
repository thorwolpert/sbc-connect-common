import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ConnectHeaderAccountLabel } from '#components'
import { enI18n } from '~/tests/unit/mocks/i18n'

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
    expect(wrapper.text()).toContain('JOHN DOE')
    expect(wrapper.text()).toContain('JDOE')
  })
})
