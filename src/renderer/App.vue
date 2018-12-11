<template lang="pug">
#app
  header
  //- p You appear to be offline, that's not work...
  router-view
</template>

<script>
export default {
  name: 'portan'
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  font-family: 'Source Sans Pro', sans-serif;
  // -webkit-app-region: drag;
}
header {
  height: 40px;
  -webkit-app-region: drag;
}
input {
  padding: 0;
  border: none;
  border-radius: 0;
  outline: none;
  background: none;
}
</style>
