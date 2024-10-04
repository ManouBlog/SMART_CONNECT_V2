<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  elmentsOfBtn: Array,
  shapeBtn: String,
});
const emit = defineEmits(["created"]);
const clickBtn = () => {
  emit("created");
};
</script>
<template>
  <a-button
    v-for="(item, index) in elmentsOfBtn"
    class="mx-2"
    :key="index"
    :type="item.color_btn"
    :shape="shapeBtn"
    @click.prevent="clickBtn"
    >{{ item.name_btn }}
  </a-button>
</template>
<style>
.ant-btn-primary {
  background: rgba(255, 153, 0, 1) !important;
}
</style>
