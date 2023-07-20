<script setup lang="ts">
import BackButton from "~/components/BackButton.vue";
import {useStore} from "~/stores/store";


// Store
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const route = useRoute()
const store = useStore()
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Init
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
definePageMeta({
  middleware: ["meta-check"]
});
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// State
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const imageLink = useState('image')
const type = useState('type', () => 'Floors')
const viewMode = useState('viewMode', () => 'list')
const selectedTile = useState('selectedTile', () => "");
const {data: products} = (await useFetch('/api/floors/all', {
  query: {
    vendor_id: store.floorMeta.vendorId,
    product_id: store.floorMeta.products[0].id
  }
}))
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// Static
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const options = [
  {key: 'Floors', value: 'Floors'},
]
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// Event: click on tile
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const onClickTile = async (id: string) => {
  store.setLoading(true)

  selectedTile.value = id;

  imageLink.value = `https://www.roomvo.com/services/room/rooms/${route.params.id}/paint/?` +
      new URLSearchParams([
        ["product_id", id],
        ["product_orientation", "0"],
        ["product_instance", "1"],
        ["img_format", "jpg"],
        ["is_for_download", "0"],
        ["vendor", store.floorMeta.vendorId],
        ["visitor", "9beb4c45e0ce46bbb5f7347e32fa02c8"],
        ["locale", "en-gb"],
        ["display_width", "1024"],
        ["display_height", "1024"],
      ]);
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// Event: after image loaded
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const onImageChanged = () => {
  store.setLoading(false)
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// Lifecycle
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  onClickTile((products.value as any)[0].id)
})
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
</script>

<template>
  <q-layout container class="shadow-2" style="height: 100vh">
    <q-header bordered>
      <q-toolbar>
        <back-button to="/floor"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding class="flex">
        <div class="row" style="flex: 1">


          <div class="col-3 q-pr-lg" style="display: flex; flex-direction: column">

            <div class="flex justify-between ti-align-center q-pb-lg">
              <q-select
                  v-model="type"
                  :options="options"
                  borderless
                  option-value="key"
                  option-label="value"
                  option-disable="inactive"
              />


              <q-btn-toggle v-model="viewMode" rounded toggle-color="primary" size="sm"
                            :options="[
                            {slot: 'list', value: 'list'},
                            {slot: 'tile', value: 'tile'}
                          ]">

                <template v-slot:list>
                  <div class="row items-center no-wrap">
                    <q-icon name="menu"/>
                  </div>
                </template>

                <template v-slot:tile>
                  <div class="row items-center no-wrap">
                    <q-icon name="apps"/>
                  </div>
                </template>
              </q-btn-toggle>

            </div>

            <scroll-area>
              <tile-item v-for="(p, key) of products" :key="key"
                         :id="p.id"
                         :name="p.name"
                         :brand="p.brand"
                         :sizeName="(p as any).sizeName"
                         :thumbnail="p.thumbnail"
                         :active="selectedTile === p.id"
                         @click="onClickTile(p.id)" />
            </scroll-area>

          </div>


          <div class="col-9">
            <img :src="imageLink" alt="preview" class="full-width full-height" @load="onImageChanged" />
          </div>

        </div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.q-header {
  background-color: inherit;
}

.q-toolbar {
  color: black;
  background-color: white;
}
</style>