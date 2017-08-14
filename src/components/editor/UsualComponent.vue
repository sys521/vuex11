<template>
    <div class="item">
      <h2>{{title}}</h2>
      <el-form   label-position="top" >
        <div v-for=" (item,index) in items" class="input-ct">
          <el-form-item  v-for="(val,key) in firstItem" v-bind:label="dict[key]"  v-bind:key="1">
            <el-input type="textarea" v-model="item[key]" v-if="dict[key]=='描述'"></el-input>
            <el-date-picker v-model="item[key]" type="daterange" placeholder="选择日期范围" v-else-if="dict[key]=='时间'">
            </el-date-picker>
            <el-input v-model="item[key]" v-else></el-input>
          </el-form-item>
          <i class="el-icon-delete" @click="removeItem(index)"></i>
          <hr>
        </div>
        <el-button type="primary" @click="addItem">增加</el-button>
      </el-form>
    </div>
</template>

<script>
    export default {
        props:['items','dict','title'],
        computed:{
          firstItem:function(){
            return this.items[0]
          }

        },
        methods:{
          addItem:function(){
            let obj={},key=0
            for(key in this.dict){
              obj[key]=''
            }
            this.items.push(obj)
          },
          removeItem:function(index){
            this.items.splice(index,1)
          }
        },
    }
</script>

<style lang="scss">
  .item{

    flex:0.8;
    .input-ct{
      margin-bottom:32px;
      position:relative;

      >hr{
         color:#ccc;
       }

      >i{
         position:absolute;
         top:0;
         right:0;
       }
    }

  }
</style>
