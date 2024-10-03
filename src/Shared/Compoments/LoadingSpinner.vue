<template>
  <div class="spinner_loading">
    <a-spin size="large" tip="Chargement..." wrapperClassName="style-spinner" />
  </div>
</template>
<style>
.ant-spin-dot > i {
  background: black !important;
}
.ant-spin-text {
  color: black !important;
  font-size: 1.5em !important;
  font-weight: bold;
}
</style>
<style scoped>
.spinner_loading {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(214, 214, 214, 0.679);
  display: flex;
  justify-content: center;
  place-content: center;
  place-items: center;
  z-index: 999999;
}
</style>
