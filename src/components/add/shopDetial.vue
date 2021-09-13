<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="name" label="标题" required prop="title">
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" type="textarea" />
    </a-form-model-item>
    <a-form-model-item label="商品类目" prop="category" required>
      <a-select
        show-search
        placeholder="添加类目"
        v-model="form.category"
        style="width: 100%"
        @change="handleChange"
      >
        <a-select-option
          v-for="item in categorylist"
          :key="item.id"
          :value="item.name"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
      <a-select
        show-search
        placeholder="请添加子类目"
        style="width: 100%"
        v-model="form.c_items"
      >
        <a-select-option v-for="item in c_catgory" :key="item" :value="item">
          {{ item }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" prop="tags">
      <a-select
        mode="tags"
        style="width: 100%"
        :default-value="['包邮,最晚次日达']"
        v-model="form.tags"
      >
        <a-select-option value="包邮,最晚次日达">
          包邮,最晚次日达
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="next">下一步</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    props:['form'],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      categorylist: [],
      c_catgory: [],
      categoryId:0,
    
      rules: {
          tags:{
              required:true,
              message:'请填写标签信息'
          },
        title: [
          {
            required: true,
            message: "请填写标题",
            trigger: "change",
          },
        ],

        category: [
          {
            required: true,
            message: "请填写类目",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["category"]),
  },
  async created() {
    await this.changeSetCategory();
    this.categorylist = this.category;
  },

  methods: {
    ...mapActions(["changeSetCategory"]),
    onSubmit() {},

    handleChange(item) {
   
      this.categorylist.forEach((items) => {
        
        console.log(items, item);
        if (items.name === item) {
         this.categoryId = items.id
          this.c_catgory = items.c_items;
         
        }
      });
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.form.category = this.categoryId
          this.$emit('next',this.form)
          return true
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

