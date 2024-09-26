<script setup lang="ts">
const { loggedOutUserOptions, loggedOutUserOptionsMobile } = useConnectNav()
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>
<template>
  <UDropdown
    id="logged-out-options-dropdown"
    :items="isLargeScreen ? loggedOutUserOptions : loggedOutUserOptionsMobile"
    :ui="{
      container: 'min-w-[300px]',
      padding: 'py-3 px-0',
      item: {
        rounded: 'rounded-none',
        base: 'flex items-center gap-4 w-full hover:text-bcGovColor-activeBlue hover:bg-bcGovColor-gray1',
        padding: 'px-4 py-3',
        disabled: 'cursor-default opacity-100 hover:bg-white py-0',
        icon: {
          base: 'flex-shrink-0 size-5 text-bcGovColor-activeBlue',
          active: 'text-bcGovColor-activeBlue',
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
      <span class="pointer-events-none text-sm font-semibold text-bcGovColor-darkGray"> {{ $t('label.selectLoginMethod') }} </span>
    </template>

    <!-- whats new slot, only shows on small screens -->
    <!-- TODO: implement whats new -->
    <template #whats-new="{ item }">
      <UIcon :name="item.icon" class="size-6 shrink-0 text-bcGovColor-midGray" />
      <span class="truncate">{{ item.label }}</span>
      <span class="size-2 rounded-full bg-red-500" />
    </template>
  </UDropdown>
</template>
