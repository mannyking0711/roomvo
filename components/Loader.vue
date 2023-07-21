<template>
  <div class="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped>
.loader {
  position: relative;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 2px;
  width: 100px;
  height: 100px;
}
.loader > div {
  position: relative;
  width: 100%;
  height: 100%;
  background: tomato;
  transform: scale(0);
  transform-origin: center center;
  animation: loader 2s infinite linear;
}
.loader > div:nth-of-type(1), .loader > div:nth-of-type(5), .loader > div:nth-of-type(9) {
  animation-delay: 0.4s;
}
.loader > div:nth-of-type(4), .loader > div:nth-of-type(8) {
  animation-delay: 0.2s;
}
.loader > div:nth-of-type(2), .loader > div:nth-of-type(6) {
  animation-delay: 0.6s;
}
.loader > div:nth-of-type(3) {
  animation-delay: 0.8s;
}

@keyframes loader {
  0% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
  80% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>