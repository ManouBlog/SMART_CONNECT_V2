```vue
<template>
  <n-dynamic-input v-model:value="localValue" :on-create="onCreate">
    <template #create-button-default>
      <slot name="create-button">{{TitleBtnName}}</slot>
    </template>

    <template #default="{ value }">
      <div style="display: flex; align-items: center; width: 100%">
        <n-input
    pair
    separator="-"
    :placeholder="placeholder"
    clearable
    @change="handleInputChange"
    @update:value="handleInputInput"
     />
        <n-input v-model:value="value.string" type="text" />
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
```
