<template> 
  <banner-detail :is-edit='true'></banner-detail>
</template>
<script>
  import bannerDetail from './components/bannerDetail'
  export default {
    name: 'updateBanner',
    components: { bannerDetail }
  }
</script>
<style>
</style>


