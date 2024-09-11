import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ConnectHeaderUnauthenticatedOptionsWhatsNew } from '#components'
import { enI18n } from '~~/tests/unit/mocks/i18n'

// TODO: add tests when whats new is implemented
describe('<ConnectHeaderUnauthenticatedOptionsWhatsNew />', () => {
  it('renders', async () => {
    const wrapper = await mountSuspended(ConnectHeaderUnauthenticatedOptionsWhatsNew, {
      global: {
        plugins: [enI18n]
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.html()).toContain("What's New")
  })
})
