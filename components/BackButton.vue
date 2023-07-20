<template>
  <q-btn class="q-mx-sm text-grey-8" round flat icon="close" @click="$router.push(to)"/>
</template>

<script setup lang="ts">
defineProps({
  to: { type: String, required: true }
})
</script>