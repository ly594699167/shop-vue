import axios from './axios'
//获取验证码
function getCode(email){
    return axios.post('/passport/getCode',{
        email,
    })
}
//用户注册
function regiser(objMessage){
    return axios.post('/passport/logon',{
        ...objMessage,
    })
}
//用户登录
const login = (message)=>{
    return axios.post('/passport/login',{
        ...message
    })
}
//获取商品列表
const getShopList=(obj={})=>{
    return axios.get('/products/all',{
        params:{
            ...obj,
        }
    })
}
//获取商品类目列表
const getCategory=(obj={})=>{
    return axios.get('/category/all',{params:{
        ...obj
    }
    })
}
//添加数据
const addShop=(params)=>{
    return axios.post('/products/add',params)
}
//获取商品详情
const shopDetaile=(id)=>{
    return axios.get('/products/'+id)
}
//商品删除
const shopDel=(id,appkey)=>{
    return axios.delete( '/products/'+id,{appkey})
}
export default {
    getCode,
    regiser,
    login,
    getCategory,
    getShopList,
    addShop,
    shopDetaile,
    shopDel,
}

