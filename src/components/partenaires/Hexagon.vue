<script>
import { COLORS } from '../../utils';
export default {
    name: 'Hexagon',
    props: {
        size: {
            type: Number,
            default: 80
        },
        color: {
            type: String,
            default: COLORS.hexagonBlue
        },
        textColor: {
            type: String,
            default: COLORS.textLight
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
    <div class="conteneur_hexagon"></div>
</template>
<style scoped>
.conteneur_hexagon {
    width: 50px;
    height: 80px;
    background-color: #1E3A5F;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: orange;
    font-size: 10px;
    font-weight: bold;
}
</style>
