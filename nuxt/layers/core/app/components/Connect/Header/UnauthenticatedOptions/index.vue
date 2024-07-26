<script setup lang="ts">
const { loggedOutUserOptions, loggedOutUserOptionsMobile, createAccountUrl } = useConnectNav()

const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>
<template>
  <div
    id="connect-header-unauth-options"
    class="flex gap-1"
  >
    <!-- TODO: implement whats new -->
    <!-- whats new slideover -->
    <!-- <ConnectHeaderUnauthenticatedOptionsWhatsNew class="hidden lg:flex" /> -->
    <!-- login options dropdown or main menu on small screens -->
    <UDropdown
      id="logged-out-options-dropdown"
      :items="isLargeScreen ? loggedOutUserOptions : loggedOutUserOptionsMobile"
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
      <!-- login button on large screens -->
      <UButton
        class="hidden lg:flex"
        variant="header"
        color="white"
        :label="$t('btn.login')"
        :aria-label="$t('label.selectLoginMethod')"
        icon="i-mdi-caret-down"
        trailing
      />
      <!-- main menu icon/button on small screens -->
      <UButton
        class="flex lg:hidden"
        variant="header"
        color="white"
        :aria-label="$t('btn.mainMenu')"
        icon="i-mdi-menu"
        trailing
      />

      <template #method>
        <span class="font-semibold text-bcGovColor-darkGray"> {{ $t('label.selectLoginMethod') }} </span>
      </template>

      <!-- whats new slot, only shows on small screens -->
      <!-- TODO: implement whats new -->
      <template #whats-new="{ item }">
        <UIcon :name="item.icon" class="size-6 shrink-0 text-bcGovColor-midGray" />
        <span class="truncate">{{ item.label }}</span>
        <span class="size-2 rounded-full bg-red-500" />
      </template>
    </UDropdown>
    <!-- create account button, hidden on small screens -->
    <UButton
      class="hidden lg:flex"
      variant="header"
      color="white"
      :label="$t('btn.createAccount')"
      :to="createAccountUrl()"
    />
  </div>
</template>
