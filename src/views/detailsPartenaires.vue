<script setup>
import { defineProps } from 'vue';
import Hexagon from '../components/partenaires/Hexagon.vue';
import HeaderDashboard from '../Shared/Compoments/HeaderDashboard.vue';
defineProps({
    data: {
        type: Array,
        default: () => [
            {
                id: 1,
                name: 'Partenaire 1',
                image: '/images/partenaire1.png'
            },
            {
                id: 2,
                name: 'Partenaire 2',
                image: '/images/partenaire2.png'
            }
        ]
    }
})

const handlePartnerSelect = (partenaire)=> {
            console.log('Partenaire sélectionné :', partenaire);
        }
</script>
<template>
    <HeaderDashboard TitleHeader="Partenaires"
    :subTitleHeader="this.$route.params.title"
    />
    <h1 style="text-align: center;color:#FF9900">{{ this.$route.params.title }}</h1>
    <div class="grid-container">
        <div v-for="partenaire in data" :key="partenaire.id" class="partner-item">
            <Hexagon
             @select="handlePartnerSelect(partenaire)"
            :stylehexagon="{
                width: '80px',
                height: '90px',
            }" />
        </div>
    </div>
</template>
<style scoped>
.grid-container {
    display: flex;
    justify-content: center;
    place-content: center;
    align-items: center;
    gap: 0.1em;
    padding: 1em 0;
}
</style>