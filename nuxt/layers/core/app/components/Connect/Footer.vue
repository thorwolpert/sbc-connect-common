<script setup lang="ts">
const version = useRuntimeConfig().public.version
const localePath = useLocalePath()
const links = [
  {
    label: 'ConnectFooter.home',
    to: localePath('/')
  },
  {
    label: 'ConnectFooter.releaseNotes',
    to: 'https://www.release-notes.bcregistry.gov.bc.ca',
    target: '_blank'
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
    data-testid="connect-main-footer"
    class="border-t-2 border-bcGovColor-navDivider bg-bcGovColor-footer dark:border-t dark:bg-bcGovColor-darkGray"
  >
    <div class="mx-auto flex max-w-bcGovLg items-center justify-between px-2 py-4">
      <nav :aria-label="$t('ConnectFooter.navLabel')" class="flex grow">
        <ul class="list-none flex-col gap-1 p-0 sm:-ml-2 sm:flex-row sm:flex-wrap">
          <li
            v-for="link in links"
            :key="link.to"
            class="flex-col gap-2 border-r-0 pr-2 last:mr-0 last:border-r-0 sm:mr-2 sm:inline-block sm:flex-none sm:border-r sm:first:ml-2"
          >
            <NuxtLink
              :to="link.to === '/' ? `/${$i18n.locale}` : link.to"
              :target="link.target"
              class="rounded p-1 text-sm text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {{ $t(link.label) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="-mb-1">
        <span class="italic text-bcGovColor-navDivider">{{ $t('ConnectFooter.bcApp') }}</span>
        <ConnectToggletip
          id="app-version-info"
          :text="version"
          class="ml-1 inline-flex items-baseline"
        />
      </div>
    </div>
  </footer>
</template>
