<script setup lang="ts">
import BackButton from "~/components/BackButton.vue"
import {useStore} from "~/stores/store"


// Store
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const store = useStore()
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



// Get rooms
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (store.getRooms.length === 0) {
  const {data: rooms} = await useFetch('/api/rooms/', {
    query: {
      visitor_id: '9beb4c45e0ce46bbb5f7347e32fa02c8'
    }
  })

  store.setRooms(rooms.value)
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// Get metadata
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (!store.isMultiLoaded) {
  const {data: metadata} = await useFetch('/api/multi/', {
    query: {
      visitor_id: '9beb4c45e0ce46bbb5f7347e32fa02c8'
    }
  })

  store.setMultiMeta(metadata.value)
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

</script>

<template>
  <div class="q-pa-xl">

    <Head>
      <Title>Roomvo - Multi surface</Title>
    </Head>

    <div class="flex">

      <div>
        <back-button to="/"/>
      </div>

      <div style="flex: 1">

        <div class="row q-pb-lg">
          <div class="text-h4 text-bold text-grey-7">See products in your room</div>
        </div>


        <div class="row q-py-lg" style="align-items: center">
          <div class="col-md-2">
            <div class="text-h5 text-bold text-grey-7">Your rooms</div>
          </div>
          <div class="col-md-10">
            <upload-button @change="navigateTo('/multi/' + $event)" />
          </div>
        </div>


        <div class="row q-py-lg">
          <div class="text-h5 text-bold text-grey-7">Don't have a picture? Try our demo rooms instead</div>
        </div>

        <div class="row">
          <div v-for="room in store.getRooms" class="col-md-3 q-px-md q-py-lg">
            <q-btn class="img-btn" @click="$router.push(`/multi/${room.picture_id}`)">
              <img :src="'https://www.roomvo.com/' + room.thumbnailUrl" alt="image"/>
            </q-btn>
            <div class="q-pl-md text-overline">{{ room.name }}</div>
          </div>
        </div>


      </div>


    </div>


  </div>
</template>

<style scoped>
</style>