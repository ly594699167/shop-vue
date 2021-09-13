<template>
  <div class="proAdd">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-action">
      <Shop-detial v-if="current === 0" :form="form" @next="next" />
      <ShopMail
        v-else-if="current === 1"
        :form="form"
        @prev="prev"
        @next="next"
      />
    </div>
  </div>
</template>
<script>
import ShopDetial from "./add/shopDetial";
import ShopMail from "./add/sellShop";
export default {
  components: {
    ShopDetial,
    ShopMail,
  },
  data() {
    return {
      form: {
        title: "",
        category: '',
        c_items: "",
        tags: undefined,
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: "g",
        images: [],
      },
      current: 0,
      steps: [
        {
          title: "填写商品基本信息",
        },
        {
          title: "填写商品销售信息",
        },
      ],
    };
  },
  methods: {
    async next(form) {
      this.form = {
        ...this.form,
        ...form,
      };
      if (this.current === 1) {
      
      let data = await this.$axios.addShop(this.form)
      console.log(data,'data是啥')
        // this.$message.success('添加成功了')
        // this.$router.push({
        //   name:'ProductList'
        // })
      }
      this.current++;
    },
    prev() {
      this.current--;
    },
  },
};
</script>
<style scoped>
.proAdd {
  width: 80%;
  margin: 20px auto;
}
.steps-action {
  margin-top: 24px;
}
</style>