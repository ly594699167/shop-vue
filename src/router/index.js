import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import vueStore from '../store'
import Firsts from '../views/Index.vue'
import AllowRoute from '../utils/shopType'


Vue.use(VueRouter)
const asyncRoute = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
      icon: 'inbox',
    },
    component: Firsts,
    children: [
      {
      path: 'list',
      name: 'ProductList',
      meta: {
        title: '商品列表',
        icon: 'unordered-list',
      },
      component: () => import('../components/proList.vue'),
    },
    {
      path: 'add',
      name: 'ProductAdd',
      meta: {
        title: '添加商品',
        icon: 'file-add',
       
      },
      component: () => import('../components/proAdd.vue'),
    },
    {
      path: 'edit/:id',
      name: 'ProductEdit',
      meta: {
        title: '编辑商品',
        icon: 'file-add',
        hidden: true,
      },
      component: () => import('../components/proAdd.vue')
    },
    {
      path: 'category',
      name: 'Category',
      meta: {
        title: '类目管理',
        icon: 'project',
      },
      component: () => import('../components/types.vue'),
    },
    ],
  },
];

const routes = [
  {
    path: '/',
    component: Firsts,
    redirect: '/number',
    name: 'Home',
    meta: {
      title: '首页',
     
    },
    children: [{
      path: '/number',
      name: 'index',
      meta: {
        title: '统计',
        
      },
      component: () => import('../components/number.vue')
    }]
  },
  {
    path: '/login',
    name:'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录',
      hidden: true,
    }
  },
  {
    path: '/regiser',
    component: () => import('../views/Regiser.vue'),
    meta: {
      title: '注册',
      hidden: true,
    }

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
let isAdd = false
router.beforeEach((to, from, next) => {

  if (to.path !== '/login') {
     if (store.state.objMessage) {
       store.commit('setLogin',true);
       if (!isAdd) {
         const menuRoutes = AllowRoute(store.state.objMessage.role,asyncRoute );
         store.dispatch('changeUserRoute', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);   
          next({
           path:to.path
            
          });
         });
         isAdd = true;
       }
      return next();
    }
    return next('/login');
  }
 
  return next();
});
 
  

const originalPush = VueRouter .prototype.push
const originalReplace = VueRouter .prototype.replace
// push
VueRouter .prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter .prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}
  
export default router

