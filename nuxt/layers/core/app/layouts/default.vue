<template>
  <div
    data-testid="connect-default-layout"
    class="mx-auto flex min-h-screen w-full flex-col bg-bcGovColor-gray1"
  >
    <ConnectHeader />
    <ConnectBreadcrumb />
    <div
      class="mx-auto w-full max-w-bcGovLg grow"
      data-testid="connect-default-layout-slot"
    >
      <slot />
    </div>
    <ConnectFooter />
  </div>
</template>
