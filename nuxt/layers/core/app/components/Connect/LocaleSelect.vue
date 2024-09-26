<script setup lang="ts">
import type { DropdownItem } from '#ui/types'
const { locale, locales, setLocale } = useI18n()

// create usable array of options to match <UDropdown> type
const items = computed<DropdownItem[][]>(() => {
  const options = locales.value.map((loc) => {
    const isCurrentLocal = loc.code === locale.value
    return {
      label: loc.name || 'N/A',
      icon: isCurrentLocal ? 'i-mdi-check' : '',
      click: () => setLocale(loc.code),
      class: isCurrentLocal ? 'bg-bcGovGray-100 text-bcGovColor-activeBlue' : '',
      iconClass: isCurrentLocal ? 'text-bcGovColor-activeBlue' : ''
    }
  })
  return [options]
})
</script>
<template>
  <UDropdown
    v-if="items[0] && items[0].length > 1"
    id="locale-select-dropdown"
    data-testid="locale-select-dropdown"
    :items="items"
  >
    <UButton
      icon="i-mdi-web"
      :aria-label="$t('ConnectLocaleSelect.label')"
      size="lg"
      color="white"
      variant="header"
    />
  </UDropdown>
</template>
