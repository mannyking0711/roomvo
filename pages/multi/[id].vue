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



// Static
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const options = [
  {key: 'Floors', value: 'Floors'},
  {key: 'Walls', value: 'Walls'},
  // {key: 'CounterTops', value: 'CounterTops'},
]
const patterns = [
  {key: 'Floors', value: ''},
  {key: 'Walls', value: ''},
  // {key: 'CounterTops', value: ''},
];
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// State
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const imageLink = useState('image')
const type = useState('type', () => (options[1]))
const viewMode = useState('viewMode', () => 'list')
const selectedTile = useState('selectedTile', () => "");
const {data: products} = (await useFetch('/api/multi/all', {
  query: {
    vendor_id: store.multiMeta.vendorId,
    product_id: store.multiMeta.products[0].id,
    type: type.value.value
  }
}))

watch(
    () => type.value,
    async (type: any) => {

      const {data} = await useFetch('/api/multi/all', {
        query: {
          vendor_id: store.multiMeta.vendorId,
          product_id: store.multiMeta.products[1].id,
          type: type.value
        }
      })


      products.value = data.value

    }
)
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



// Event: click on tile
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const onClickTile = async (id: string) => {
  store.setLoading(true)

  selectedTile.value = id;
  patterns.find(p => p.key === type.value.value)!.value = id

  const urls: any[] = []

  // Floor
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (patterns[0].value) {
    for (let i = 1; i < 2; i ++) {
      urls.push(["product_id", patterns[0].value])
      urls.push(["product_orientation", "0"])
      urls.push(["product_instance", i.toString()])
    }
  }
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



  // Wall
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (patterns[1].value) {
    for (let i = 2; i < 20; i ++) {
      urls.push(["product_id", patterns[1].value])
      urls.push(["product_orientation", "0"])
      urls.push(["product_instance", i.toString()])
    }
  }
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


  imageLink.value = `https://www.roomvo.com/services/room/rooms/${route.params.id}/paint/?` +
      new URLSearchParams([
        ...urls,
        ["img_format", "jpg"],
        ["is_for_download", "0"],
        ["vendor", store.multiMeta.vendorId],
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
        <back-button to="/wall"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding class="flex">
        <div class="row" style="flex: 1">


          <div class="col-md-3 q-pr-lg-md" style="display: flex; flex-direction: column">

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
                         @click="onClickTile(p.id)"/>
            </scroll-area>

          </div>


          <div class="col-md-9">
            <img :src="imageLink" alt="preview" class="full-width full-height" @load="onImageChanged"/>
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