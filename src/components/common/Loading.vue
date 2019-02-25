<template>
  <div>
  </div>
</template>
<script>
  export default {
    created(){
      this.$indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      });
    }
  }
</script>
<style lang="stylus" scoped>

</style>


