<script setup lang="ts">
const { isAuthenticated } = useKeycloak()
const localePath = useLocalePath()
</script>
<template>
  <header
    id="connect-main-header"
    data-testid="connect-main-header"
    class="relative border-b-2 border-bcGovColor-navDivider bg-bcGovColor-header p-2 sm:px-4 dark:border-b dark:bg-bcGovColor-darkGray"
  >
    <nav
      class="m-auto flex w-full max-w-bcGovLg items-center justify-between"
      :aria-label="$t('ConnectHeader.navLabel')"
    >
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center gap-1 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-white"
        :aria-label="$t('btn.bcRegHome')"
      >
        <ConnectBCGovLogo />
        <span class="text-base font-semibold text-white lg:text-lg"> {{ $t('label.bcRegOLServices') }} </span>
      </NuxtLink>
      <ClientOnly>
        <div class="flex gap-1">
          <ConnectHeaderAuthenticatedOptions v-if="isAuthenticated" />
          <ConnectHeaderUnauthenticatedOptions v-else />
          <ConnectLocaleSelect />
        </div>
      </ClientOnly>
    </nav>
  </header>
</template>
