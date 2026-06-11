<template>
  <router-view />
</template>

<style>
.p-dialog-mask {
  background-color: rgba(118, 118, 119, 0.57) !important;
}
.n-input .n-input__input-el {
  caret-color: gray !important;
}
table,
.dataTables_wrapper {
  overflow: auto !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
input:focus {
  border-color: rgb(5, 35, 73) !important;
  background: rgba(144, 190, 247, 0.566) !important;
}
input {
  border-top-right-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
  color: #2c3e50 !important;
  font-weight: bold !important;
}
.font-bold,
.form-label {
  font-size: 1.2em !important;
  font-weight: 900 !important;
}
</style>
