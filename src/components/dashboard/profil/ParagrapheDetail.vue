<!-- Composant: ProfileField.vue -->
<template>
<div v-if="item.value || item.valueArray">
 <p 
    style="color: orange; font-weight: bold"
        v-if="item.libelle !== null"
      >
        {{ item.libelle }} :
      </p>
      <h6 class="fw-bold" v-if="!item.valueArray">
        <span v-if="typeof item.value == 'string'">{{ item.value }}</span>
        <span v-else>
            <span v-for="el in item.value"
            :key="el"
            style="display: flex;gap:1em"
            >
            <span class="badge" style="background-color: white;
            color: orange;font-weight: bold;margin: 0.5em;">{{ el || el?.email_cc }}</span>
            </span>
        </span>
      </h6>
      
      <div
      v-else
        style="display: flex; justify-content: flex-start; gap: 1em"
        >
              <section v-for="(element, index) in item.valueArray" :key="index">
                <div>
                  <div v-if="Help?.splitFilename(element?.path) === 'pdf'">
                    <n-button type="warning" @click="showModal = true">
                      Voir
                    </n-button>
                    <n-modal
                      v-model:show="showModal"
                      style="width: 80%; max-width: 900px"
                    >
                      <n-card title="Document PDF" closable @close="showModal = false">
                        <iframe
                          :src="lienPhoto + element.path"
                          style="width: 100%; height: 600px; border: none"
                        ></iframe>
                      </n-card>
                    </n-modal>
                  </div>
                  <n-image
                    v-else
                    v-for="(photo, index) in [element.path]"
                    :key="index"
                    :alt="photo"
                    width="100"
                    height="130"
                    :src="lienPhoto + photo"
                  />
                </div>
              </section>
            </div>
    </div>
   
</template>

<script>
import { lienPhoto } from '../../../api/api';
import { Help } from '../../../utils';
export default {
  name: 'ParagrapheDetail',
  props: {
    item: {
      type: Object,
      required: true,
       default: () => ({ libelle: '', value: '' })
    }
  },
  data() {
    return {
      textes: {},
      lienPhoto:lienPhoto,
      Help:Help,
      showModal:false
    }
  },

}
</script>
<style scoped>
h6 {
  text-align: left;
  font-size: 1.2em;
}
h1 {
  text-align: left;
}
</style>