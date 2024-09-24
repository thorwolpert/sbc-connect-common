<script setup lang="ts">
defineProps<{
  text: string
  id?: string
}>()

const isTouchScreen = useMediaQuery('(pointer: coarse)')
</script>
<template>
  <div class="inline-flex items-center align-text-top">
    <UPopover
      :mode="isTouchScreen ? 'click' : 'hover'"
      :ui="{
        background: 'bg-gray-700 opacity-90',
        ring: 'ring-1 ring-gray-700',
        rounded: 'rounded'
      }"
    >
      <template #default="{ open }">
        <UButton
          type="button"
          :padded="false"
          variant="header"
          color="white"
          icon="i-mdi-info-outline"
          class="cursor-default"
          size="xl"
          :aria-label="open ? $t('btn.appVersion.hide') : $t('btn.appVersion.show')"
        />
        <!-- live region will announce text when button opens popover -->
        <span role="status" class="sr-only">
          {{ open ? text : '' }}
        </span>
        <!-- text for aria aria-describedby -->
        <p v-if="id" :id class="hidden">
          {{ text }}
        </p>
      </template>

      <template #panel>
        <p class="p-2.5 text-xs font-normal text-white">
          {{ text }}
        </p>
      </template>
    </UPopover>
  </div>
</template>
