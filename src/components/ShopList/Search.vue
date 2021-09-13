<template>
  <a-form-model 
  layout="inline" :model="shopList"
  class='search-container'
   @submit="handleSubmit" @submit.native.prevent>

        <a-form-model-item label='检索关键字' >
      <a-input v-model="shopList.searchWord" >
        <a-icon slot="prefix" type='search' style="color:rgba(0,0,0,.25)"
         placeholder='请输入关键字'/>
      </a-input>
    </a-form-model-item>
    <a-form-model-item label='商品类目'>
  <a-select
     allow-clear
    show-search
    placeholder="请选择商品类目"
    style="width: 200px"
    @change='handleChange'
  >
    <a-select-option 
   
    v-for='(item) in category'
    :key ='item.id'
    :value="item.id">
    {{item.name}}
    </a-select-option>
   
  </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled = "shopList.category === ''"
      >
        提交
      </a-button>
    </a-form-model-item>

   
  </a-form-model>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return{
                shopList:{
                    searchWord:'',
                     category:''
                },
      
               
        }
    },
   async created(){
   await this.changeSetCategory();
  

      
    },
    computed:{
        ...mapState(['category'])
    },
    methods:{
        ...mapActions(['changeSetCategory']),
       async handleSubmit(){
          
           this.$emit('handelSearch',this.shopList)
               //执行列表渲染
        },
        handleChange(value){        
        
            this. shopList.category = value;
         
        }
    }
}
</script>

<style lang='less' scoped>
    .search-container{
       padding:20px;
    }
</style>