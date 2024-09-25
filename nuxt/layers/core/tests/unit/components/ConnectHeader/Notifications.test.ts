import { describe, expect, it } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { enI18n } from '~~/tests/unit/mocks/i18n'
import { ConnectHeaderNotifications } from '#components'

mockNuxtImport('useConnectNav', () => {
  return () => (
    {
      notificationsOptions: [[
        {
          label: 'n/a',
          to: 'https://auth.example.com/account/account1/settings/team-members',
          slot: 'notifications'
        }
      ]]
    }
  )
})

let mockPendingApprovalCount = 1
mockNuxtImport('useConnectAccountStore', () => {
  return () => (
    {
      pendingApprovalCount: mockPendingApprovalCount,
      currentAccount: { id: '1', label: 'Account 1' }
    }
  )
})

describe('<ConnectHeaderNotifications />', () => {
  it('renders', async () => {
    const wrapper = await mountSuspended(ConnectHeaderNotifications, {
      global: {
        plugins: [enI18n]
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.find('button[aria-label]').attributes('aria-label')).toEqual('Notifications, 1 New')
    expect(wrapper.find('button[aria-label]').text()).toContain('Notifications')
  })

  it('shows the chip when pendingApprovalCount is greater than 0', async () => {
    const wrapper = await mountSuspended(ConnectHeaderNotifications, {
      global: {
        plugins: [enI18n]
      }
    })
    const chip = wrapper.find('span.bg-red-500')
    expect(chip.exists()).toBe(true)
    expect(chip.isVisible()).toBe(true)
  })

  it('does not show the chip when pendingApprovalCount is 0', async () => {
    mockPendingApprovalCount = 0
    const wrapper = await mountSuspended(ConnectHeaderNotifications, {
      global: {
        plugins: [enI18n]
      }
    })

    const chip = wrapper.find('span.bg-red-500')
    expect(chip.exists()).toBe(false)
  })

  it('displays the correct aria-label for notifications', async () => {
    mockPendingApprovalCount = 4
    const wrapper = await mountSuspended(ConnectHeaderNotifications, {
      global: {
        plugins: [enI18n]
      }
    })

    const button = wrapper.find('button[aria-label]')
    expect(button.attributes('aria-label')).toBe('Notifications, 4 New')
  })

  it('renders the correct notification message in the slot', async () => {
    mockPendingApprovalCount = 4
    const wrapper = await mountSuspended(ConnectHeaderNotifications, {
      global: {
        plugins: [enI18n]
      }
    })

    // open dropdown
    const dropdownButton = wrapper.find('button[aria-label]')
    await dropdownButton.trigger('click')

    // assert notification text
    const notificationMessage = wrapper.find('p')
    expect(notificationMessage.text()).toBe('4 team members require approval to access this account.')
  })
})
