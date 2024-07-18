<script setup lang="ts">
import { parseSpecialChars } from '../../../utils/parseSpecialChars'
// const { loggedInUserOptions } = useSbcNav()
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
      <div class="flex items-center gap-6">
        <ConnectBCGovLogo />
        <!-- <span class="text-lg font-semibold text-white"> {{ $t('btn.sbcConnect') }} </span> -->
      </div>
      <div class="flex gap-1">
        <ClientOnly>
          <UDropdown
            v-if="isAuthenticated"
            id="account-options-dropdown"
            :items="loggedInUserOptions"
            :ui="{
              width: '',
              height: 'max-h-60',
              item: {
                disabled:
                  'cursor-text select-text text-bcGovGray-900 dark:text-white opacity-100 font-semibold',
              }
            }"
          >
            <UButton
              id="account-options-button"
              color="white"
              variant="link"
              :aria-label="$t('btn.accountOptions')"
            >
              <ConnectHeaderAccountLabel
                class="hidden md:flex"
                :username="parseSpecialChars(kcUser.fullName, 'USER')"
              />
              <!-- leaving out the account for a future pr -->
              <!-- <ConnectHeaderAccountLabel
                class="hidden md:flex"
                :username="parseSpecialChars(kcUser.fullName, 'USER')"
                :account-name="account.currentAccount.name ? parseSpecialChars(account.currentAccount.name, 'ACCOUNT') : ''"
              /> -->
              <UAvatar
                class="md:hidden"
                :alt="parseSpecialChars(kcUser.fullName, 'U')[0]!.toUpperCase()"
                :ui="{
                  background: 'bg-bcGovBlue-300 dark:bg-[#E0E7ED]',
                  text: 'font-semibold leading-none text-white dark:text-bcGovColor-darkGray truncate',
                  placeholder: 'font-semibold leading-none text-white truncate dark:text-bcGovColor-darkGray text-xl',
                  rounded: 'rounded-sm'
                }"
              />
            </UButton>

            <template #account>
              <ConnectHeaderAccountLabel
                :username="parseSpecialChars(kcUser.fullName, 'USER')"
                theme="dropdown"
              />
              <!-- leaving out the account for a future pr -->
              <!-- <ConnectHeaderAccountLabel
                :username="parseSpecialChars(kcUser.fullName, 'USER')"
                :account-name="account.currentAccount.name ? parseSpecialChars(account.currentAccount.name, 'ACCOUNT') : ''"
                theme="dropdown"
              /> -->
            </template>
          </UDropdown>
        </ClientOnly>
        <!-- <LocaleSelect /> -->
      </div>
    </nav>
  </header>
</template>
