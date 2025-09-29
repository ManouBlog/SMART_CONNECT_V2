```vue
<template>
  <n-dynamic-input v-model:value="localValue" :on-create="onCreate">
    <template #create-button-default>
      <slot name="create-button">{{TitleBtnName}}</slot>
    </template>

    <template #default="{ value }">
      <div style="display: flex; align-items: center; width: 100%">
        <n-checkbox v-model:checked="value.isCheck" style="margin-right: 12px" />
        <n-input-number
          v-model:value="value.num"
          style="margin-right: 12px; width: 160px"
        />
        <n-input v-model:value="value.string" type="text" />
      </div>
    </template>
  </n-dynamic-input>
</template>

<script setup>
import { ref,defineProps,defineEmits } from "vue";

// Props
const props = defineProps({
  value: {
    type: Array,
    default: () => [{ isCheck: true, num: 1, string: "A String" }],
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

// Fonction de création d’un nouvel élément
function onCreate() {
  return { isCheck: false, num: 1, string: "A String" };
}
</script>
```
