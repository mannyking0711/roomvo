<script setup lang="ts">
import BackButton from "~/components/BackButton.vue"
import {useStore} from "~/stores/store"


// Store
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const store = useStore()
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


/** State **/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fileInput = useState<any>('fileInput')
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
if (!store.isWallLoaded) {
  const {data: metadata} = await useFetch('/api/walls/', {
    query: {
      visitor_id: '9beb4c45e0ce46bbb5f7347e32fa02c8'
    }
  })

  store.setWallMeta(metadata.value)
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


/** Upload image **/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const imageData = useState('imageData', () => "base64:")
const onUploadImage = async () => {
  const file = fileInput.value.files[0]

  /** Image Compression **/
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const url = window.URL.createObjectURL(file)
  const image = new Image()
  const canvas = document.createElement('canvas')

  function base64ToJFIF(base64Data: any) {
    const binaryData = atob(base64Data);
    const length = binaryData.length;
    const arrayBuffer = new ArrayBuffer(length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    return arrayBuffer
  }


  image.onload = async () => {
    let width = image.width;
    let height = image.height;

    canvas.width = 612;
    canvas.height = 365;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(image, 0, 0, width, height);

    imageData.value = canvas.toDataURL('image/jpeg')
    const arrayBuffer = base64ToJFIF(imageData.value.slice(23))
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' })




    /** Upload **/
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const formData = new FormData()
    formData.append('enrolled_experiments', '{"New UI design for 3D product display":"Sees the new 3D product display UI","New product catalog":"Sees new product catalog","Compare mode for viz":"Sees compare mode in viz","Compare specs for viz":"Sees compare specs view","New wall prediction method":"Sees results of the standard wall prediction"}')
    formData.append('visitor_id', '9beb4c45e0ce46bbb5f7347e32fa02c8')
    formData.append('picture_file', blob, file.name);
    formData.append('product_types', '1')
    formData.append('attestation_hash', 'MjQwMDYxMTI5Ng==')

    const res = await useFetch('/api/rooms/upload', {
      method: 'POST',
      body: formData
    })
    console.log(res.data)
    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  };

  image.src = url
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
</script>

<template>
  <div class="q-pa-xl">

    <div class="flex">

      <div>
        <back-button to="/" />
      </div>

      <div style="flex: 1">

        <div class="row q-pb-lg">
          <div class="text-h4 text-bold text-grey-7">See products in your room</div>
        </div>


        <div class="row q-py-lg" style="align-items: center">
          <div class="col-2"><div class="text-h5 text-bold text-grey-7">Your rooms</div></div>
          <div class="col-10"><q-btn color="primary" size="lg" icon="camera" @click="fileInput.click()">Upload</q-btn></div>
          <input type="file" ref="fileInput" hidden @change="onUploadImage" />
        </div>


        <div class="row q-py-lg">
          <div class="text-h5 text-bold text-grey-7">Don't have a picture? Try our demo rooms instead</div>
        </div>

        <div class="row">
          <div v-for="room in store.getRooms" class="col-3 q-px-md q-py-lg">
            <q-btn class="img-btn" @click="$router.push(`/wall/${room.id}`)">
              <nuxt-img format="webp" :src="'https://www.roomvo.com/' + room.uncroppedThumbnailUrl" alt="image"/>
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