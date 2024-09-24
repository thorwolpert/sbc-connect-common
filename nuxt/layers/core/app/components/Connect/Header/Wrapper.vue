<template>
  <header
    id="connect-header-wrapper"
    data-testid="connect-header-wrapper"
    class="relative border-b-2 border-bcGovColor-navDivider bg-bcGovColor-header p-2 sm:px-4 dark:border-b dark:bg-bcGovColor-darkGray"
  >
    <nav
      class="m-auto w-full max-w-bcGovLg"
      :aria-label="$t('ConnectHeader.navLabel')"
    >
      <slot />
    </nav>
  </header>
</template>
