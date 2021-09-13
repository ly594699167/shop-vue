<template>
  <div class='layout-header' >
      <div class="header-left">用户管理系统</div>
      <div class="header-right">
          <div v-if='!isLogin' > 
              <span >欢迎来到管理系统</span>
              <router-link to='/login' tag="span" class='style'>请登录</router-link>
          </div> 
        <div v-else>
               <a>{{objMessage.username}}</a>
              <span>欢迎您归来</span>
              <span class='loginOut' @click="logout">退出</span>
          </div>
      </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
computed:mapState(['isLogin','objMessage']),
methods:{
    ...mapActions(['logout']),
    logout(){{
        this.$store.dispatch('logout');
        //跳转到登录页
        this.$router.push("/login");
    }}
}

};
</script>

<style lang='less'> 
   @import '../../css/header.less';
   .loginOut:hover{
       cursor: pointer;
       color:#f45454;
   }
</style>