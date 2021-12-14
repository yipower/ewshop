<template>
    <div>
        <nav-bar>
            <template v-slot:default>购物车</template>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
    name:'ShopCart',
    setup () {
      
       

        return {}
    },
    components:{ NavBar  }
}
</script>

<style  scoped>

</style>