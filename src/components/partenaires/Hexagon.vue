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
        },
        stylehexagon: {
            type: Object,
            default: () => ({
                width: '60px',
                height: '70px',
            })
        }
    },
    emits: ['select'],
    data() {
        return {
            COLORS: COLORS
        };
    },
    methods: {
        handleClick() {
            this.$emit('select', this.partner);
        }
    }

};
</script>
<template>
    <div class="conteneur_hexagon" :style="stylehexagon"
    @click="handleClick"
    ></div>
</template>
<style scoped>
.conteneur_hexagon {

    background-color: #25525F;
    clip-path: polygon(45% 1%,
            50% 0%,
            55% 1%,

            94% 22%,
            98% 25%,
            100% 30%,

            100% 70%,
            98% 75%,
            94% 78%,

            55% 99%,
            50% 100%,
            45% 99%,

            6% 78%,
            2% 75%,
            0% 70%,

            0% 30%,
            2% 25%,
            6% 22%);

    border-radius: 12px;
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: orange;
    font-size: 10px;
    font-weight: bold;
}
</style>
