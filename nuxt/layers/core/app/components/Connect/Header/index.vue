<script setup lang="ts">
import { parseSpecialChars } from '~/utils/parseSpecialChars'
const { loggedOutUserOptions, loggedInUserOptions, createAccountUrl } = useConnectNav()
const { isAuthenticated, kcUser } = useKeycloak()
// const account = useAccountStore()
</script>
<template>
  <header
    id="connect-main-header"
    data-testid="connect-main-header"
    class="relative border-b-2 border-bcGovColor-navDivider bg-bcGovColor-header p-2 sm:px-4 dark:border-b dark:bg-bcGovColor-darkGray"
  >
    <nav
      class="m-auto flex w-full max-w-bcGovLg items-center justify-between"
      :aria-label="$t('ConnectHeader.navLabel')"
    >
      <div class="flex items-center gap-4">
        <ConnectBCGovLogo />
        <span class="text-base font-semibold text-white lg:text-lg"> {{ $t('label.bcRegOLServices') }} </span>
      </div>
      <!-- authenticated options -->
      <div
        v-if="isAuthenticated"
        class="flex gap-1"
      >
        <!-- notifications dropdown -->
        <ClientOnly>
          <UDropdown
            :items="[]"
            :ui="{
              item: {
                base: 'group flex items-center gap-4 w-full',
                disabled: 'cursor-default opacity-100',
                icon: {
                  base: 'flex-shrink-0 size-6',
                  active: 'text-gray-500 dark:text-gray-400',
                  inactive: 'text-bcGovColor-midGray',
                },
              }
            }"
          >
            <UButton
              class="hidden lg:flex"
              variant="header"
              color="white"
              label="Notifications"
              icon="i-mdi-caret-down"
              trailing
            >
              <template #leading>
                <UIcon name="i-mdi-bell-outline" class="size-6 shrink-0" />
              </template>
            </UButton>
            <UButton class="lg:hidden" variant="header" color="white" aria-label="Notifications" icon="i-mdi-bell-outline" />
          </UDropdown>
          <!-- account options dropdown -->
          <UDropdown
            id="account-options-dropdown"
            :items="loggedInUserOptions"
            :ui="{
              width: '',
              height: '',
              item: {
                base: 'group flex items-center gap-4 w-full',
                disabled: 'cursor-default opacity-100 font-semibold',
                icon: {
                  base: 'flex-shrink-0 size-6',
                  active: 'text-gray-500 dark:text-gray-400',
                  inactive: 'text-bcGovColor-midGray'
                },
              }
            }"
          >
            <UButton
              id="account-options-button"
              class="hidden lg:flex"
              color="white"
              variant="header"
              :aria-label="$t('btn.accountOptions')"
              icon="i-mdi-caret-down"
              trailing
            >
              <ConnectHeaderAccountLabel
                :username="parseSpecialChars(kcUser.fullName, 'USER')"
                account-name="Some account name here longer longer"
              />
              <!-- :account-name="account.currentAccount.name ? parseSpecialChars(account.currentAccount.name, 'ACCOUNT') : ''" -->
            </UButton>
            <UButton
              class="lg:hidden"
              color="white"
              variant="header"
              :aria-label="$t('btn.accountOptions')"
            >
              <UAvatar
                :alt="parseSpecialChars(kcUser.fullName, 'U')[0]!.toUpperCase()"
                :ui="{
                  background: 'bg-bcGovBlue-300 dark:bg-[#E0E7ED]',
                  text: 'font-semibold leading-none text-white dark:text-bcGovColor-darkGray truncate',
                  placeholder: 'font-semibold leading-none text-white truncate dark:text-bcGovColor-darkGray text-xl',
                  rounded: 'rounded-sm'
                }"
              />
            </UButton>

            <!-- account label slot -->
            <template #account>
              <!-- leaving out the account for a future pr -->
              <ConnectHeaderAccountLabel
                :username="parseSpecialChars(kcUser.fullName, 'USER')"
                account-name="Some account name here longer longer"
                theme="dropdown"
              />
              <!-- :account-name="account.currentAccount.name ? parseSpecialChars(account.currentAccount.name, 'ACCOUNT') : ''" -->
            </template>

            <!-- account setting slot -->
            <template #settings>
              {{ $t('label.accountSettings').toLocaleUpperCase($i18n.locale) }}
            </template>
          </UDropdown>
        </ClientOnly>
        <!-- locale select dropdown -->
        <ConnectLocaleSelect />
      </div>
      <!-- unauthenticated options -->
      <div v-else class="flex gap-1">
        <!-- whats new slideover -->
        <UChip color="red" position="top-left" inset>
          <UButton variant="header" color="white" label="Whats New" />
        </UChip>
        <!-- login options dropdown -->
        <UDropdown
          :items="loggedOutUserOptions"
          :ui="{
            item: {
              base: 'group flex items-center gap-4 w-full',
              disabled: 'cursor-default opacity-100',
              icon: {
                base: 'flex-shrink-0 size-6',
                active: 'text-gray-500 dark:text-gray-400',
                inactive: 'text-bcGovColor-midGray',
              },
            }
          }"
        >
          <UButton variant="header" color="white" label="Log in" icon="i-mdi-caret-down" trailing />

          <template #method>
            <span class="font-semibold text-bcGovColor-darkGray"> Select login method </span>
          </template>
        </UDropdown>
        <!-- create account button -->
        <UButton
          variant="header"
          color="white"
          label="Create Account"
          :to="createAccountUrl()"
        />
        <!-- locale select dropdown -->
        <ConnectLocaleSelect />
      </div>
    </nav>
  </header>
</template>
