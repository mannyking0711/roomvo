<script setup lang="ts">
const props = defineProps({
  id: String,
  brand: String,
  name: String,
  sizeName: String,
  thumbnail: String,
  active: Boolean,
})
</script>

<template>
  <div class="tile-card" :class="{ active }">
    <img :src="`https://www.roomvo.com${thumbnail}`" alt="tile"/>

    <div class="content">
      <div style="flex: 1">
        <div class="gray-text">{{ brand }}</div>
        <div class="text-subtitle2 text-bold">{{ name }}</div>
      </div>

      <div class="gray-text">Size: {{ sizeName }}</div>
    </div>
  </div>
</template>

<style scoped>
.tile-card {
  display: flex;
  gap: 2rem;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
  margin-bottom: 1rem;
  padding: 0.5rem;
  cursor: pointer;
}

.tile-card.active {
  border-color: rgb(229, 54, 0);
}

.tile-card img {
  width: 110px;
  height: 110px;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
}

.tile-card .content {
  display: flex;
  flex-direction: column;
}

.gray-text {
  color: gray;
  font-size: 0.7rem;
}
</style>