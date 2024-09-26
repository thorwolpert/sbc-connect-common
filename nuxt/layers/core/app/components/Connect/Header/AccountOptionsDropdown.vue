<script setup lang="ts">
const { loggedInUserOptions } = useConnectNav()
const { kcUser } = useKeycloak()
const accountStore = useConnectAccountStore()
</script>
<template>
  <UDropdown
    id="account-options-dropdown"
    :items="loggedInUserOptions"
    :ui="{
      padding: 'py-3 px-0'
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
      <ConnectHeaderAccountLabel
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
          background: 'bg-blue-300 dark:bg-[#E0E7ED]',
          text: 'font-semibold leading-none text-white dark:text-bcGovColor-darkGray truncate',
          placeholder: 'font-semibold leading-none text-white truncate dark:text-bcGovColor-darkGray text-xl',
          rounded: 'rounded-sm'
        }"
      />
    </UButton>

    <!-- account label slot -->
    <template #account>
      <ConnectHeaderAccountLabel
        :username="parseSpecialChars(kcUser.fullName, 'USER')"
        :account-name="accountStore.currentAccount.label ? parseSpecialChars(accountStore.currentAccount.label, 'ACCOUNT') : ''"
        theme="dropdown"
      />
    </template>

    <!-- account setting slot -->
    <template #settings>
      <span class="text-bcGovColor-darkGray">{{ $t('label.accountSettings') }}</span>
    </template>

    <!-- switch accounts slot -->
    <template #accounts>
      <span class="text-bcGovColor-darkGray">{{ $t('label.switchAccount') }}</span>
    </template>
  </UDropdown>
</template>
