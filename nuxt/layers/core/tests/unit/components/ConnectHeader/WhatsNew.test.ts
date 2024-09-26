import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ConnectHeaderWhatsNew } from '#components'
import { enI18n } from '~~/tests/unit/mocks/i18n'

// TODO: add tests when whats new is implemented
describe('<ConnectHeaderWhatsNew />', () => {
  it('renders', async () => {
    const wrapper = await mountSuspended(ConnectHeaderWhatsNew, {
      global: {
        plugins: [enI18n]
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.html()).toContain("What's New")
  })
})
