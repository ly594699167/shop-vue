<template>
  <div ref='container' class='container'>
      <Search @handelSearch='search'/>
      <button class='button'>
          <router-link :to='{path:"/product/add"}'>
              商品添加
          </router-link>
        </button>
      <ShopList :data = getdata  />
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import Search from './Search'
import ShopList from './shopList'
export default {
    components:{
        Search,
        ShopList,
        
    },
    computed:{
       ...mapState(['shopList']),
       getdata(){
            return this.data;
       },
    },
    async created(){  
       await this.changeShopList();
     await this.changeSetCategory();
      
     this.data =  this.$store.state.shopList.data
    },
    methods:{
         ...mapActions(['changeShopList','changeSetCategory']),
         
       async search(item){
       
       await this.changeShopList(item);        
       this.data = this.$store.state. shopList.data;
       this.data = this.data.map(item=>{
           return {
               ...item,
               key:item.id,
               
           }
       })
 
       }
      
    },
    data(){
        return {
            data:[],
            category:[],
        }
    }
    
}
</script>

<style lang ='less' scoped>
    .container {
        position: relative;
       .button{
           position: absolute;
           right:10px;
           top:25px;
       }
    }
</style>