<script>
export default {
    name:"ImageView",
    props:{
    lien_img_folder:String,
    name_class_img:String,
    alt_img:String,
    lienCliquable:String
    },
    data() {
        return{

        }
    },
}
</script>
<template>
    <a :href="lienCliquable" target="_blank" rel="noopener">
    <img
        :src="lien_img_folder"
        :class="name_class_img"
        :alt="alt_img"
      />
      </a>
</template>
<style scoped>
@media screen and (max-width:800px) {
    .image_class{
        width:200px !important;
    }
}
</style>