import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enI18n } from '~~/tests/unit/mocks/i18n'
import { ConnectFooter } from '#components'

describe('<ConnectFooter/>', () => {
  it('renders footer links', async () => {
    const wrapper = await mountSuspended(ConnectFooter, {
      global: {
        plugins: [enI18n]
      }
    })

    const linkTexts = ['Home', 'Release Notes', 'Disclaimer', 'Privacy', 'Accessibility', 'Copyright']
    const linkHrefs = [
      '/en-CA',
      'https://www.release-notes.bcregistry.gov.bc.ca',
      'https://www2.gov.bc.ca/gov/content/home/disclaimer',
      'https://www2.gov.bc.ca/gov/content/home/privacy',
      'https://www2.gov.bc.ca/gov/content/home/accessibility',
      'https://www2.gov.bc.ca/gov/content/home/copyright'
    ]

    const links = wrapper.findAll('a')
    expect(links.length).toBe(linkTexts.length)

    links.forEach((link, index) => {
      expect(link.text()).toBe(linkTexts[index])
      expect(link.attributes('href')).toBe(linkHrefs[index])
      if (index > 0) {
        expect(link.attributes('target')).toBe('_blank')
      }
    })
  })
})
