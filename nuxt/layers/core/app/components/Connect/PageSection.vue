<script setup lang="ts">
defineProps<{
  heading?: {
    label?: string
    labelClass?: string
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    icon?: string
    iconClass?: string
  }
}>()
</script>
<template>
  <UCard
    as="section"
    class="w-full"
    :ui="{
      rounded: 'rounded',
      header: {
        base: 'rounded-t',
        background: 'bg-bcGovColor-gray2',
        padding: 'px-4 py-4 sm:px-4',
      },
      body: {
        padding: 'px-0 py-0 sm:p-0',
      },
    }"
  >
    <template v-if="heading?.label || $slots.header" #header>
      <slot name="header">
        <component
          :is="heading?.level || 'h2'"
          class="flex items-center gap-2"
        >
          <UIcon
            v-if="heading?.icon"
            :name="heading.icon"
            :class="heading?.iconClass || 'size-6 shrink-0 text-bcGovColor-activeBlue'"
          />
          <span :class="heading?.labelClass || 'font-semibold text-bcGovColor-darkGray text-base'">{{ heading?.label }}</span>
        </component>
      </slot>
    </template>
    <slot />
  </UCard>
</template>
