<template>
  <div class="home">
    {{banner}}
  </div>
</template>

<script>
import{onMounted, ref}from 'vue';
import{getHomeAllData,getBanner} from 'network/home.js'
export default {
  name: 'Home',
  setup(){
    const banner= ref([])
    onMounted(()=>{
      getHomeAllData().then(res=>{
        banner.value=res.slides
        console.log(res.slides);
      }).catch(err=>{

      })
    })
    return{
      banner
    }
  },
  components: {
   
  }
}
</script>
