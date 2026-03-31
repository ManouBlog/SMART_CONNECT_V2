<script>
/* eslint-disable */
export default {
  name: "BadgeComp",
  //   emits: ["handleSelect"],
  props: {
    nbreTotal: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    // updateValue(event) {
    //   this.$emit("handleSelect", event.target.value);
    // },
  },
  //   mounted(){
  //     // this.chooseAnOption = this.allItems[0].value
  //   }
};
</script>
<template>
  <span class="badge bg-danger">{{ nbreTotal }}</span>
</template>
