<script>
import { COLORS } from '../../utils';

export default {
    name: 'Logo',

    data() {
        return {
            COLORS: COLORS
        };
    },
};
</script>

<template>
    <div :style="{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2rem auto',
    }">

        <!-- Forme extérieure blanche -->
        <div class="logo_border">

            <!-- Forme intérieure -->
            <div class="conteneur_logo_container">

                <div style="text-align: center">
                    <img
                        src="/broboli_footer_1.png"
                        class="logo_image"
                        alt="MONBROBROLI"
                    />
                </div>

            </div>
        </div>

    </div>
</template>

<style scoped>

.logo_border {
     width: clamp(90px, 16vw, 135px);
    height: clamp(115px, 20vw, 165px);

    background-color: white;

    clip-path: polygon(
        45% 1%,
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
        6% 22%
    );

    display: flex;
    align-items: center;
    justify-content: center;
}


/* Forme intérieure */
.conteneur_logo_container {
    width: calc(100% - 5px);
    height: calc(100% - 5px);

    background-color: #25525F;

    clip-path: polygon(
        45% 1%,
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
        6% 22%
    );

    display: flex;
    align-items: center;
    justify-content: center;
}


/* Logo responsive */
.logo_image {
     width: clamp(40px, 8vw, 60px);
    height: clamp(40px, 8vw, 60px);
    object-fit: cover;
}

</style>