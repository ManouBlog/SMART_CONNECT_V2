<script>

export default {
    name:"LogoComponent",
    data() {
        return{

        } 
    },
}
</script>
<template>
    <div class="conteneur-image-logo">
        <img style="width:150px;" src="/broboli_footer_1.png" alt="MonBrobroli" >
    </div>
</template>
<style scoped>
@media screen and (max-width:500px) {
    .conteneur-image-logo{
        align-self: center !important;
    }
}
</style>
