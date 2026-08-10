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
        rows: {
            type: Number,
            default: 3
        },
        cols: {
            type: Number,
            default: 4
        },
        size: {
            type: Number,
            default: 80
        },
        stylemargin:{
            type:String,
            default:null
        }
    },
    data() {
        return {
            COLORS: COLORS
        };
    },

};
</script>
<template>
    <div class="container_partner">
        <h2>{{ title }}</h2>
        <HexagonGrid :rows="rows" :cols="cols" :size="size" />
        <HexagonGrid :rows="rows" :cols="cols" :size="size" 
        :style="stylemargin" />
        <HexagonGrid :rows="rows" :cols="cols" :size="size" />
        <a>Voir plus...</a>
    </div>
</template>
<style scoped>
.container_partner {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em
}

.container_partner h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1E3A5F;
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
