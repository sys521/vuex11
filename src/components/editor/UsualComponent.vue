<template>
    <div class="item">
      <h2>{{title}}</h2>
      <el-form   label-position="top" >
        <div v-for=" (value,index) in items" class="input-ct">
          <el-form-item  v-for="(val,key) in value " v-bind:label="dict[key]"  v-bind:key="1">
            <el-input type="textarea"  :value="vaa(item,index,key)" @input="changes(item,index,key,$event)" v-if="dict[key]=='描述' "></el-input>
            <el-date-picker  :value="vaa(item,index,key)" @input="changes(item,index,key,$event)" type="daterange" placeholder="选择日期范围" v-else-if="dict[key]=='时间'">
            </el-date-picker>
            <el-input :value="vaa(item,index,key)" @input="changes(item,index,key,$event)" v-else></el-input>
          </el-form-item>
          <i class="el-icon-delete" @click="removeItem(item,index)"></i>
          <hr>
        </div>
        <el-button type="primary" @click="addItem(item)">增加</el-button>
      </el-form>
    </div>
</template>

<script>
    import objectPath from 'object-path'

    export default {
        props:['item','dict','title'],

        computed:{
          items:function(){

              return objectPath.get(this.$store.state.resume,this.item)
          },

        },
        methods:{
          vaa:function(item,index,key){
            var arr=[]
            arr.push(item,index,key)
            var path=arr.join('.')
            return objectPath.get(this.$store.state.resume,path)
          },
          addItem:function(item){
            this.$store.commit('add',item)
          },
          removeItem:function(item,index){
            var arr=[]
            arr.push(item,index)
            var path=arr.join('.')
            var playload={
              path:path
            }
            this.$store.commit('remove',playload)
          },
          changes:function(item,index,key,value){
            var arr=[]
             arr.push(item,index,key)
            var path=arr.join('.')
            var playload={
              path:path,
              value:value
            }
            this.$store.commit('changes',playload)
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
