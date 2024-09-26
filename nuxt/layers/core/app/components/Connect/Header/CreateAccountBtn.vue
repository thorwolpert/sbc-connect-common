<script setup lang="ts">
const { createAccountUrl } = useConnectNav()
</script>
<template>
  <UButton
    variant="header"
    color="white"
    :label="$t('btn.createAccount')"
    :to="createAccountUrl()"
  />
</template>
