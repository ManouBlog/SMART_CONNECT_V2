<script setup>
import { ref, onMounted } from 'vue';
import Hexagon from '../components/partenaires/Hexagon.vue';
import HeaderDashboard from '../Shared/Compoments/HeaderDashboard.vue';
import instance from '../api/api.js';
import { useLoadingSpinner } from '../store-pinia/LoadingSpinner/useLoadingSpinner.js';
import { useRoute } from 'vue-router';

const showModal = ref(false);
const route = useRoute();
const storeLoading = useLoadingSpinner();
const handlePartnerSelect = () => {
    showModal.value = true
}
const closeModal = () => {
    showModal.value = false
}
const data = ref([]);

const getPartenaires = async () => {
    storeLoading.launchLoading(true);
    try {
        const responsePartenaires = await instance.get("allPartenaire");
        const typePartenaire = route.params.title;
        console.log("typePartenaire", typePartenaire);
        if (typePartenaire.includes('institutionnels')) {
            data.value = responsePartenaires.data.data.filter(item => item.type_partenaire == 'institution');
        }
        if (typePartenaire.includes('écoles')) {
            data.value = responsePartenaires.data.data.filter(item => item.type_partenaire == 'ecole');
        }
    } catch (error) {
        console.error(error)
    } finally {
        storeLoading.launchLoading(false);
    }
}

onMounted(async () => {
    await getPartenaires()
})
</script>
<template>
    <HeaderDashboard TitleHeader="Partenaires" :subTitleHeader="$route.params.title" />
    <h1 style="text-align: center;color:#ff9900">{{ $route.params.title }}</h1>
    <div class="grid-container">
        <div v-for="partenaire in data" :key="partenaire.id" class="partner-item">
            <Hexagon @select="handlePartnerSelect()" @closeModal="closeModal" :showModal="showModal" :item="partenaire"
                :stylehexagon="{
                    width: '80px',
                    height: '90px',
                }" />
        </div>
    </div>

</template>
<style scoped>
.partner-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
}
</style>