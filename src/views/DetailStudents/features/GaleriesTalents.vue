<template>
    <div class="gallery-card">

        <!-- ── GRILLE PREVIEW ─────────────────────────── -->
        <div class="preview-grid" v-if="images.length">

            <!-- Jusqu'à MAX_PREVIEW images visibles -->
            <div
                v-for="(img, index) in previewImages"
                :key="index"
                class="grid-item"
                :class="{ 'grid-item--main': index === 0 }"
                @click="openLightbox(index)"
            >
                <img
                    :src="img.itemImageSrc"
                    :alt="img.alt"
                    loading="lazy"
                    decoding="async"
                />

                <!-- Overlay "Voir plus" sur la dernière tuile si images cachées -->
                <div
                    v-if="index === MAX_PREVIEW - 1 && hiddenCount > 0"
                    class="overlay-more"
                    @click.stop="openLightbox(index)"
                >
                    <span class="overlay-more__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7" rx="1"/>
                            <rect x="14" y="3" width="7" height="7" rx="1"/>
                            <rect x="3" y="14" width="7" height="7" rx="1"/>
                            <rect x="14" y="14" width="7" height="7" rx="1"/>
                        </svg>
                    </span>
                    <span class="overlay-more__count">+{{ hiddenCount }} photos</span>
                </div>

                <!-- Overlay hover normal -->
                <div v-else class="overlay-hover">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                </div>
            </div>
        </div>

        <!-- ── LIGHTBOX PLEIN ÉCRAN ───────────────────── -->
        <Teleport to="body">
            <transition name="lb-fade">
                <div
                    v-if="lightboxOpen"
                    class="lightbox"
                    @click.self="closeLightbox"
                    @keydown.esc="closeLightbox"
                    tabindex="0"
                    ref="lightboxEl"
                >

                    <!-- Header -->
                    <div class="lb-header">
                        <span class="lb-counter">{{ lightboxIndex + 1 }} / {{ images.length }}</span>
                        <button class="lb-close" @click="closeLightbox" aria-label="Fermer">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Image principale -->
                    <div class="lb-main">
                        <button
                            class="lb-nav lb-nav--prev"
                            @click="prevImage"
                            :disabled="lightboxIndex === 0"
                            aria-label="Précédent"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22">
                                <polyline points="15 18 9 12 15 6"/>
                            </svg>
                        </button>

                        <transition name="lb-slide" mode="out-in">
                            <div class="lb-image-wrap" :key="lightboxIndex">
                                <div v-if="!loadedSet.has(lightboxIndex)" class="lb-skeleton" />
                                <img
                                    :src="images[lightboxIndex].itemImageSrc"
                                    :alt="images[lightboxIndex].alt"
                                    :class="{ 'lb-img--ready': loadedSet.has(lightboxIndex) }"
                                    class="lb-img"
                                    @load="onLbLoad(lightboxIndex)"
                                    @error="onLbLoad(lightboxIndex)"
                                />
                            </div>
                        </transition>

                        <button
                            class="lb-nav lb-nav--next"
                            @click="nextImage"
                            :disabled="lightboxIndex === images.length - 1"
                            aria-label="Suivant"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22">
                                <polyline points="9 18 15 12 9 6"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Strip thumbnails -->
                    <div class="lb-strip" ref="stripEl">
                        <div
                            v-for="(img, i) in images"
                            :key="i"
                            class="lb-thumb"
                            :class="{ 'lb-thumb--active': i === lightboxIndex }"
                            @click="goTo(i)"
                        >
                            <img :src="img.itemImageSrc" :alt="img.alt" loading="lazy" decoding="async" />
                        </div>
                    </div>

                </div>
            </transition>
        </Teleport>

    </div>
</template>

<script>
import { lienPhoto } from '../../../api/api';

export default {
    props: {
        galeries: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            lienPhoto,
            MAX_PREVIEW: 3,
            lightboxOpen: false,
            lightboxIndex: 0,
            loadedSet: new Set()
        };
    },

    computed: {
        images() {
            return this.galeries.map((item) => ({
                itemImageSrc: `${this.lienPhoto}${item.path}`,
                alt: `Galerie ${item.id}`
            }));
        },
        previewImages() {
            return this.images.slice(0, this.MAX_PREVIEW);
        },
        hiddenCount() {
            return Math.max(0, this.images.length - this.MAX_PREVIEW);
        }
    },

    methods: {
        openLightbox(index) {
            this.lightboxIndex = index;
            this.lightboxOpen = true;
            document.body.style.overflow = 'hidden';
            this.$nextTick(() => {
                this.$refs.lightboxEl?.focus();
                this.preloadAdjacent(index);
            });
        },

        closeLightbox() {
            this.lightboxOpen = false;
            document.body.style.overflow = '';
        },

        prevImage() {
            if (this.lightboxIndex > 0) {
                this.lightboxIndex--;
                this.preloadAdjacent(this.lightboxIndex);
                this.scrollThumb();
            }
        },

        nextImage() {
            if (this.lightboxIndex < this.images.length - 1) {
                this.lightboxIndex++;
                this.preloadAdjacent(this.lightboxIndex);
                this.scrollThumb();
            }
        },

        goTo(index) {
            this.lightboxIndex = index;
            this.preloadAdjacent(index);
            this.scrollThumb();
        },

        onLbLoad(index) {
            const updated = new Set(this.loadedSet);
            updated.add(index);
            this.loadedSet = updated;
        },

        preloadAdjacent(index) {
            [-1, 1].forEach((offset) => {
                const i = index + offset;
                if (i >= 0 && i < this.images.length && !this.loadedSet.has(i)) {
                    const img = new Image();
                    img.src = this.images[i].itemImageSrc;
                }
            });
        },

        scrollThumb() {
            this.$nextTick(() => {
                const strip = this.$refs.stripEl;
                if (!strip) return;
                const active = strip.querySelectorAll('.lb-thumb')[this.lightboxIndex];
                active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            });
        },

        handleKeydown(e) {
            if (!this.lightboxOpen) return;
            if (e.key === 'ArrowLeft')  this.prevImage();
            if (e.key === 'ArrowRight') this.nextImage();
            if (e.key === 'Escape')     this.closeLightbox();
        }
    },

    mounted() {
        window.addEventListener('keydown', this.handleKeydown);
    },
};
</script>

<style scoped>
/* ── Card ─────────────────────────────────────────────── */
.gallery-card {
    padding: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
}

/* ── Grille preview ───────────────────────────────────── */
.preview-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 120px);
    gap: 4px;
    border-radius: 10px;
    overflow: hidden;
}

/* Grande image à gauche */
.grid-item--main {
    grid-column: 1 / 3;
    grid-row: 1 / 3;
}

.grid-item {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    background: #1a1a1a;
}

.grid-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease, filter 0.35s ease;
    display: block;
}

.grid-item:hover img {
    transform: scale(1.05);
    filter: brightness(0.75);
}

/* Overlay hover normal */
.overlay-hover {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
}
.grid-item:hover .overlay-hover {
    opacity: 1;
}

/* Overlay "+N photos" */
.overlay-more {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 6px;
    cursor: pointer;
    transition: background 0.25s;
}
.overlay-more:hover {
    background: rgba(255, 166, 1, 0.7);
}
.overlay-more__icon svg {
    width: 28px;
    height: 28px;
}
.overlay-more__count {
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.03em;
}

/* ── Lightbox ─────────────────────────────────────────── */
.lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(10, 10, 10, 0.96);
    display: flex;
    flex-direction: column;
    outline: none;
}

/* Header */
.lb-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    flex-shrink: 0;
}
.lb-counter {
    color: rgba(255,255,255,0.6);
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.08em;
}
.lb-close {
    background: rgba(255,255,255,0.08);
    border: none;
    color: white;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}
.lb-close:hover {
    background: rgba(255, 166, 1, 0.85);
}

/* Zone centrale */
.lb-main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 0 12px;
    min-height: 0;
}

/* Image */
.lb-image-wrap {
    flex: 1;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-height: 200px;
}
.lb-skeleton {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #222 25%, #2e2e2e 50%, #222 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 6px;
}
@keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
.lb-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 6px;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: block;
}
.lb-img--ready {
    opacity: 1;
}

/* Boutons navigation */
.lb-nav {
    flex-shrink: 0;
    background: rgba(255,255,255,0.08);
    border: none;
    color: white;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
}
.lb-nav:hover:not(:disabled) {
    background: rgb(255, 166, 1);
}
.lb-nav:disabled {
    opacity: 0.25;
    cursor: default;
}

/* Strip thumbnails */
.lb-strip {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding: 10px 16px 14px;
    flex-shrink: 0;
    scrollbar-width: none;
}
.lb-strip::-webkit-scrollbar { display: none; }

.lb-thumb {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.2s, transform 0.2s;
    opacity: 0.55;
}
.lb-thumb:hover {
    opacity: 0.85;
    transform: scale(1.05);
}
.lb-thumb--active {
    border-color: rgb(255, 166, 1);
    opacity: 1;
}
.lb-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

/* ── Transitions ──────────────────────────────────────── */
.lb-fade-enter-active,
.lb-fade-leave-active { transition: opacity 0.25s ease; }
.lb-fade-enter-from,
.lb-fade-leave-to { opacity: 0; }

.lb-slide-enter-active,
.lb-slide-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.lb-slide-enter-from { opacity: 0; transform: scale(0.97); }
.lb-slide-leave-to  { opacity: 0; transform: scale(1.03); }

/* ── Responsive ───────────────────────────────────────── */
@media (max-width: 575px) {
    .preview-grid {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 110px);
    }
    .grid-item--main {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
    }
    .lb-thumb {
        width: 48px;
        height: 48px;
    }
    .lb-nav {
        width: 36px;
        height: 36px;
    }
}
</style>