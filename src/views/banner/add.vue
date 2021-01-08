<template> 
  <banner-detail :is-edit='false'></banner-detail>
</template>
<script>
  import bannerDetail from './components/bannerDetail'
  export default {
    name: 'addBanner',
    components: { bannerDetail }
  }
</script>
<style>
</style>


