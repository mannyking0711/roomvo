<script setup lang="ts">

// State
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const hoverItem = useState('hoverItem', () => 'Multi-surface');
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Static
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const items = [
  {
    name: 'Multi-surface',
    link: 'multi',
    image: "/assets/img/logo-multi-surface.webp"
  },
  {
    name: 'Flooring',
    link: 'floor',
    image: "/assets/img/logo-flooring.webp"
  },
  // {
  //   name: 'Rugs',
  //   link: 'rug',
  //   image: "/assets/img/logo-rugs.webp"
  // },
  {
    name: 'Wall paint',
    link: 'wall',
    image: "/assets/img/logo-wall-paint.webp"
  },
  {
    name: 'Wall tiles & wallpaper',
    link: 'ext',
    image: "/assets/img/logo-wall-tiles-paper.webp"
  },
]
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
</script>

<template>
  <div class="background text-center">

    <Head>
      <Title>Roomvo</Title>
    </Head>


    <div class="text-h2 text-bold q-pa-md">Your products. Our platform.</div>

    <div class="q-pb-xl">Roomvo inspires confidence in consumer decision making, leading to more sales and increased customer loyalty.</div>


    <div class="row text-left">


      <div class="col-md-3">

        <div class="text-h6 text-bold text-grey-5">Try our demos</div>
        <hr />

        <q-btn v-for="item of items"
               align="left" no-caps flat
               @click="navigateTo(item.link)"
               @mouseover="hoverItem = item.name"
               class="full-width text-subtitle1 q-py-md q-px-lg q-mt-xs">
          {{ item.name }}
        </q-btn>


      </div>


      <div class="col-md-9 q-pl-md relative-position">

        <img v-for="item of items"
             v-show="hoverItem === item.name"
             :src="item.image" :alt="item.name"
             class="full-width absolute"/>

      </div>


    </div>

  </div>
</template>

<style scoped>
.background {
  background-color: #055B61;
  background-image: url("/assets/svg/Demo-pattern.svg");
  color: white;
  padding: 5rem 5rem;
}

hr {
  border-color: darkgrey;
  border-style: solid;
}
</style>