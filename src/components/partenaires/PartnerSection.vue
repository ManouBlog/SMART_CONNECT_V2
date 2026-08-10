<script>
import HexagonGrid from './HexagonGrid.vue';
import { COLORS } from '../../utils';
export default {
    name: 'PartnerSection',
    components: { HexagonGrid },
    props: {
        title: {
            type: String,
            required: true
        },
        dataPartenaires:{
           type: Array,
            required: true
        },
        stylemargin: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            COLORS: COLORS,
        };
    },
    computed: {
        titlePartenaire() {
            return `${this.title}`
        }
    },
    methods: {
        voirPlus() {
            this.$router.push({
                name: 'detail_partenaires',
                params: { title: this.titlePartenaire }
            })
        }
    }

};
</script>
<template>
    <div class="container_partner">
        <h2>{{ title }}</h2>
        <HexagonGrid :rows="rows" :cols="cols" :size="size" />
        <HexagonGrid :rows="rows" :cols="cols" :size="size" :style="stylemargin" />
        <HexagonGrid :rows="rows" :cols="cols" :size="size" />
        <a @click.prevent="voirPlus(title)">Voir plus...</a>
    </div>
</template>
<style scoped>
.container_partner {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.1em
}

.container_partner h2 {
    font-size: 1em;
    font-weight: bold;
    color: black;
    margin-bottom: 1.5rem;
    font-family: Arial, sans-serif;
}

.container_partner a {
    color: #FFA500;
    font-size: 1rem;
    font-family: Arial, sans-serif;
    cursor: pointer;
    text-decoration: underline;
    margin-top: 1rem;
    display: inline-block;
}
</style>
