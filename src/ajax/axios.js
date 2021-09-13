import axios from 'axios'
import store from '../store' 

//创建axios实例
const instance = axios.create({
    baseURL: 'https://mallapi.duyiedu.com/',
})
//请求拦截
instance.interceptors.request.use((config) => {
    if(config.url.startsWith('/category')||config.url.startsWith('/products')){
     
       let obj ={
            ...config,
            params:{
                appkey:store.state.objMessage.appkey,
               ...config.params,
            }
        }
   
        return obj;
       // };
    }
    return config;
})
//响应拦截
instance.interceptors.response.use(responce => {

    return responce.data;
})

export default instance 