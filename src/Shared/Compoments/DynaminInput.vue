```vue
<template>
  <n-dynamic-input v-model:value="localValue" :on-create="onCreate">
    <template #create-button-default>
      <slot name="create-button">{{TitleBtnName}}</slot>
    </template>

    <template #default="{ value }">
      <div style="
      display: flex; 
      align-items: center; 
      width: 100%;
      gap:1em;
      flex-direction:column;">
        <n-input
    pair
    separator="-"
    :placeholder="placeholder"
    clearable
    @change="handleInputChange"
    @update:value="handleInputInput"
     />
     <textarea id="msg" name="msg" maxlength="150" 
            style="width:100%;border-radius:5px;padding:1em" 
            placeholder="Détails (max 150 caractères)"
           v-model="value.string"
            ></textarea>
      </div>
    </template>
  </n-dynamic-input>
</template>

<script setup>
import { ref,defineProps,defineEmits } from "vue";
const placeholder = ["De", "A"];

// Props
const props = defineProps({
  value: {
    type: Array,
    default: () => [{ string: "A String" }],
  },
  TitleBtnName:{
    type:String,
    required:true
  }
});

// Emit
defineEmits(["update:value"]);

// Valeur locale pour édition
const localValue = ref([...props.value]);
function handleInputInput(valueDate){
    console.log("valueDate",valueDate)
}
function handleInputChange(valueDate){
    console.log("valueDate",valueDate)
}
// Fonction de création d’un nouvel élément
function onCreate() {
  return { string: "A String" };
}
</script>
<style scoped>
:deep(.n-button--default-type){
    color:orange !important;
}
:deep(.n-button--default-type:hover){
 color:orange !important;   
}
:deep(.n-input-wrapper:hover){
    color:orange !important;
}
</style>
