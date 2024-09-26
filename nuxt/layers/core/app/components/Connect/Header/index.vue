<script setup lang="ts">
const { isAuthenticated } = useKeycloak()
</script>
<template>
  <ConnectHeaderWrapper>
    <div class="flex items-center justify-between">
      <ConnectHeaderLogoHomeLink />
      <ClientOnly>
        <div class="flex gap-1">
          <ConnectHeaderAuthenticatedOptions v-if="isAuthenticated" />
          <ConnectHeaderUnauthenticatedOptions v-else />
          <ConnectLocaleSelect />
        </div>
      </ClientOnly>
    </div>
  </ConnectHeaderWrapper>
</template>
