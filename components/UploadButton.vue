<script setup lang="ts">
import {Ref} from "vue";
import {useStore} from "~/stores/store";


/** Store **/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const store = useStore()
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


/** State **/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fileInput = useState<any>('fileInput')
const error = useState('error', () => "")
const show = useState('show', () => false)
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



/** Emits **/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const emits = defineEmits(['change'])
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



/** Upload image **/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const onUploadImage = async () => {
  const file = fileInput.value.files[0]

  if (!file)
    return

  store.setLoading(true)

  /** Upload **/
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const formData = new FormData()
  formData.append('enrolled_experiments', '{"New UI design for 3D product display":"Sees the new 3D product display UI","New product catalog":"Sees new product catalog","Compare mode for viz":"Sees compare mode in viz","Compare specs for viz":"Sees compare specs view","New wall prediction method":"Sees results of the standard wall prediction"}')
  formData.append('visitor_id', '9beb4c45e0ce46bbb5f7347e32fa02c8')
  formData.append('picture_file', file, file.name);
  formData.append('product_types', '1')
  formData.append('attestation_hash', 'MjQwMDYxMTI5Ng==')

  const res: Ref<any> = (await useFetch('/api/rooms/upload', {
    method: 'POST',
    body: formData
  })).data
  const json = JSON.parse(res.value)

  if (json.id)
    emits('change', json.id)
  else {
    error.value = (() => {
      if (res.value.includes("Not a valid picture."))
        return "This was not an image file we could process."
      else if (res.value.includes("Picture file larger than 15 MiB."))
        return "Please upload a file smaller than 15 MB."
      else if (res.value.includes("Picture resolution is too large."))
        return "Please upload an image with resolution lower than 15000x15000."
      else if (res.value.includes("Picture resolution is too small."))
        return "The picture provided was too small. Try taking a new photo of your space."
      else
        return "Please make the image more visible and try again."
    })()

    show.value = true
  }

  store.setLoading(false)
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
</script>

<template>
  <q-btn color="primary" size="lg" icon="camera" @click="fileInput.click()">Upload</q-btn>
  <input type="file" ref="fileInput" hidden @change="onUploadImage"/>

  <q-dialog v-model="show">
    <q-card style="width: 700px; max-width: 80vw; padding: 1rem">
      <q-card-section class="text-h5">
        {{ error }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" size="md" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>