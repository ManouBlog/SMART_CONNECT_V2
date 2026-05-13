```vue
<template>
  <n-dynamic-input 
  v-model:value="localValue"
  @change="handleLovalValue"
  :on-create="onCreate">
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
    v-model:value="value.periode"
    status="warning"
     />
     <textarea id="msg" name="msg" maxlength="150" 
            style="width:100%;border-radius:5px;padding:1em" 
            placeholder="Détails (max 150 caractères)"
           v-model="value.detail"
            ></textarea>
      </div>
    </template>
  </n-dynamic-input>
  <p>{{JSON.stringify(localValue,null,2)}}</p>
</template>

<script setup>
import { useInfoPersonnel } from "../../store-pinia/InfoPersonnelle/useInfoPersonnel";
import { ref,defineProps,defineEmits} from "vue";
const placeholder = ["De", "A"];
const localValue = ref([
  {
    periode: [],
    detail: "",
  }
])

const {updateOtherInfoPersonnelle}=useInfoPersonnel()

// Props
defineProps({
  TitleBtnName:{
    type:String,
    required:true
  },
});

// Emit
defineEmits(["update:value"]);

updateOtherInfoPersonnelle(localValue.value)
function handleLovalValue(value){
    console.log("handleLovalValue",value)
}

function handleInputInput(valueDate){
    console.log("valueDate",valueDate)
}
function handleInputChange(valueDate){
    console.log("valueDate",valueDate)
}
// Fonction de création d’un nouvel élément
function onCreateQualification() {
  return { detail: "",periode:[] };
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
