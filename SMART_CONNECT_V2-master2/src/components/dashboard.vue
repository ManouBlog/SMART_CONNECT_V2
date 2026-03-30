<script>
// import Header_dash from "@/components/dasboard/header_dash"
import Navbar from "@/components/dasboard/navbar"
import Footer from "@/components/dasboard/footer"
export default {
    name:"dashboard",
    components:{
     Navbar,Footer
    },
    data(){
        return{
            
        }
    }
}
</script>
<template>
<!-- <Header_dash class="head" /> -->
<Navbar />
<router-view />
<Footer />
</template>
<style scoped>
*{
    padding:0;
    margin:0;
}

</style>