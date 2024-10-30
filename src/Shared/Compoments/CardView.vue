<script>
export default {
  name: "CardView",
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>
<template>
  <a-card style="width: auto; background: rgba(179, 201, 255, 0.38)">
    <div class="div_conteneur">
      <h6>{{ item.id }}</h6>
    </div>
    <h3 class="texte-center">{{ item.title }}</h3>
    <div v-if="item.text_one || item.text_two">
      <p>{{ item.text_one }}</p>
      <p>{{ item.text_two }}</p>
    </div>
  </a-card>
</template>
<style scoped>
p {
  font-weight: 400;
}
h3,
h6 {
  font-weight: bold;
}
.div_conteneur {
  display: flex;
  justify-content: center;
}
h6 {
  width: 30px;
  height: 30px;
  padding: 1.2em;
  display: flex;
  justify-content: center;
  place-items: center;
  background: orange;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.152);
  border-radius: 5px;
}
p {
  font-size: 1em;
}
</style>
