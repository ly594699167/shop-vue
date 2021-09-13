<template>
  <a-table 
  ref='container'
  :columns="columns"
  :pagination="pagination"
  @change="handleChange"
   :data-source="getTableDate">
    <div slot="work" class='button' slot-scope="text, record">
        <button @click="toDetaile(record)">编辑</button>
        <button @click="delShop(record)">删除</button>
    </div>
  </a-table>
</template>
<script>
import {mapState,mapActions} from 'vuex'



export default {
  props:['data'],
  data() {
    return {
      columns: [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',

  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '类目',
    dataIndex: 'category',
    ellipsis: true,
     customRender:(text,word)=>{
       let name = ''
       this.$store.state.category.forEach(item => {
            if(item.id == word.category){
              name = item.name        
            }        
       });
       
       return name;
    }
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'tags',
  },
  
   {
    title: '限制购买数量',
    dataIndex: 'inventory',
  },
   {
    title: '上架状态',
    dataIndex: 'status',
    customRender:(text,word)=>{
      return word.status === 1?'上架中':"未上架"
    }
  },
   {
    title: '操作',
    dataIndex: 'work',
    scopedSlots: { customRender: 'work'}
  },
],
      pagination:{},
      routeInfo:null,
        
    };
 
  },
 async created(){
  
  await this.changeSetCategory();
   
  },
  methods:{
    ...mapActions(['changeSetCategory']),
      handleChange(item){
        
          this.routeInfo = item;
          this.$router.push({
              name:'ProductList',
          })
         

      },
      async delShop(e){
        console.log(this.$axios)
        const appkey = this.objMessage.appkey
        const result =  await this.$axios.shopDel(e.id,appkey);
        if(result.status === 'success'){
          alert('商品删除成功')
        }
      },
      toDetaile(e){
        console.log(e.id)
        this.$router.push({        
         name: 'ProductEdit',
          params:{
            id:e.id,
          }
        })
      }
  },
  computed:{
      ...mapState(['category','objMessage']),
      getRouteInfo(){
          const current = this.routeInfo.current || 1;
          const pageSize = this.routeInfo.pageSize ||5;
         
          return {
              current,
              pageSize
          }
      },

      getTableDate(){
      
        return  this.data.map(item=>{
      
              return {
                  ...item,
                  key:item.id,
                
              }
          })
      }
  }
};
</script>
<style scoped lang='less'>
.button{
  display: flex;
  padding:0;
  button{
    flex:1;
    padding:0;
  }
}
.ant-table-thead > tr > th, .ant-table-tbody > tr > td{
  padding:0;
}
</style>