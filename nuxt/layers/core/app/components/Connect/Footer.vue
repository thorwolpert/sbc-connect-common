<script setup lang="ts">
const links = [
  {
    label: 'ConnectFooter.home',
    to: '/'
  },
  {
    label: 'ConnectFooter.disclaimer',
    to: 'https://www2.gov.bc.ca/gov/content/home/disclaimer',
    target: '_blank'
  },
  {
    label: 'ConnectFooter.privacy',
    to: 'https://www2.gov.bc.ca/gov/content/home/privacy',
    target: '_blank'
  },
  {
    label: 'ConnectFooter.ally',
    to: 'https://www2.gov.bc.ca/gov/content/home/accessibility',
    target: '_blank'
  },
  {
    label: 'ConnectFooter.copyright',
    to: 'https://www2.gov.bc.ca/gov/content/home/copyright',
    target: '_blank'
  }
]
</script>

<template>
  <footer
    id="connect-main-footer"
    class="border-t-2 border-bcGovColor-navDivider bg-bcGovColor-footer p-2 dark:border-t dark:bg-bcGovColor-darkGray"
  >
    <div class="mx-auto flex max-w-bcGovLg items-center justify-between">
      <nav :aria-label="$t('ConnectFooter.navLabel')" class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to === '/' ? `/${$i18n.locale}` : link.to"
          :target="link.target"
          class="rounded p-1 text-sm text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {{ $t(link.label) }}
        </NuxtLink>
      </nav>
      <span class="whitespace-nowrap italic text-bcGovColor-navDivider">{{ $t('ConnectFooter.bcApp') }}</span>
    </div>
  </footer>
</template>
