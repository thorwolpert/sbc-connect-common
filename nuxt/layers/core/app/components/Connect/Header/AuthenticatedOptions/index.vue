<script setup lang="ts">
const { loggedInUserOptions } = useConnectNav()
const { kcUser } = useKeycloak()
const accountStore = useConnectAccountStore()
</script>
<template>
  <div class="flex gap-1">
    <!-- notifications dropdown -->
    <ConnectHeaderAuthenticatedOptionsNotifications />
    <!-- account options dropdown -->
    <UDropdown
      id="account-options-dropdown"
      :items="loggedInUserOptions"
      :ui="{
        container: 'z-20 group rounded-md overflow-clip',
        width: 'min-w-fit',
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
      <!-- display full name/account/avatar on large screens -->
      <UButton
        id="account-options-button"
        class="hidden lg:flex"
        color="white"
        variant="header"
        :aria-label="$t('btn.accountOptionsMenu')"
        icon="i-mdi-caret-down"
        trailing
      >
        <ConnectHeaderAuthenticatedOptionsAccountLabel
          :username="parseSpecialChars(kcUser.fullName, 'USER')"
          :account-name="accountStore.currentAccount.label ? parseSpecialChars(accountStore.currentAccount.label, 'ACCOUNT') : ''"
        />
      </UButton>
      <!-- only use avatar on small screens -->
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
        <ConnectHeaderAuthenticatedOptionsAccountLabel
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
  </div>
</template>
