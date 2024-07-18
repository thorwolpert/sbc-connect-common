<script setup lang="ts">
const { isAuthenticated, login, logout } = useKeycloak()
</script>
<template>
  <div class="mx-auto flex flex-col bg-gray-500">
    <ConnectHeader />
    <img
      class="h-[60px] scale-125"
      src="BCGovLogoLgEn"
      alt="$t('ConnectBCGovLogo.alt')"
    >
    <div> hello </div>
    <ClientOnly>
      <UButton v-if="!isAuthenticated" label="Login" @click="login(IdpHint.BCSC)" />
      <UButton v-else-if="isAuthenticated" label="Logout" @click="logout()" />
      <div> {{ isAuthenticated }} </div>
    </ClientOnly>
    <ConnectFooter />
  </div>
</template>
