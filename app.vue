<template>
  <NuxtLayout>
    <div class="full-screen center" v-if="store.loading">
      <loader />
    </div>

    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import {useStore} from "~/stores/store";
// import {setCssVar} from "quasar";


// Store
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const store = useStore()
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// Quasar Config
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// setCssVar('primary', "rgb(229, 54, 0)")
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
</script>

<style>
@import 'style.scss';
</style>