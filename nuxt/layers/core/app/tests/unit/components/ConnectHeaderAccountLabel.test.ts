import { describe, expect, it, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ConnectHeaderAccountLabel } from '#components'
import { enI18n } from '~/tests/unit/mocks/i18n'

describe('<ConnectHeaderAccountLabel />', () => {
  it.only('renders properly with default props', async () => {
    const wrapper = await mountSuspended(ConnectHeaderAccountLabel, {
      global: {
        plugins: [enI18n]
      }
    })
    console.log(wrapper.html())
    expect(wrapper.html()).toContain('N/A')
  })

  // it('renders properly with given props', () => {
  //   const wrapper = mountSuspended(ConnectHeaderAccountLabel, {
  //     global: {
  //       plugins: [i18n]
  //     },
  //     props: {
  //       accountName: 'John Doe',
  //       username: 'jdoe',
  //       theme: 'header'
  //     }
  //   })
  //   expect(wrapper.text()).toContain('JOHN DOE')
  //   expect(wrapper.text()).toContain('JDOE')
  // })

  // it('applies the correct theme classes', () => {
  //   const wrapper = mountSuspended(ConnectHeaderAccountLabel, {
  //     global: {
  //       plugins: [i18n]
  //     },
  //     props: {
  //       theme: 'dropdown'
  //     }
  //   })
  //   const spanElements = wrapper.findAll('span')
  //   expect(spanElements[0].classes()).toContain('text-bcGovColor-darkGray')
  //   expect(spanElements[1].classes()).toContain('text-bcGovColor-midGray')
  // })
})
