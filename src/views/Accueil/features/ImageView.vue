<script>
export default {
    name:"ImageView",
    props:{
    lien_img_folder:String,
    name_class_img:String,
    alt_img:String
    },
    data() {
        return{

        }
    },
}
</script>
<template>
    <img
        :src="lien_img_folder"
        :class="name_class_img"
        :alt="alt_img"
      />
</template>