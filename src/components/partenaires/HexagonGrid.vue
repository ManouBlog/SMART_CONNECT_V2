<script>
import Hexagon from './Hexagon.vue';
export default {
    name: 'HexagonGrid',
    components: { Hexagon },
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
        }
    },
    data() {
        return {};
    },

};
</script>
<template>
    <div class="conteneur_hexagon">
        <div class="conteneur_rows_hexagons">
            <Hexagon :key="'hex-' + rowIndex + '-' + colIndex" :size="size" />
            <Hexagon :key="'hex-' + rowIndex + '-' + colIndex" :size="size" />
            <Hexagon :key="'hex-' + rowIndex + '-' + colIndex" :size="size" />
            <Hexagon :key="'hex-' + rowIndex + '-' + colIndex" :size="size" />
            <Hexagon :key="'hex-' + rowIndex + '-' + colIndex" :size="size" />
        </div>
    </div>
</template>
<style scoped>
.second_hexagon {
    margin-left: -10px;
}

.conteneur_hexagon {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 auto;
}

.conteneur_rows_hexagons {
    display: flex;
    gap: 0.4em;
    flex-wrap: wrap;
}
</style>
