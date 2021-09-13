<template>
  
    <a-menu 
    theme='dark'
    :selectedKeys='select'
    mode="inline" :open-keys="openKeys" style="width: 100%;height:100%" @openChange="onOpenChange">
        <template v-for='item in userRoute'>
             <a-sub-menu 
             
             v-if='!item.meta.hidden' :key='item.meta.title'>
        <span slot="title"><a-icon type="mail" /><span>{{item.meta.title}}</span></span>
       <template v-for='items in item.children'>
         <a-menu-item  :key ='items.meta.title' v-if='!items.meta.hidden'>
           <router-link :to='{name:items.name}'>{{items.meta.title}}</router-link>
        </a-menu-item>
       </template>
        
      </a-sub-menu>
        </template>
    </a-menu>

</template>
<script>
import {mapState} from 'vuex'
 export default {
     data() {
    return {
      rootSubmenuKeys: ['首页', '商品'],
      openKeys: [this.$router.currentRoute.matched[0].meta.title],
     select:[this.$router.currentRoute.matched[1]?this.$router.currentRoute.matched[1].meta.title:'']
    };
  },  
    watch:{
      $route(){
        this.select =[this.$router.currentRoute.matched[1]?this.$router.currentRoute.matched[1].meta.title:''];
        
      }
    },
     computed:{...mapState(['userRoute']),
     
     },
     methods: {
    onOpenChange(openKeys) {
     
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },

}
</script>

<style lang = 'less'>
</style>