import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/ajax/api.js'
Vue.use(Vuex)
let data = JSON.parse(localStorage.getItem('userInfo'));
export default new Vuex.Store({
  state: {
    //用户信息
    objMessage:data,
    //判定用户是否登录
    isLogin:false,
    //用户路由
    userRoute:[],
    //类目列表
    category:[],
    //商品列表
    shopList:[],
  },
  mutations: {
    //存储用户信息
    setUserInfos(state,info){
      state.objMessage = info;
 
    },
    //修改登录信息
    setLogin(state,blooean){
      state.isLogin = blooean;
    },
    //设置用户路由
    setUserRoute(state,route){
      state.userRoute = route
    },
    //修改商品类目
    setCategory(state,arr){
      state.category = arr;
    },
    //商品列表信息
    setShopList(state,arr){
      state.shopList = arr
    }

  },
  actions: {
    setUserInfo({commit},info){

      commit('setUserInfos',info.data);
      commit('setLogin',true);
      //将用户信息存储到本地
      localStorage.setItem('userInfo',JSON.stringify(info.data));
    },
    //触发设置路由
    changeUserRoute({commit},route){
      commit('setUserRoute',route);
    },
    //触发修改类目
    async changeSetCategory({commit},obj={}){
        const data = await axios.getCategory(obj);
        commit('setCategory',data.data.data);
      
    },
    //修改商品列表
    async changeShopList({commit},obj={}){
     
      const data = await axios.getShopList(obj);
      console.log(data);
      commit('setShopList',data.data);
    },
    //用户退出登录
    logout({commit},obj = {}){
      commit('setUserInfos',{});
      commit('setLogin',false);
      //将本地存储清除
      localStorage.removeItem('userInfo')
    }
  },
  modules: {
  }
})
