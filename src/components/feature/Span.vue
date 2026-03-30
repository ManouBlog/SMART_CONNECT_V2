<script>

export default {
    name: "Span",
    props:{
     name:String,
     isFacultatif:Boolean
    },
    data() {
    return {
        visible:true
    };
  },
}
</script>
<template>
     <span class="my_label my-2">{{ name }} 
                      <b class="text-danger" v-if="!isFacultatif">*</b>
        </span>
</template>
<style scoped>
.my_label{
    width: 100%;
    
    }
</style>