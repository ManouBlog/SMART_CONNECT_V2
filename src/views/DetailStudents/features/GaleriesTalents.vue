<template>
  <div class="gallery-card">

    <!-- ── GRILLE PREVIEW ─────────────────────────── -->
    <div class="preview-grid" v-if="images.length">

      <!-- Jusqu'à MAX_PREVIEW images visibles -->
      <div v-for="(img, index) in previewImages" :key="index" class="grid-item"
        :class="{ 'grid-item--main': index === 0 }" @click="openLightbox(index)">
        <img :src="img.itemImageSrc" :alt="img.alt" loading="lazy" decoding="async" />

        <!-- Overlay "Voir plus" sur la dernière tuile si images cachées -->
        <div v-if="index === MAX_PREVIEW - 1 && hiddenCount > 0" class="overlay-more" @click.stop="openLightbox(index)">
          <span class="overlay-more__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </span>
          <span class="overlay-more__count">+{{ hiddenCount }} photos</span>
        </div>

        <!-- Overlay hover normal -->
        <div v-else class="overlay-hover">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>
    </div>

    <!-- ── LIGHTBOX PLEIN ÉCRAN ───────────────────── -->
    <Teleport to="body">
      <transition name="lb-fade">
        <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox" @keydown.esc="closeLightbox" tabindex="0"
          ref="lightboxEl">

          <!-- Header -->
          <div class="lb-header">
            <span class="lb-counter">{{ lightboxIndex + 1 }} / {{ images.length }}</span>
            <button class="lb-close" @click="closeLightbox" aria-label="Fermer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <!-- Image principale -->
          <div class="lb-main">
            <button class="lb-nav lb-nav--prev" @click="prevImage" :disabled="lightboxIndex === 0"
              aria-label="Précédent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <transition name="lb-slide" mode="out-in">
              <div class="lb-image-wrap" :key="lightboxIndex">
                <div v-if="!loadedSet.has(lightboxIndex)" class="lb-skeleton" />
                <img :src="images[lightboxIndex].itemImageSrc" :alt="images[lightboxIndex].alt"
                  :class="{ 'lb-img--ready': loadedSet.has(lightboxIndex) }" class="lb-img"
                  @load="onLbLoad(lightboxIndex)" @error="onLbLoad(lightboxIndex)" />
              </div>
            </transition>

            <button class="lb-nav lb-nav--next" @click="nextImage" :disabled="lightboxIndex === images.length - 1"
              aria-label="Suivant">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <!-- Strip thumbnails -->
          <div class="lb-strip" ref="stripEl">
            <div v-for="(img, i) in images" :key="i" class="lb-thumb"
              :class="{ 'lb-thumb--active': i === lightboxIndex }" @click="goTo(i)">
              <img :src="img.itemImageSrc" :alt="img.alt" loading="lazy" decoding="async" />
            </div>
          </div>

        </div>
      </transition>
    </Teleport>

    <!-- ── VOIR PLUS DE DETAILS ─────────────────────────── -->
    <div style="position: absolute;z-index: 90;right: 0;bottom:0.5em;" v-if="folders.length">
      <button @click="() => modalDossierVisible = true" style="
                background-color: orange;
                border: 2px solid white;
                color: white;
                font-weight: bold;
                padding: 0.5em;
                box-shadow: 6px #0000006b;
                ">Voir plus</button>
    </div>

    <!-- ===== MODAL DOSSIER ===== -->
    <a-modal v-model:visible="modalDossierVisible" :title="null" :footer="null" :width="modalWidth" class="folder-modal"
      :body-style="{ padding: '0' }" centered>
      <section>
        <a-modal v-model:visible="modalVisible" :title="null" :footer="null" :width="modalWidth" class="folder-modal"
          :body-style="{ padding: '0' }" centered>
          <div class="modal-inner" v-if="selectedFolder">
            <!-- Modal Header -->
            <div class="modal-header-custom">
              <div class="modal-title-wrap">
                <folder-filled class="modal-folder-icon" />
                <div>
                  <h3 class="modal-title-text">{{ selectedFolder.nom }}</h3>
                  <span class="modal-count">{{ selectedFolder.photos.length }} photos</span>
                </div>
              </div>
            </div>

            <!-- Photos Grid -->
            <div class="modal-photos-grid">
              <div v-for="(photo, index) in selectedFolder.photos" :key="index" class="modal-photo-card">
                <img :src="photo" :alt="`Photo ${index + 1}`" class="modal-photo-img"
                  @click="previewImage(photo, index)" />

              </div>
            </div>
          </div>

        </a-modal>
      </section>
      <section class="section folders-section" v-if="folders.length">
        <div style="display: flex;justify-content: space-between;align-items: center;">
          <div class="section-header">
            <h2 class="section-title">Mes albums</h2>
            <p class="section-subtitle">{{ folders.length }} albums</p>
          </div>
        </div>
        <div class="folders-grid">
          <div v-for="folder in folders" :key="folder.id" class="folder-card" @click="openFolder(folder)">
            <div class="folder-icon-wrap">
              <folder-filled class="folder-icon" />
            </div>
            <div class="folder-info">
              <span class="folder-name">{{ folder.nom }}</span>
              <span class="folder-count">{{ folder.photos.length }} photos</span>
            </div>
          </div>
        </div>
      </section>

    </a-modal>

    <!-- ===== IMAGE PREVIEW ===== -->
    <div v-if="previewVisible" class="custom-preview-overlay" @click.self="closeFolderPreview">
      <div class="preview-toolbar">
        <button class="preview-btn" @click="prevFolderImage" :disabled="currentPreviewIndex === 0">
          <left-outlined />
        </button>
        <span class="preview-counter">{{ currentPreviewIndex + 1 }} / {{ previewFolderImages.length }}</span>
        <button class="preview-btn" @click="nextFolderImage"
          :disabled="currentPreviewIndex === previewFolderImages.length - 1">
          <right-outlined />
        </button>
        <button class="preview-btn close-btn" @click="closeFolderPreview">
          <close-outlined />
        </button>
      </div>
      <div class="preview-img-container" :style="{ transform: `scale(${zoomLevel})` }">
        <img :src="currentPreviewSrc" alt="Preview" class="preview-fullscreen-img" />
      </div>
      <div class="preview-zoom-controls">
        <button class="zoom-ctrl-btn" @click="zoomOut"><minus-outlined /></button>
        <span class="zoom-level">{{ Math.round(zoomLevel * 100) }}%</span>
        <button class="zoom-ctrl-btn" @click="zoomIn"><plus-outlined /></button>
      </div>
    </div>

  </div>
</template>

<script>
import { lienPhoto } from '../../../api/api';
import {
  FolderFilled,
  //   FolderAddOutlined,
  RightOutlined,
  LeftOutlined,
  CloseOutlined,
  //   ZoomInOutlined,
  MinusOutlined,
  PlusOutlined,
  //   DeleteOutlined,
  //   EditOutlined,
  //   CheckOutlined,
  //   EyeOutlined,
  //  CheckCircleFilled,
  //   CheckCircleOutlined,
} from '@ant-design/icons-vue';

export default {
  props: {
    photosMiseEnAvant: {
      type: Array,
      default: () => []
    },
    dossierGaleries: {
      type: Array,
      default: () => []
    }
  },
  components: {
    FolderFilled,
    // FolderAddOutlined,
    RightOutlined,
    LeftOutlined,
    CloseOutlined,
    // ZoomInOutlined,
    MinusOutlined,
    PlusOutlined,
    // DeleteOutlined,
    // EditOutlined,
    // CheckOutlined,
    // EyeOutlined,
    //  CheckCircleFilled,
    //   CheckCircleOutlined,
  },
  data() {
    return {
      lienPhoto,
      MAX_PREVIEW: 3,
      lightboxOpen: false,
      lightboxIndex: 0,
      loadedSet: new Set(),
      modalDossierVisible: false,
      selectedFolder: null,
      modalVisible: false,
      // Preview
      previewVisible: false,
      previewFolderImages: [],
      currentPreviewIndex: 0,
      zoomLevel: 1,
    };
  },

  computed: {
    currentPreviewSrc() {
      return this.previewFolderImages[this.currentPreviewIndex] || '';
    },
    folders() {
      return this.dossierGaleries;
    },
    images() {
      return this.photosMiseEnAvant.map((item) => ({
        itemImageSrc: item.path,
        alt: `Galerie ${item.id}`
      }));
    },
    previewImages() {
      return this.images.slice(0, this.MAX_PREVIEW);
    },
    hiddenCount() {
      return Math.max(0, this.images.length - this.MAX_PREVIEW);
    },
    modalWidth() {
      if (typeof window !== 'undefined') {
        return window.innerWidth < 768 ? '95vw' : window.innerWidth < 1024 ? '85vw' : '75vw';
      }
      return '75vw';
    },
  },

  methods: {
    closeFolderPreview() {
      this.previewVisible = false;
      this.zoomLevel = 1;
    },
    prevFolderImage() {
      if (this.currentPreviewIndex > 0) { this.currentPreviewIndex--; this.zoomLevel = 1; }
    },
    nextFolderImage() {
      if (this.currentPreviewIndex < this.previewImages.length - 1) { this.currentPreviewIndex++; this.zoomLevel = 1; }
    },
    zoomIn() { if (this.zoomLevel < 3) this.zoomLevel = Math.min(3, this.zoomLevel + 0.25); },
    zoomOut() { if (this.zoomLevel > 0.5) this.zoomLevel = Math.max(0.5, this.zoomLevel - 0.25); },
    previewImage(photo, index) {
      this.previewFolderImages = [...this.selectedFolder.photos];
      this.currentPreviewIndex = index;
      this.zoomLevel = 1;
      this.previewVisible = true;
    },
    openFolder(folder) {
      // console.log("FOLDER12", folder)
      this.selectedFolder = folder;
      this.modalVisible = true;
    },
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
      if (e.key === 'ArrowLeft') this.prevImage();
      if (e.key === 'ArrowRight') this.nextImage();
      if (e.key === 'Escape') this.closeLightbox();
    }
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
};
</script>
<style scoped>
.folders-section {
  height: 200px;
  overflow: auto;
}

:deep(.ant-modal-content) {
  padding: 0 !important;
}

.form-modal-inner {
  height: 500px !important;
  overflow-y: auto !important;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

/* ===== PAGE ===== */
.galeries-page {
  min-height: 100vh;
  background: #f7f7f9;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
}

/* ===== HEADER ===== */
.page-header {
  background: linear-gradient(135deg, #25535f 0%, #25535f 60%, #FFB86C 100%);
  padding: 40px 24px 52px;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.page-header::after {
  content: '';
  position: absolute;
  bottom: -60px;
  left: -20px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
}

.header-inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.page-title {
  font-size: clamp(26px, 5vw, 38px);
  font-weight: 800;
  color: #fff;
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

/* ===== BOUTON CRÉER DOSSIER ===== */
.btn-create-folder {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: #FF7A00;
  border: none;
  border-radius: 5px;
  padding: 12px;
  height: 40px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-create-folder:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2);
  background: #fff8f0;
}

.btn-icon {
  font-size: 15px;
}

/* ===== CONTENT ===== */
.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}

/* ===== SECTION ===== */
.section {
  margin-bottom: 48px;
}

.section-header {
  margin-bottom: 24px;
}

.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, #FF7A00, #FF9A3C);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 10px;
}

.folder-badge {
  background: linear-gradient(135deg, #333, #555);
}

.section-title {
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 6px;
  letter-spacing: -0.3px;
}

.section-subtitle {
  font-size: 14px;
  color: #888;
  margin: 0;
}

/* ===== FEATURED GRID ===== */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 900px) {
  .featured-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }
}

.featured-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.featured-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(255, 122, 0, 0.22);
}

.featured-img-wrapper {
  position: relative;
  width: 100%;
  padding-top: 70%;
  overflow: hidden;
}

.featured-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.featured-card:hover .featured-img {
  transform: scale(1.06);
}

.featured-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 122, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.featured-card:hover .featured-overlay {
  opacity: 1;
}

.overlay-icon {
  font-size: 32px;
  color: #fff;
}

/* ===== FOLDERS GRID ===== */
.folders-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

@media (max-width: 580px) {
  .folders-grid {
    grid-template-columns: 1fr;
  }
}

/* ===== FOLDER CARD ===== */
.folder-card {
  background: #fff;
  border-radius: 16px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1.5px solid transparent;
  position: relative;
  overflow: hidden;
}

.folder-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #FF7A00, #FF9A3C);
  opacity: 0;
  transition: opacity 0.25s;
}

.folder-card:hover {
  border-color: rgba(255, 122, 0, 0.25);
  box-shadow: 0 8px 28px rgba(255, 122, 0, 0.14);
  transform: translateX(4px);
}

.folder-card:hover::before {
  opacity: 1;
}

.folder-icon-wrap {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: linear-gradient(135deg, #FFF3E0, #FFE0B2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.folder-icon {
  font-size: 22px;
  color: #FF7A00;
}

.folder-info {
  flex: 1;
  min-width: 0;
}

.folder-name {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.folder-count {
  font-size: 12px;
  color: #aaa;
}

.folder-preview {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.preview-thumb {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  object-fit: cover;
  border: 1.5px solid #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* ===== FOLDER ACTIONS ===== */
.folder-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s;
}

.folder-card:hover .folder-actions {
  opacity: 1;
}

.folder-action-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  transition: all 0.2s;
}

.btn-edit {
  background: #f0f0f0;
  color: #555;
}

.btn-edit:hover {
  background: #FF7A00;
  color: #fff;
}

.btn-delete {
  background: #fff0f0;
  color: #e53935;
}

.btn-delete:hover {
  background: #e53935;
  color: #fff;
}

/* ===== MODAL DOSSIER ===== */
.folder-modal :deep(.ant-modal-content) {
  border-radius: 20px;
  overflow: hidden;
  padding: 0;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.2);
}

.folder-modal :deep(.ant-modal-body) {
  padding: 0 !important;
}

.folder-modal :deep(.ant-modal-close) {
  top: 16px;
  right: 16px;
}

.folder-modal :deep(.ant-modal-close-x) {
  width: 36px;
  height: 36px;
  line-height: 36px;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 50%;
  font-size: 14px;
  color: #666;
  transition: background 0.2s;
}

.folder-modal :deep(.ant-modal-close-x:hover) {
  background: rgba(255, 122, 0, 0.12);
  color: #FF7A00;
}

.modal-inner {
  background: #fff;
}

.modal-header-custom {
  padding: 22px 28px 18px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, #fffbf7, #fff8f0);
}

.modal-title-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.modal-folder-icon {
  font-size: 30px;
  color: #FF7A00;
}

.modal-title-text {
  font-size: 20px;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 2px;
}

.modal-count {
  font-size: 13px;
  color: #aaa;
}

/* ===== MODAL PHOTOS GRID ===== */
.modal-photos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px 24px 24px;
  max-height: 60vh;
  overflow-y: auto;
}

@media (max-width: 900px) {
  .modal-photos-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 580px) {
  .modal-photos-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 14px;
    gap: 8px;
  }
}

.modal-photos-grid::-webkit-scrollbar {
  width: 6px;
}

.modal-photos-grid::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.modal-photos-grid::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 3px;
}

.modal-photo-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  padding-top: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.modal-photo-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  cursor: pointer;
}

.modal-photo-card:hover .modal-photo-img {
  transform: scale(1.06);
}

.modal-photo-actions {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.25s;
  background: rgba(0, 0, 0, 0.35);
}

.modal-photo-card:hover .modal-photo-actions {
  opacity: 1;
}

.photo-action-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.photo-preview-btn {
  background: rgba(255, 255, 255, 0.9);
  color: #FF7A00;
}

.photo-preview-btn:hover {
  background: #FF7A00;
  color: #fff;
}

.photo-delete-btn {
  background: rgba(229, 57, 53, 0.9);
  color: #fff;
}

.photo-delete-btn:hover {
  background: #c62828;
  transform: scale(1.1);
}

/* ===== FORM MODALS SHARED ===== */
.rename-modal :deep(.ant-modal-content),
.create-modal :deep(.ant-modal-content),
.confirm-modal :deep(.ant-modal-content) {
  border-radius: 20px;
  overflow: hidden;
  padding: 0;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
}

.rename-modal :deep(.ant-modal-body),
.create-modal :deep(.ant-modal-body),
.confirm-modal :deep(.ant-modal-body) {
  padding: 0 !important;
}

.rename-modal :deep(.ant-modal-close),
.create-modal :deep(.ant-modal-close),
.confirm-modal :deep(.ant-modal-close) {
  top: 14px;
  right: 14px;
}

.rename-modal :deep(.ant-modal-close-x),
.create-modal :deep(.ant-modal-close-x),
.confirm-modal :deep(.ant-modal-close-x) {
  width: 32px;
  height: 32px;
  line-height: 32px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  font-size: 13px;
  color: #999;
}

.form-modal-inner {
  background: #fff;
}

.form-modal-header {
  padding: 28px 28px 20px;
  text-align: center;
  background: linear-gradient(135deg, #fffbf7, #fff5ec);
  border-bottom: 1px solid #f5f5f5;
}

.form-modal-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #FF7A00, #FF9A3C);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
  box-shadow: 0 8px 20px rgba(255, 122, 0, 0.3);
}

.form-modal-icon {
  font-size: 26px;
  color: #fff;
}

.form-modal-title {
  font-size: 18px;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 6px;
}

.form-modal-subtitle {
  font-size: 13px;
  color: #999;
  margin: 0;
}

.form-modal-body {
  padding: 24px 28px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #555;
  margin-bottom: 8px;
}

.required {
  color: #FF7A00;
}

.form-label-hint {
  font-weight: 400;
  color: #bbb;
  font-size: 12px;
}

.form-input :deep(.ant-input) {
  border-radius: 10px;
  border-color: #e8e8e8;
  font-size: 14px;
}

.form-input :deep(.ant-input:focus) {
  border-color: #FF7A00;
  box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.12);
}

.form-modal-footer {
  padding: 16px 28px 24px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  border-top: 1px solid #f5f5f5;
}

/* ===== BUTTONS ===== */
.btn-cancel {
  padding: 10px;
  border-radius: 10px;
  border: 1.5px solid #e8e8e8;
  background: #ae0101;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}


.btn-confirm {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #FF7A00, #FF9A3C);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(255, 122, 0, 0.35);
}

.btn-confirm:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(255, 122, 0, 0.45);
}

.btn-confirm:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
}

.btn-danger {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #e53935, #ef5350);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(229, 57, 53, 0.3);
}

.btn-danger:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(229, 57, 53, 0.4);
}

/* ===== CONFIRM MODAL ===== */
.confirm-modal-inner {
  padding: 32px 28px 28px;
  text-align: center;
}

.confirm-icon-wrap {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
}

.confirm-icon-wrap.danger {
  background: #fff0f0;
}

.confirm-icon {
  font-size: 26px;
  color: #e53935;
}

.confirm-title {
  font-size: 18px;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 10px;
}

.confirm-text {
  font-size: 14px;
  color: #888;
  margin: 0 0 24px;
  line-height: 1.6;
}

.confirm-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* ===== UPLOAD ZONE ===== */
.upload-zone {
  border: 2px dashed #e0e0e0;
  border-radius: 14px;
  background: #fafafa;
  cursor: pointer;
  transition: all 0.25s;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.upload-zone:hover,
.upload-zone--drag {
  border-color: #FF7A00;
  background: #fff8f0;
}

.upload-zone-content {
  text-align: center;
  padding: 24px;
}

.upload-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #FFF3E0, #FFE0B2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.upload-zone-icon {
  font-size: 24px;
  color: #FF7A00;
}

.upload-text {
  font-size: 14px;
  font-weight: 700;
  color: #555;
  margin: 0 0 4px;
}

.upload-subtext {
  font-size: 13px;
  color: #aaa;
  margin: 0 0 8px;
}

.upload-hint {
  font-size: 11px;
  color: #ccc;
  background: #f0f0f0;
  padding: 3px 10px;
  border-radius: 20px;
}

.upload-preview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 12px;
  width: 100%;
  max-height: 220px;
  overflow-y: auto;
}

@media (max-width: 480px) {
  .upload-preview-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.upload-preview-item {
  position: relative;
  padding-top: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.upload-preview-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-remove-btn {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(229, 57, 53, 0.9);
  color: #fff;
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.upload-remove-btn:hover {
  background: #c62828;
}

.upload-add-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ddd;
  border-radius: 8px;
  color: #aaa;
  font-size: 11px;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 60px;
}

.upload-add-more:hover {
  border-color: #FF7A00;
  color: #FF7A00;
  background: #fff8f0;
}

.upload-count-hint {
  font-size: 12px;
  color: #FF7A00;
  font-weight: 600;
  margin: 8px 0 0;
}

/* ===== PREVIEW ===== */
.custom-preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.94);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-toolbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.6), transparent);
  padding: 0 20px;
  z-index: 10;
}

.preview-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  backdrop-filter: blur(6px);
}

.preview-btn:hover:not(:disabled) {
  background: #FF7A00;
  border-color: #FF7A00;
}

.preview-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.close-btn {
  margin-left: 16px;
  background: rgba(255, 60, 60, 0.15);
  border-color: rgba(255, 60, 60, 0.3);
}

.close-btn:hover {
  background: #e53935 !important;
  border-color: #e53935 !important;
}

.preview-counter {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  min-width: 60px;
  text-align: center;
}

.preview-img-container {
  max-width: 90vw;
  max-height: 80vh;
  transition: transform 0.2s ease;
}

.preview-fullscreen-img {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 60px rgba(0, 0, 0, 0.5);
}

.preview-zoom-controls {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  padding: 8px 16px;
}

.zoom-ctrl-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.zoom-ctrl-btn:hover {
  background: #FF7A00;
}

.zoom-level {
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  min-width: 44px;
  text-align: center;
  font-weight: 600;
}
</style>

<style scoped>
/* ── Card ─────────────────────────────────────────────── */
.gallery-card {
  padding: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  position: relative;
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
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.08em;
}

.lb-close {
  background: rgba(255, 255, 255, 0.08);
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
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
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
  background: rgba(255, 255, 255, 0.08);
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

.lb-strip::-webkit-scrollbar {
  display: none;
}

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
.lb-fade-leave-active {
  transition: opacity 0.25s ease;
}

.lb-fade-enter-from,
.lb-fade-leave-to {
  opacity: 0;
}

.lb-slide-enter-active,
.lb-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.lb-slide-enter-from {
  opacity: 0;
  transform: scale(0.97);
}

.lb-slide-leave-to {
  opacity: 0;
  transform: scale(1.03);
}

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