<!-- eslint-disable prettier/prettier -->
<script>
export default {
  name: "MySelect",
  emits: ["handleSelect"],
  props: {
    allItems: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      chartData: null,
      chartOptions: null,
      chooseAnOption: "",
    };
  },
  methods: {
    updateValue(event) {
      this.$emit("handleSelect", event.target.value);
    },
  },
  mounted(){
    this.chooseAnOption = this.allItems[0].value
  }
};
</script>
<template>
  <select
    name="options"
    id="options"
    @change="updateValue"
    v-model="chooseAnOption"
  >
    <option value="" disabled>Séléctionne une option</option>
    <option
      :value="items.value"
      v-for="(items, index) in this.allItems"
      :key="index"
    >
      {{ items.libelle }}
    </option>
  </select>
</template>
