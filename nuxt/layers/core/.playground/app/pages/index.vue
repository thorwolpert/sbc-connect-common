<script setup lang="ts">
const { isAuthenticated, login, logout } = useKeycloak()
</script>
<template>
  <div class="flex flex-col gap-8 border border-black px-2 py-8">
    <h1 class="text-3xl font-semibold text-bcGovColor-darkGray">
      Testing
    </h1>
    <ClientOnly>
      <UButton v-if="!isAuthenticated" label="Login" @click="login(IdpHint.BCSC)" />
      <UButton v-else-if="isAuthenticated" label="Logout" @click="logout()" />
      <div> {{ isAuthenticated }} </div>
    </ClientOnly>
  </div>
</template>