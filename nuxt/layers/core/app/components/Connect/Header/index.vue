<script setup lang="ts">
import { parseSpecialChars } from '~/utils/parseSpecialChars'
const { loggedOutUserOptions, loggedOutUserOptionsMobile, loggedInUserOptions, createAccountUrl } = useConnectNav()
const { isAuthenticated, kcUser } = useKeycloak()
const localePath = useLocalePath()
const accountStore = useConnectAccountStore()
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
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center gap-1 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-white"
        :aria-label="$t('btn.bcRegHome')"
      >
        <ConnectBCGovLogo />
        <span class="text-base font-semibold text-white lg:text-lg"> {{ $t('label.bcRegOLServices') }} </span>
      </NuxtLink>
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
              :label="$t('btn.notifications')"
              icon="i-mdi-caret-down"
              trailing
            >
              <template #leading>
                <UIcon name="i-mdi-bell-outline" class="size-6 shrink-0" />
              </template>
            </UButton>
            <UButton class="lg:hidden" variant="header" color="white" :aria-label="$t('btn.notifications')" icon="i-mdi-bell-outline" />
          </UDropdown>
          <!-- account options dropdown -->
          <UDropdown
            id="account-options-dropdown"
            :items="loggedInUserOptions"
            :ui="{
              width: '',
              height: 'max-h-[75vh]',
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
              :aria-label="$t('btn.accountOptionsMenu')"
              icon="i-mdi-caret-down"
              trailing
            >
              <ConnectHeaderAccountLabel
                :username="parseSpecialChars(kcUser.fullName, 'USER')"
                :account-name="accountStore.currentAccount.label ? parseSpecialChars(accountStore.currentAccount.label, 'ACCOUNT') : ''"
              />
            </UButton>
            <UButton
              class="lg:hidden"
              color="white"
              variant="header"
              :aria-label="$t('btn.accountOptionsMenu')"
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
                :account-name="accountStore.currentAccount.label ? parseSpecialChars(accountStore.currentAccount.label, 'ACCOUNT') : ''"
                theme="dropdown"
              />
            </template>

            <!-- account setting slot -->
            <template #settings>
              {{ $t('label.accountSettings').toLocaleUpperCase($i18n.locale) }}
            </template>

            <!-- switch accounts slot -->
            <template #accounts>
              {{ $t('label.switchAccount').toLocaleUpperCase($i18n.locale) }}
            </template>
          </UDropdown>
        </ClientOnly>
        <!-- locale select dropdown -->
        <ConnectLocaleSelect />
      </div>
      <!-- unauthenticated options -->
      <div v-else class="flex gap-1">
        <!-- whats new slideover -->
        <UChip color="red" position="top-left" inset class="hidden lg:flex">
          <UButton class="hidden lg:flex" variant="header" color="white" :label="$t('btn.whatsNew')" />
        </UChip>
        <ClientOnly>
          <!-- login options dropdown -->
          <UDropdown
            class="hidden lg:flex"
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
            <UButton
              variant="header"
              color="white"
              :label="$t('btn.login')"
              :aria-label="$t('label.selectLoginMethod')"
              icon="i-mdi-caret-down"
              trailing
            />

            <template #method>
              <span class="font-semibold text-bcGovColor-darkGray"> {{ $t('label.selectLoginMethod') }} </span>
            </template>
          </UDropdown>
        </ClientOnly>
        <!-- create account button -->
        <UButton
          class="hidden lg:flex"
          variant="header"
          color="white"
          :label="$t('btn.createAccount')"
          :to="createAccountUrl()"
        />
        <ClientOnly>
          <!-- logged out main mobile menu -->
          <UDropdown
            class="lg:hidden"
            :items="loggedOutUserOptionsMobile"
            :ui="{
              item: {
                base: 'group flex items-center gap-4 w-full',
                disabled: 'cursor-default text-left opacity-100',
                icon: {
                  base: 'flex-shrink-0 size-6',
                  active: 'text-gray-500 dark:text-gray-400',
                  inactive: 'text-bcGovColor-midGray',
                },
              }
            }"
          >
            <UButton
              variant="header"
              color="white"
              :aria-label="$t('btn.mainMenu')"
              icon="i-mdi-menu"
              trailing
            />
            <template #method>
              <span class="font-semibold text-bcGovColor-darkGray"> {{ $t('label.selectLoginMethod') }} </span>
            </template>
            <template #whats-new="{ item }">
              <UIcon :name="item.icon" class="size-6 shrink-0 text-bcGovColor-midGray" />
              <span class="truncate">{{ item.label }}</span>
              <span class="size-2 rounded-full bg-red-500" />
            </template>
          </UDropdown>
        </ClientOnly>
        <!-- locale select dropdown -->
        <ConnectLocaleSelect />
      </div>
    </nav>
  </header>
</template>
