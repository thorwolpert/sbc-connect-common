<script setup lang="ts">
const { isAuthenticated, login, logout } = useKeycloak()
</script>
<template>
  <div class="flex flex-col mx-auto"> 
    <div> hello </div>
    <ClientOnly>
      <UButton v-if="!isAuthenticated" label="Login" @click="login(IdpHint.BCSC)" />
      <UButton v-else-if="isAuthenticated" label="Logout" @click="logout()" />
      <div> {{ isAuthenticated }} </div>
    </ClientOnly>
    <ConnectFooter />
  </div>
</template>