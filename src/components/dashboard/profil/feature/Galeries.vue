<template>
  <div class="galeries-page">
    <!-- Header -->
    <div class="page-header">
      <div class="header-inner">
        <div class="header-top">
          <div>
            <h1 class="page-title">Ma galerie</h1>
            <p class="page-subtitle">Gérez et organisez vos photos en toute simplicité</p>
          </div>
          
        </div>
      </div>
    </div>

    <div class="page-content">
      <!-- ===== SECTION 1 : Photos mises en avant ===== -->
      <section class="section featured-section">
        <div class="section-header">
          <h2 class="section-title">Mes photos mises en avant</h2>
          <p class="section-subtitle">Ces photos sont les premières que le recruteur voit.</p>
        </div>

        <div class="featured-grid" v-if="photosMiseEnAvant.length">
          <div
            v-for="item in photosMiseEnAvant"
            :key="item"
            class="featured-card"
          >
            <div class="featured-img-wrapper">
              <img :src="item.path" :alt="item" class="featured-img" />
              <div class="featured-overlay">
                <eye-outlined class="overlay-icon" />
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: center;">
         <button style="border:none;background-color:transparent;color: orange;padding:0.5em;" 
         @click="openForChooseThreeImages">Cliquez pour sélectionner 3 photos à mettre en avant</button>
        </div>
      </section>

      <!-- ===== SECTION 2 : Dossiers ===== -->
      <section class="section folders-section">
        <div style="display: flex;justify-content: space-between;align-items: center;">
      <div class="section-header">
          <h2 class="section-title">Mes albums</h2>
          <p class="section-subtitle">{{ folders.length }} Albums · {{ totalPhotos }} photos au total</p>
        </div>
        <button class="btn-create-folder" @click="openCreateModal">
            <plus-outlined class="btn-icon" />
            <span>Nouvel album</span>
          </button>
        </div>
        

        <div class="folders-grid">
          <div
            v-for="folder in folders"
            :key="folder.id"
            class="folder-card"
            @click="openFolder(folder)"
          >
            <div class="folder-icon-wrap">
              <folder-filled class="folder-icon" />
            </div>
            <div class="folder-info">
              <span class="folder-name">{{ folder.nom }}</span>
              <span class="folder-count">{{ folder.photos.length }} photos</span>
            </div>
            <!-- Actions dossier -->
            <div class="folder-actions" @click.stop>
              <button class="folder-action-btn btn-edit" @click.stop="openRenameModal(folder)" title="Renommer">
                <edit-outlined />
              </button>
              <button class="folder-action-btn btn-delete" @click.stop="confirmDeleteFolder(folder)" title="Supprimer le dossier">
                <delete-outlined />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ===== MODAL DOSSIER (photos) ===== -->
    <a-modal
      v-model:visible="modalVisible"
      :title="null"
      :footer="null"
      :width="modalWidth"
      class="folder-modal"
      :body-style="{ padding: '0' }"
      centered
    >
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
          <div
            v-for="(photo, index) in selectedFolder.photos"
            :key="index"
            class="modal-photo-card"
          >
            <img :src="photo.path" :alt="`Photo ${index + 1}`" class="modal-photo-img" @click="previewImage(photo, index)" />
            <div class="modal-photo-actions">
              <button class="photo-action-btn photo-preview-btn" @click="previewImage(photo, index)" title="Agrandir">
                <zoom-in-outlined />
              </button>
              <button class="photo-action-btn photo-delete-btn" @click="confirmDeletePhoto(index)" title="Supprimer">
                <delete-outlined />
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </a-modal>

     <!-- ===== MODAL THREE (photos) ===== -->
    <a-modal
      v-model:visible="modalThreeVisible"
      :title="null"
      :footer="null"
      :width="modalWidth"
      class="folder-modal"
      :body-style="{ padding: '0' }"
      centered
    >
      <div class="modal-inner" style="position: relative;" v-if="selectedthreePhotos.length">
        <!-- Modal Header -->
        <div class="modal-header-custom">
          <div class="modal-title-wrap">
            <folder-filled class="modal-folder-icon" />
            <div>
              <h3 class="modal-title-text">Ma Galerie</h3>
            </div>
          </div>
        </div>
       
        <!-- Photos Grid -->
        <div class="modal-photos-grid">
         
         <div
  v-for="(photo, index) in selectedthreePhotos"
  :key="index"
  class="modal-photo-card"
  style="position: relative;"
   @click="togglePublicPhoto(photo)"
>
  <img
    :src="photo.path"
    :alt="`Photo ${index + 1}`"
    class="modal-photo-img"
    @click="previewImage(photo, index)"
  />

  <check-circle-filled
    v-if="photosMiseEnAvant.some(item=>item.id == photo.id)"
    style="
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 9999;
      color: green;
      font-size: 24px;
      color:#52c41a;
    "
  />

  <div class="modal-photo-actions">
    <button
      class="photo-action-btn"
    >
      <check-circle-filled v-if="photosMiseEnAvant.some(item=>item.id == photo.id)" />
      <check-circle-outlined v-else />
    </button>
  </div>
</div>
        </div>
      </div>
      
    </a-modal>

    

    <!-- ===== MODAL RENOMMER DOSSIER ===== -->
    <a-modal
      v-model:visible="renameModalVisible"
      :title="null"
      :footer="null"
      class="rename-modal"
      :body-style="{ padding: '0' }"
      centered
      :width="420"
    >
      <div class="form-modal-inner">
        <div class="form-modal-header">
          <div class="form-modal-icon-wrap">
            <edit-outlined class="form-modal-icon" />
          </div>
          <h3 class="form-modal-title">Renommer l'album</h3>
          <p class="form-modal-subtitle">Donnez un nouveau nom à votre album</p>
        </div>
        <div class="form-modal-body">
          <label class="form-label">Nom de l'album</label>
          <a-input
            v-model:value="renameValue"
            class="form-input"
            size="large"
            @pressEnter="confirmRename"
          />
        </div>
        <div class="form-modal-footer">
          <button class="btn-cancel" @click="renameModalVisible = false">Annuler</button>
          <button class="btn-confirm" @click="confirmRename" :disabled="!renameValue.trim()">
            Modifier
          </button>
        </div>
      </div>
    </a-modal>

    <!-- ===== MODAL CRÉER UN DOSSIER ===== -->
    <a-modal
      v-model:visible="createModalVisible"
      :title="null"
      :footer="null"
      class="create-modal"
      :body-style="{ padding: '0' }"
      centered
      :width="520"
    >
      <div class="form-modal-inner">
        <div class="form-modal-header create-header">
          <div class="form-modal-icon-wrap create-icon-wrap">
            <folder-add-outlined class="form-modal-icon" />
          </div>
          <h3 class="form-modal-title">Nouvel album</h3>
          <p class="form-modal-subtitle">Créez un album et ajoutez vos photos</p>
        </div>

        <div class="form-modal-body">

             <a-form
    layout="vertical"
    :model="formState"
    @finish="onFinish"
    @finishFailed="onHandleFailed"
  >
<a-form-item label="Nom de l ' album">
            <a-input v-model:value="formState.nom_galerie" size="large" />
          </a-form-item>
           <div>

  <!-- MODE SELECT -->
  <a-form-item label="Ajouter des images"> 
    <a-radio-group v-model:value="inputMode" @change="() => { formState.galeries = [] }">
      <a-radio value="gallery">Ma Galerie</a-radio>
      <a-radio value="camera">Ma Caméra</a-radio>
    </a-radio-group>
  </a-form-item>

  <!-- MODE GALERIE -->
  <a-form-item v-if="inputMode === 'gallery'" label="Galeries de vos créations (photos)">
    <a-upload
      v-model:file-list="formState.galeries"
      list-type="picture-card"
      :before-upload="() => false"
      multiple
      accept="image/*"
    >
      <div>
        +
        <div style="margin-top: 8px">
          Ajouter depuis la galerie
        </div>
      </div>
    </a-upload>
  </a-form-item>

  <!-- MODE CAMERA -->
  <a-form-item v-if="inputMode === 'camera'" label="Prendre une photo">

    <input
      ref="cameraInput" 
      type="file"
      accept="image/*"
      capture="environment"
    style="display:none"
      @change="handleCameraCapture"
    />

    <a-button type="primary" @click="openCamera">
      Ouvrir la caméra
    </a-button>

    <div
  v-if="formState.galeries.length"
  style="margin-top: 1em; display: flex; flex-wrap: wrap; gap: 16px;"
>
  <div
    v-for="(img, index) in formState.galeries"
    :key="index"
    class="item"
    style="position: relative;"
  >
    <img
      style="width: 100px; height: 100px;"
      :src="img.url"
      :alt="img.name"
    />

    <!-- DELETE BUTTON -->
    <button
      @click="removeImage(index)"
      style="
        position: absolute;
        top: 4px;
        right: 4px;
        background: red;
        color: white;
        border: none;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        cursor: pointer;
        font-size: 12px;
      "
    >
      ✕
    </button>
  </div>
</div>

  </a-form-item>

</div>
<div class="form-modal-footer">
       <a-button type="default" @click="closeCreateModal"> Annuler</a-button>
          <a-button
         type="primary"
          html-type="submit" 
          :disabled="!formState.nom_galerie.trim() || formState.galeries.length === 0" >
            <folder-add-outlined />
            Créer l'album
          </a-button>
         
        </div>
</a-form>
        </div>
      </div>
    </a-modal>

    <!-- ===== CONFIRM DELETE FOLDER ===== -->
    <a-modal
      v-model:visible="confirmFolderDeleteVisible"
      :title="null"
      :footer="null"
      class="confirm-modal"
      :body-style="{ padding: '0' }"
      centered
      :width="380"
    >
      <div class="confirm-modal-inner">
        <div class="confirm-icon-wrap danger">
          <delete-outlined class="confirm-icon" />
        </div>
        <h3 class="confirm-title">Supprimer le dossier ?</h3>
        <p class="confirm-text">
          Le dossier <strong>"{{ folderToDelete ? folderToDelete.nom : '' }}"</strong> et toutes ses photos seront définitivement supprimés.
        </p>
        <div class="confirm-actions">
          <button class="btn-cancel" @click="confirmFolderDeleteVisible = false">Annuler</button>
          <button class="btn-danger" @click="executeDeleteFolder">
            <delete-outlined />
            Supprimer
          </button>
        </div>
      </div>
    </a-modal>

    <!-- ===== CONFIRM DELETE PHOTO ===== -->
    <a-modal
      v-model:visible="confirmPhotoDeleteVisible"
      :title="null"
      :footer="null"
      class="confirm-modal"
      :body-style="{ padding: '0' }"
      centered
      :width="360"
    >
      <div class="confirm-modal-inner">
        <div class="confirm-icon-wrap danger">
          <delete-outlined class="confirm-icon" />
        </div>
        <h3 class="confirm-title">Supprimer cette photo ?</h3>
        <p class="confirm-text">Cette action est irréversible.</p>
        <div class="confirm-actions">
          <!-- <button style="background-color: gray;" @click="confirmPhotoDeleteVisible = false">Annuler</button> -->
          <button class="btn-danger" @click="executeDeletePhoto">
            <delete-outlined />
            Supprimer
          </button>
        </div>
      </div>
    </a-modal>

    <!-- ===== IMAGE PREVIEW ===== -->
    <div v-if="previewVisible" class="custom-preview-overlay" @click.self="closePreview">
      <div class="preview-toolbar">
        <button class="preview-btn" @click="prevImage" :disabled="currentPreviewIndex === 0">
          <left-outlined />
        </button>
        <span class="preview-counter">{{ currentPreviewIndex + 1 }} / {{ previewImages.length }}</span>
        <button class="preview-btn" @click="nextImage" :disabled="currentPreviewIndex === previewImages.length - 1">
          <right-outlined />
        </button>
        <button class="preview-btn close-btn" @click="closePreview">
          <close-outlined />
        </button>
      </div>
      <div class="preview-img-container" :style="{ transform: `scale(${zoomLevel})` }">
        <img :src="currentPreviewSrc.path" alt="Preview" class="preview-fullscreen-img" />
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
import { useLoadingSpinner } from '../../../../store-pinia/LoadingSpinner/useLoadingSpinner';
import Swal from 'sweetalert2';
import instance ,{lienPhoto}from '../../../../api/api';
import {
  FolderFilled,
  FolderAddOutlined,
  RightOutlined,
  LeftOutlined,
  CloseOutlined,
  ZoomInOutlined,
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  // CheckOutlined,
  EyeOutlined,
 CheckCircleFilled,
  CheckCircleOutlined,
} from '@ant-design/icons-vue';

export default {
  name: 'Galeries',
  components: {
    FolderFilled,
    FolderAddOutlined,
    RightOutlined,
    LeftOutlined,
    CloseOutlined,
    ZoomInOutlined,
    MinusOutlined,
    PlusOutlined,
    DeleteOutlined,
    EditOutlined,
    // CheckOutlined,
    EyeOutlined,
     CheckCircleFilled,
  CheckCircleOutlined,
  },

  data() {
    return {
        loadingSpinner:useLoadingSpinner(),
        lienPhoto:lienPhoto,
        inputMode: 'gallery', // 'gallery' ou 'camera'
        formState:{
            nom_galerie: '',
            galeries: []
        },
        idFolder:null,
      nextFolderId: 5,
      // Modal dossier (photos)
      modalVisible: false,
      modalThreeVisible:false,
      selectedFolder: null,

      // Rename modal
      renameModalVisible: false,
      folderToRename: null,
      renameValue: '',

      // Create modal
      createModalVisible: false,
      nom_galerie: '',
      newFolderPhotos: [],
      isDragging: false,

      // Confirm delete folder
      confirmFolderDeleteVisible: false,
      folderToDelete: null,

      // Confirm delete photo
      confirmPhotoDeleteVisible: false,
      photoIndexToDelete: null,

      // Preview
      previewVisible: false,
      previewImages: [],
      currentPreviewIndex: 0,
      zoomLevel: 1,
      dossierGaleries:[],
     photosMiseEnAvant:[]
    };
  },

  computed: {
    selectedthreePhotos(){
const ImagesAll =
  (this.folders ?? []).flatMap(folder =>
    (folder.photos ?? []).map(url => ({
      id:url.id,path:url.path
    })
  )
  ) ?? []
  console.log('folde12',this.folders)
console.log("ImagesAll",ImagesAll)
console.log('this.dossierGaleries',this.dossierGaleries)
    return ImagesAll;
    },
 folders() {
       const dossiers = this.dossierGaleries?.map(({ id, nom_galerie, images = [] }) => ({
  id,
  nom: nom_galerie,
  photos: images.map(({ path,id }) =>({
    id:id,
    path:this.lienPhoto+path
  }) ),
}));
console.log("dossiers",dossiers)
    return dossiers;
  },
    totalPhotos() {
      return this.folders.reduce((sum, f) => sum + f.photos.length, 0);
    },
    currentPreviewSrc() {
      return this.previewImages[this.currentPreviewIndex] || '';
    },
    modalWidth() {
      if (typeof window !== 'undefined') {
        return window.innerWidth < 768 ? '95vw' : window.innerWidth < 1024 ? '85vw' : '75vw';
      }
      return '75vw';
    },
    
  },

  methods: {
  async togglePublicPhoto(photo) {
  this.loadingSpinner.launchLoading(true);
    try{
   const response = await instance.post('chooseImageAhead/'+photo.id)
   if(response.data.status){
    console.log("AJOUTER",photo)
    this.photosMiseEnAvant.push(photo)
    Swal.fire({
        icon: "success",
        title:'Photo ajoutée à la mise en avant',
      });
   }
   if(response.data.status === false){
      const index = this.photosMiseEnAvant.indexOf(photo);
      this.photosMiseEnAvant.splice(index, 1);
      Swal.fire({
        icon: "info",
        title:'Photo retirée de la mise en avant',
      });
     }
  
    }catch(error){
      console.log(error.response.data.message)
      Swal.fire({
        icon: "info",
        title:error.response.data.message,
      });
    }finally{
      this.loadingSpinner.launchLoading(false);
    }

   
  },
     async openCamera() {
  await Swal.fire({
    title: 'Information caméra',
    text: `
    Pour permettre la prise de photo via la caméra de votre appareil, 
    aller sur les différents navigateurs: Chrome Android, Firefox Android, 
    Opera Android, Safari iOS, 
    Samsung Internet ainsi que 
    les WebView Android et iOS récents.`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Continuer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      const input = this.$refs.cameraInput
      if (input) {
        input.value = ''
        input.click()
      }
    }
  })
},
    handleCameraCapture(event) {
  const files = event.target.files

  if (!files || files.length === 0) return

  const newImages = Array.from(files).map(file => {
    return {
      file,
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      type: file.type
    }
  })

  this.formState.galeries = [
    ...this.formState.galeries,
    ...newImages
  ]
//   this.addFiles(files);
},
addFiles(fileList) {
      Array.from(fileList).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const preview = URL.createObjectURL(file);
        this.newFolderPhotos.push({ file, preview });
      });
    },
     onHandleFailed(errorInfo) {
      Swal.fire({
        icon: "warning",
        title: `${errorInfo.errorFields[0].errors[0]}`,
        text: "Veuillez remplir tous les champs obligatoires (*)",
      });
    },
    async onFinish() {
   console.log('Form submitted:', this.formState);
   try{
 const response = await instance.post('create_galeries',this.formState)
 if(response.data.status){
    Swal.fire({
        icon: "success",
        title: "Dossier créé avec succès",
        text: "Votre nouveau dossier a été ajouté à votre galerie.",
      });
      this.closeCreateModal();
 }
   }catch(e){
    console.log('Error processing form:', e);
   }
   
    },
    /* ===== OPEN FOLDER ===== */
    openFolder(folder) {
      this.selectedFolder = folder;
      this.modalVisible = true;
    },
    openForChooseThreeImages(){
        this.modalThreeVisible = true;
    },
    /* ===== RENAME ===== */
    openRenameModal(folder) {
      this.folderToRename = folder;
      this.renameValue = folder.nom;
      this.idFolder = folder.id;
      this.renameModalVisible = true;
    },
    async confirmRename() {
      this.loadingSpinner.launchLoading(true);
      try{
   const response = await instance.put('update_galerie_nam/'+this.idFolder,{nom_galerie:this.renameValue})
    if(response.data.status){
      console.log("dossierGaleries",this.dossierGaleries)
      console.log("RESPONSE_CONFIRMERENAME",response)
      // this.dossierGaleries.find(item=>)
       this.renameModalVisible = false;
      this.folderToRename = null;
      this.renameValue = '';
      this.idFolder = null;
       Swal.fire({title:response?.data?.message,icon:'success'})
    }
      }catch(error){
        console.error(error)
        Swal.fire({title:error?.response?.data?.message,icon:'error'})
      }finally{
            this.loadingSpinner.launchLoading(false);
      }
    },

    /* ===== DELETE FOLDER ===== */
    confirmDeleteFolder(folder) {
      this.folderToDelete = folder;
      this.confirmFolderDeleteVisible = true;
    },
    executeDeleteFolder() {
      this.folders = this.folders.filter(f => f.id !== this.folderToDelete.id);
      if (this.selectedFolder && this.selectedFolder.id === this.folderToDelete.id) {
        this.modalVisible = false;
        this.selectedFolder = null;
      }
      this.confirmFolderDeleteVisible = false;
      this.folderToDelete = null;
    },

    /* ===== DELETE PHOTO ===== */
    confirmDeletePhoto(index) {
      this.photoIndexToDelete = index;
      this.confirmPhotoDeleteVisible = true;
    },
    executeDeletePhoto() {
      if (this.selectedFolder && this.photoIndexToDelete !== null) {
        this.selectedFolder.photos.splice(this.photoIndexToDelete, 1);
        // Keep previewImages in sync
        this.previewImages = [...this.selectedFolder.photos];
      }
      this.confirmPhotoDeleteVisible = false;
      this.photoIndexToDelete = null;
    },

    /* ===== CREATE FOLDER ===== */
    openCreateModal() {
      this.nom_galerie = '';
      this.newFolderPhotos = [];
      this.isDragging = false;
      this.createModalVisible = true;
    },
    closeCreateModal() {
      this.createModalVisible = false;
      this.newFolderPhotos.forEach(p => { if (p.preview && p.preview.startsWith('blob:')) URL.revokeObjectURL(p.preview); });
      this.newFolderPhotos = [];
      this.nom_galerie = '';
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    
    removeNewPhoto(idx) {
      const p = this.newFolderPhotos[idx];
      if (p.preview && p.preview.startsWith('blob:')) URL.revokeObjectURL(p.preview);
      this.newFolderPhotos.splice(idx, 1);
    },
    getPhotosMiseEnAvant(payload){
    const ImagesAll =
  (payload ?? []).flatMap(folder =>
    (folder.images ?? [])
      .filter(url => url.visible)
      .map(url => ({
        id: url.id,
        path: this.lienPhoto+url.path
      }))
  );
console.log("ImagesAll",ImagesAll)
return ImagesAll;
    },

    /* ===== PREVIEW ===== */
    previewImage(photo, index) {
      this.previewImages = [...this.selectedFolder.photos];
      this.currentPreviewIndex = index;
      this.zoomLevel = 1;
      this.previewVisible = true;
    },
    closePreview() {
      this.previewVisible = false;
      this.zoomLevel = 1;
    },
    prevImage() {
      if (this.currentPreviewIndex > 0) { this.currentPreviewIndex--; this.zoomLevel = 1; }
    },
    nextImage() {
      if (this.currentPreviewIndex < this.previewImages.length - 1) { this.currentPreviewIndex++; this.zoomLevel = 1; }
    },
    zoomIn() { if (this.zoomLevel < 3) this.zoomLevel = Math.min(3, this.zoomLevel + 0.25); },
    zoomOut() { if (this.zoomLevel > 0.5) this.zoomLevel = Math.max(0.5, this.zoomLevel - 0.25); },
  },
  watch: {
    createModalVisible(newVal) {
      if (!newVal) {
        this.formState.nom_galerie = '';
      }
    },
  },
  async created(){
     await this.$store.dispatch("getInfoUser");
     this.dossierGaleries = this.$store.state.infoUserConnected?.user?.dossier_galerie;
     this.photosMiseEnAvant = this.getPhotosMiseEnAvant(this.$store.state.infoUserConnected?.user?.dossier_galerie)
     console.log("infoUserConnectedGalerie",this.$store.state.infoUserConnected)
  }
};
</script>

<style scoped>
.shimmer-text {
  font-weight: 600;
  background: linear-gradient(
    90deg,
    #999 0%,
    #fff 50%,
    #999 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 1.5s infinite;
}

@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
:deep(.ant-modal-content){
    padding:0 !important;
}
.form-modal-inner{
    height:500px !important;
    overflow-y: auto !important;
}
*, *::before, *::after { box-sizing: border-box; }

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
  top: -40px; right: -40px;
  width: 220px; height: 220px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
}
.page-header::after {
  content: '';
  position: absolute;
  bottom: -60px; left: -20px;
  width: 160px; height: 160px;
  border-radius: 50%;
  background: rgba(255,255,255,0.07);
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
  color: rgba(255,255,255,0.85);
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
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  transition: all 0.25s ease;
  white-space: nowrap;
  flex-shrink: 0;
}
.btn-create-folder:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,0,0,0.2);
  background: #fff8f0;
}
.btn-icon { font-size: 15px; }

/* ===== CONTENT ===== */
.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}

/* ===== SECTION ===== */
.section { margin-bottom: 48px; }
.section-header { margin-bottom: 24px; }
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
.folder-badge { background: linear-gradient(135deg, #333, #555); }
.section-title {
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 6px;
  letter-spacing: -0.3px;
}
.section-subtitle { font-size: 14px; color: #888; margin: 0; }

/* ===== FEATURED GRID ===== */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 900px) { .featured-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 580px) { .featured-grid { grid-template-columns: 1fr; } }

.featured-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.featured-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(255,122,0,0.22); }
.featured-img-wrapper { position: relative; width: 100%; padding-top: 70%; overflow: hidden; }
.featured-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.featured-card:hover .featured-img { transform: scale(1.06); }
.featured-overlay {
  position: absolute; inset: 0;
  background: rgba(255,122,0,0.35);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s;
}
.featured-card:hover .featured-overlay { opacity: 1; }
.overlay-icon { font-size: 32px; color: #fff; }

/* ===== FOLDERS GRID ===== */
.folders-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
@media (max-width: 580px) { .folders-grid { grid-template-columns: 1fr; } }

/* ===== FOLDER CARD ===== */
.folder-card {
  background: #fff;
  border-radius: 16px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1.5px solid transparent;
  position: relative;
  overflow: hidden;
}
.folder-card::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: linear-gradient(180deg, #FF7A00, #FF9A3C);
  opacity: 0; transition: opacity 0.25s;
}
.folder-card:hover { border-color: rgba(255,122,0,0.25); box-shadow: 0 8px 28px rgba(255,122,0,0.14); transform: translateX(4px); }
.folder-card:hover::before { opacity: 1; }

.folder-icon-wrap {
  width: 46px; height: 46px;
  border-radius: 12px;
  background: linear-gradient(135deg, #FFF3E0, #FFE0B2);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.folder-icon { font-size: 22px; color: #FF7A00; }
.folder-info { flex: 1; min-width: 0; }
.folder-name { display: block; font-size: 14px; font-weight: 700; color: #1a1a2e; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.folder-count { font-size: 12px; color: #aaa; }
.folder-preview { display: flex; gap: 4px; flex-shrink: 0; }
.preview-thumb { width: 30px; height: 30px; border-radius: 6px; object-fit: cover; border: 1.5px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }

/* ===== FOLDER ACTIONS ===== */
.folder-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s;
}
.folder-card:hover .folder-actions { opacity: 1; }

.folder-action-btn {
  width: 32px; height: 32px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px;
  transition: all 0.2s;
}
.btn-edit {
  background: #f0f0f0;
  color: #555;
}
.btn-edit:hover { background: #FF7A00; color: #fff; }

.btn-delete {
  background: #fff0f0;
  color: #e53935;
}
.btn-delete:hover { background: #e53935; color: #fff; }

/* ===== MODAL DOSSIER ===== */
.folder-modal :deep(.ant-modal-content) { border-radius: 20px; overflow: hidden; padding: 0; box-shadow: 0 24px 80px rgba(0,0,0,0.2); }
.folder-modal :deep(.ant-modal-body) { padding: 0 !important; }
.folder-modal :deep(.ant-modal-close) { top: 16px; right: 16px; }
.folder-modal :deep(.ant-modal-close-x) { width: 36px; height: 36px; line-height: 36px; background: rgba(0,0,0,0.06); border-radius: 50%; font-size: 14px; color: #666; transition: background 0.2s; }
.folder-modal :deep(.ant-modal-close-x:hover) { background: rgba(255,122,0,0.12); color: #FF7A00; }

.modal-inner { background: #fff; }
.modal-header-custom { padding: 22px 28px 18px; border-bottom: 1px solid #f0f0f0; background: linear-gradient(135deg, #fffbf7, #fff8f0); }
.modal-title-wrap { display: flex; align-items: center; gap: 14px; }
.modal-folder-icon { font-size: 30px; color: #FF7A00; }
.modal-title-text { font-size: 20px; font-weight: 800; color: #1a1a2e; margin: 0 0 2px; }
.modal-count { font-size: 13px; color: #aaa; }

/* ===== MODAL PHOTOS GRID ===== */
.modal-photos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px 24px 24px;
  max-height: 60vh;
  overflow-y: auto;
}
@media (max-width: 900px) { .modal-photos-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 580px) { .modal-photos-grid { grid-template-columns: repeat(2, 1fr); padding: 14px; gap: 8px; } }
.modal-photos-grid::-webkit-scrollbar { width: 6px; }
.modal-photos-grid::-webkit-scrollbar-track { background: #f5f5f5; }
.modal-photos-grid::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }

.modal-photo-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  padding-top: 100%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.modal-photo-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  cursor: pointer;
}
.modal-photo-card:hover .modal-photo-img { transform: scale(1.06); }

.modal-photo-actions {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  gap: 8px;
  opacity: 0; transition: opacity 0.25s;
  background: rgba(0,0,0,0.35);
}
.modal-photo-card:hover .modal-photo-actions { opacity: 1; }

.photo-action-btn {
  width: 34px; height: 34px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 14px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.photo-preview-btn { background: rgba(255,255,255,0.9); color: #FF7A00; }
.photo-preview-btn:hover { background: #FF7A00; color: #fff; }
.photo-delete-btn { background: rgba(229, 57, 53, 0.9); color: #fff; }
.photo-delete-btn:hover { background: #c62828; transform: scale(1.1); }

/* ===== FORM MODALS SHARED ===== */
.rename-modal :deep(.ant-modal-content),
.create-modal :deep(.ant-modal-content),
.confirm-modal :deep(.ant-modal-content) {
  border-radius: 20px; overflow: hidden; padding: 0;
  box-shadow: 0 24px 80px rgba(0,0,0,0.18);
}
.rename-modal :deep(.ant-modal-body),
.create-modal :deep(.ant-modal-body),
.confirm-modal :deep(.ant-modal-body) { padding: 0 !important; }
.rename-modal :deep(.ant-modal-close),
.create-modal :deep(.ant-modal-close),
.confirm-modal :deep(.ant-modal-close) { top: 14px; right: 14px; }
.rename-modal :deep(.ant-modal-close-x),
.create-modal :deep(.ant-modal-close-x),
.confirm-modal :deep(.ant-modal-close-x) { width: 32px; height: 32px; line-height: 32px; background: rgba(0,0,0,0.05); border-radius: 50%; font-size: 13px; color: #999; }

.form-modal-inner { background: #fff; }
.form-modal-header {
  padding: 28px 28px 20px;
  text-align: center;
  background: linear-gradient(135deg, #fffbf7, #fff5ec);
  border-bottom: 1px solid #f5f5f5;
}
.form-modal-icon-wrap {
  width: 56px; height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #FF7A00, #FF9A3C);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px;
  box-shadow: 0 8px 20px rgba(255,122,0,0.3);
}
.form-modal-icon { font-size: 26px; color: #fff; }
.form-modal-title { font-size: 18px; font-weight: 800; color: #1a1a2e; margin: 0 0 6px; }
.form-modal-subtitle { font-size: 13px; color: #999; margin: 0; }

.form-modal-body { padding: 24px 28px; }
.form-label { display: block; font-size: 13px; font-weight: 700; color: #555; margin-bottom: 8px; }
.required { color: #FF7A00; }
.form-label-hint { font-weight: 400; color: #bbb; font-size: 12px; }
.form-input :deep(.ant-input) { border-radius: 10px; border-color: #e8e8e8; font-size: 14px; }
.form-input :deep(.ant-input:focus) { border-color: #FF7A00; box-shadow: 0 0 0 3px rgba(255,122,0,0.12); }

.form-modal-footer {
  padding: 16px 28px 24px;
  display: flex; gap: 10px; justify-content: flex-end;
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
  display: flex; align-items: center; gap: 7px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #FF7A00, #FF9A3C);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(255,122,0,0.35);
}
.btn-confirm:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,122,0,0.45); }
.btn-confirm:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

.btn-danger {
  display: flex; align-items: center; gap: 7px;
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #e53935, #ef5350);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(229,57,53,0.3);
}
.btn-danger:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(229,57,53,0.4); }

/* ===== CONFIRM MODAL ===== */
.confirm-modal-inner { padding: 32px 28px 28px; text-align: center; }
.confirm-icon-wrap {
  width: 60px; height: 60px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 18px;
}
.confirm-icon-wrap.danger { background: #fff0f0; }
.confirm-icon { font-size: 26px; color: #e53935; }
.confirm-title { font-size: 18px; font-weight: 800; color: #1a1a2e; margin: 0 0 10px; }
.confirm-text { font-size: 14px; color: #888; margin: 0 0 24px; line-height: 1.6; }
.confirm-actions { display: flex; gap: 10px; justify-content: center; }

/* ===== UPLOAD ZONE ===== */
.upload-zone {
  border: 2px dashed #e0e0e0;
  border-radius: 14px;
  background: #fafafa;
  cursor: pointer;
  transition: all 0.25s;
  min-height: 160px;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.upload-zone:hover, .upload-zone--drag {
  border-color: #FF7A00;
  background: #fff8f0;
}
.upload-zone-content { text-align: center; padding: 24px; }
.upload-icon-wrap {
  width: 52px; height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #FFF3E0, #FFE0B2);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 12px;
}
.upload-zone-icon { font-size: 24px; color: #FF7A00; }
.upload-text { font-size: 14px; font-weight: 700; color: #555; margin: 0 0 4px; }
.upload-subtext { font-size: 13px; color: #aaa; margin: 0 0 8px; }
.upload-hint { font-size: 11px; color: #ccc; background: #f0f0f0; padding: 3px 10px; border-radius: 20px; }

.upload-preview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 12px;
  width: 100%;
  max-height: 220px;
  overflow-y: auto;
}
@media (max-width: 480px) { .upload-preview-grid { grid-template-columns: repeat(3, 1fr); } }

.upload-preview-item {
  position: relative;
  padding-top: 100%;
  border-radius: 8px;
  overflow: hidden;
}
.upload-preview-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.upload-remove-btn {
  position: absolute; top: 3px; right: 3px;
  width: 20px; height: 20px;
  border-radius: 50%;
  border: none;
  background: rgba(229,57,53,0.9);
  color: #fff;
  font-size: 10px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
}
.upload-remove-btn:hover { background: #c62828; }

.upload-add-more {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  border: 2px dashed #ddd;
  border-radius: 8px;
  color: #aaa;
  font-size: 11px; gap: 4px;
  cursor: pointer; transition: all 0.2s;
  min-height: 60px;
}
.upload-add-more:hover { border-color: #FF7A00; color: #FF7A00; background: #fff8f0; }
.upload-count-hint { font-size: 12px; color: #FF7A00; font-weight: 600; margin: 8px 0 0; }

/* ===== PREVIEW ===== */
.custom-preview-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.94);
  z-index: 9999;
  display: flex; align-items: center; justify-content: center;
}
.preview-toolbar {
  position: absolute; top: 0; left: 0; right: 0; height: 60px;
  display: flex; align-items: center; justify-content: center; gap: 16px;
  background: linear-gradient(180deg, rgba(0,0,0,0.6), transparent);
  padding: 0 20px; z-index: 10;
}
.preview-btn {
  width: 40px; height: 40px; border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.08); color: #fff;
  font-size: 16px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; backdrop-filter: blur(6px);
}
.preview-btn:hover:not(:disabled) { background: #FF7A00; border-color: #FF7A00; }
.preview-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.close-btn { margin-left: 16px; background: rgba(255,60,60,0.15); border-color: rgba(255,60,60,0.3); }
.close-btn:hover { background: #e53935 !important; border-color: #e53935 !important; }
.preview-counter { color: rgba(255,255,255,0.7); font-size: 14px; min-width: 60px; text-align: center; }
.preview-img-container { max-width: 90vw; max-height: 80vh; transition: transform 0.2s ease; }
.preview-fullscreen-img { max-width: 90vw; max-height: 80vh; object-fit: contain; border-radius: 8px; box-shadow: 0 8px 60px rgba(0,0,0,0.5); }
.preview-zoom-controls {
  position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 12px;
  background: rgba(255,255,255,0.08); backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.15); border-radius: 30px; padding: 8px 16px;
}
.zoom-ctrl-btn {
  width: 32px; height: 32px; border-radius: 50%; border: none;
  background: rgba(255,255,255,0.12); color: #fff; font-size: 14px;
  cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s;
}
.zoom-ctrl-btn:hover { background: #FF7A00; }
.zoom-level { color: rgba(255,255,255,0.8); font-size: 13px; min-width: 44px; text-align: center; font-weight: 600; }
</style>