<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="name" label="商品售价" required prop="price">
      <a-input v-model="form.price" />
    </a-form-model-item>
    <a-form-model-item label="商品折扣" prop="price_off">
      <a-input v-model="form.price_off" />
    </a-form-model-item>
    <a-form-model-item label="商品库存" prop="inventory">
      <a-input v-model="form.inventory" />
    </a-form-model-item>
    <a-form-model-item label="计量单位" prop="unit">
      <a-input v-model="form.unit" />
    </a-form-model-item>
    <a-form-model-item label="商品相册" prop="images">
      <a-upload
        :action="
          'https://mallapi.duyiedu.com/upload/images?appkey=' +
          $store.state.objMessage.appkey
        "
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
        name="avatar"
      >
        <div v-if="fileList.length < 8">
          <a-icon :type="loading?'loading':'plus'" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="prev">上一步</a-button>
      <a-button type="primary" @click="next">完成</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  props: ["form"],
  data() {
    return {
        previewVisible: false,
      previewImage: '',
      loading:false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {},

      fileList: [],
    };
  },
  methods: {
      async handlePreview(file) {
      
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList,file}) {
      if(file.status ==='done'){
        
          this.form.images.push(file.response.data.url);
      }else if(file.status=='removed'){
        const { url } = file.response.data;
        this.form.images.filter(item=>{item !==url})
      }
      this.fileList = fileList;
   
    },
    prev() {
      this.$emit("prev");
    },
     handleCancel() {
      this.previewVisible = false;
    },
    next(){
      this.$emit('next',this.form,this.fileList)
    }
  },
};
</script>

<style>
button {
  margin-right: 10px;
}
</style>