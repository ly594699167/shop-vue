<template>
  <a-form :form="form" @submit="handleSubmit" class="regiser">
    <a-form-item v-bind="formItemLayout" label="用户名">
      <a-input
        autocomplete="请创建一个用户名"
        v-decorator="[
          'username',
          {
            rules: [
              { required: true, message: '请输入您的用户名', whitespace: true },
            ],
          },
        ]"
      ></a-input>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="密码">
      <a-input
        autocomplete="请输入密码"
        type="password"
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
    <a-form-item v-bind="formItemLayout" label="确认密码">
      <a-input
        autocomplete="请再次输入密码"
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请确认您的密码',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      ></a-input>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="邮箱">
      <a-input
        autocomplete="请输入您的邮箱"
        ref = 'email'
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
    <a-form-item v-bind="formItemLayout" label="用户类别">
      <a-radio-group name="userType" v-model = 'value'
      :default-value = 'value'
       
      >
        <a-radio value="customer">customer</a-radio>
        <a-radio value="admin">admin</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="验证码">
      <a-row :gutter="8">
        <a-col :span="12">
          <a-input
            v-decorator="[
              'code',
              {
                rules: [
                  {
                    required: true,
                    message: '验证码必须填写',
                  },
                ],
              },
            ]"
          />
        </a-col>
        <a-col :span="12">
          <a-button @click='getCodes'>验证码</a-button>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-row :gutter="8">
        <a-col :span="12">
          <a-button type='primary' html-type = 'submit'>注册</a-button>
        </a-col>
      </a-row>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err,{email,password,code,username})=>{
        if(!err){
          this.userMessage = {
            role:this.value,
            email,
            password,
            code,
            username
          }
       
          //发送ajax请求
            this.regiser(this.userMessage);
          
        }
      })
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value != form.getFieldValue("password")) {
        callback("两次密码不一致");
      }
      callback();
    },
    //失去焦点时是否确认了密码
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    //获取验证码
    async getCodes(){
     
      const {email} = this.$refs;

      const code =await this.$axios.getCode(email.value);
    },
    //用户注册
    async regiser(obj){
  
      const data = await this.$axios.regiser(obj);
      //用户注册成功
        if(data.status === 'success'){
          //页面跳转到登录页
          this.$router.push('/login')
         
        }
    }
  },
  data() {
    return {
      //用户的类型
      value:'customer',
      //注册用户的信息
      userMessage:null,
      //用于判定确认密码是否有值
      confirmDirty: false,
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
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "regiser",
    });
  },
};
</script>

<style style = 'less'>
.regiser {
  position: absolute;
  width: 100%;
  /* height: 100%; */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid dashed;
}
</style>