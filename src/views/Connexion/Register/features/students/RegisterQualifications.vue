<template>
  <form @submit.prevent="submit">
    <div class="my-3">
      <n-dynamic-input v-model:value="localItems" :on-create="onCreateQualification">
        <!-- Bouton Ajoutez -->
        <template #create-button-default>
          <slot name="create-button"> Diplomes ou certifications obtenues </slot>
        </template>

        <!-- Contenu d’un item -->
        <template #default="{ value }">
          <div
            style="
              display: flex;
              align-items: center;
              width: 100%;
              gap: 1em;
              flex-direction: column;
              margin-top:2em;
            "
          >
            <div style="width: 100%">
              <label for="objet"><span style="color:red;" v-if="isRequired">*</span> Diplôme ou certification obtenue</label>
              <input type="text" class="input_class" id="objet" v-model="value.objet" />
            </div>
            <div style="width: 100%">
              <label for="periode"><span style="color:red;" v-if="isRequired">*</span> Période</label>
              <div style="display: flex; gap: 1em; align-items: center">
                <input
                  type="date"
                  class="input_class"
                  id="periode"
                  v-model="value.date_debut"
                />
                <p>À</p>
                <input 
                type="date"

                 class="input_class" 
                 :disabled="!value.date_debut"
                 :min="value.date_debut"
                v-model="value.date_fin" 
                />
              </div>
            </div>
            <div style="width: 100%">
              <label for="descriptionFile">Charger un fichier</label>
              <input
      type="file"
      id="descriptionFile"
      @change="(event)=>value.fileCharged = event.target.files[0]"
      style="
        width: 100%;
        border-radius: 5px;
        padding: 0.5em;
        border: 1px solid gray;
      "
    />
            </div>
          </div>
        </template>
      </n-dynamic-input>
    </div>
  </form>
</template>

<script>
export default {
  name: "QualificationDynamicForm",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    isRequired:{
      type:Boolean,
      default:true
    }
  },

  emits: ["update:modelValue"],

  data() {
    return {
      // initialise localItems avec la valeur du parent
      localItems: [...this.modelValue],
    };
  },

  watch: {
    localItems: {
      deep: true,
      handler(value) {

        this.$emit("update:modelValue", value);
      },
    },

    // si le parent change sa valeur, met à jour localItems
    modelValue: {
      deep: true,
      handler(value) {
        this.localItems = [...value];
      },
    },
  },

  methods: {
    onCreateQualification() {
      return {
        date_debut: null,
        date_fin: null,
        fileCharged: null,
        objet: "",
      };
    },
  },
};
</script>
<style scoped>
.input_class {
  width: 100%;
  padding: 0.5em;
  border-radius: 5px;
  border: 1px solid gray;
}
@media (max-width: 768px) {
  :deep(.n-dynamic-input .n-dynamic-input-item){
    display:block;
  }
}
</style>
