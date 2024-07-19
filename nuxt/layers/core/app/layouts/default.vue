<template>
  <div
    data-testid="connect-default-layout"
    class="mx-auto flex min-h-screen w-full flex-col bg-bcGovColor-gray1"
  >
    <ConnectHeader />
    <div class="mx-auto w-full max-w-bcGovLg grow">
      <slot />
    </div>
    <ConnectFooter />
  </div>
</template>
