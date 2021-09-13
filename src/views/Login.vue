<template>
  <a-form :form="form" @submit="handleSubmit" class="login">
    <a-form-item
    v-bind="formItemLayout"
    label='邮箱'
    >
    <a-input  
      autocomplete="请输入邮箱"
       v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: '邮箱格式不正确',
              },
              {
                required: true,
                message: '请输入您的邮箱',
              },
            ],
          },
        ]"
    ></a-input>
    </a-form-item>
    <a-form-item
    v-bind="formItemLayout"
    label='密码'
    >
    <a-input type='password'
    autocomplete="请输入密码"
       v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入您的密码',
              },
            ],
          },
        ]"
    
    ></a-input>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
        <a-row :gutter="10">
          <a-col :span='8'>
            <a-button html-type="submit" type='primary'>登录</a-button>
          </a-col>
        <a-col :span="8">
          <router-link to='/regiser'>
            <a-button>注册</a-button>
          </router-link>
        </a-col>
      </a-row>
    </a-form-item>
  </a-form>
  
</template>

<script>
import{mapActions} from 'vuex'
export default {
  data(){
    return{
       formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
      },
       tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 10,
            offset: 8,
          },
        },
      },
    }
  },
  methods:{
    ...mapActions(['setUserInfo']),
    handleSubmit(e){
      e.preventDefault();
       this.form.validateFields((err,{email,password})=>{
        if(!err){
          this.loginMessage = {
            email,
            password,
          }
          //发送ajax请求
            this.login(this.loginMessage);
        }
      })
    },
    //用户登录
    async login(obj){
      const data =await this.$axios.login(obj)
      console.log(data,'用户登录信息')
      if(data.status === 'success'){
        this.$store.dispatch('setUserInfo',data);
         //用户信息存储到仓库中
        this.$router.push('/');
        
    
   
       
     
      }
    }
  },
beforeCreate(){
  this.form = this.$form.createForm(this, {
    name:'login'
  });
}
}
</script>

<style type='less'>
.login{
  position: absolute;
  width: 100%;
  /* height: 100%; */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid dashed;
}
</style>