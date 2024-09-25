<script setup lang="ts">
const { notificationsOptions } = useConnectNav()
const accountStore = useConnectAccountStore()
</script>
<template>
  <UDropdown
    :items="notificationsOptions"
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
    <!-- chip/badge displays only if pendingApprovalCount > 0 -->
    <UChip
      color="red"
      position="top-left"
      inset
      :show="accountStore.pendingApprovalCount > 0"
    >
      <!-- use full text + icon on large screens for button -->
      <UButton
        class="hidden lg:flex"
        variant="header"
        color="white"
        :label="$t('btn.notifications.main')"
        :aria-label="$t('btn.notifications.aria', { count: accountStore.pendingApprovalCount })"
        icon="i-mdi-caret-down"
        trailing
      >
        <template #leading>
          <UIcon name="i-mdi-bell-outline" class="size-6 shrink-0" />
        </template>
      </UButton>
      <!-- use icon only on small screens -->
      <UButton
        class="lg:hidden"
        variant="header"
        color="white"
        :aria-label="$t('btn.notifications.aria', { count: accountStore.pendingApprovalCount })"
        icon="i-mdi-bell-outline"
      />
    </UChip>
    <!-- notifications slot for info -->
    <template #notifications>
      <p>
        {{ $t('notifications.teamMemberApproval', { count: accountStore.pendingApprovalCount }, accountStore.pendingApprovalCount) }}
      </p>
    </template>
  </UDropdown>
</template>
