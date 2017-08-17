<template>
   <div class="personal-information">
     <h2>个人信息</h2>
     <el-form  label-position="top">
       <el-form-item label="姓名">
         <el-input  @input="changes('personal','name',$event)"></el-input>
       </el-form-item>
       <el-form-item label="城市">
         <el-input @input="changes('personal','city',$event)" > </el-input>
       </el-form-item>
       <el-form-item label="年龄">
         <el-input  @input="changes('personal','age',$event)"></el-input>
       </el-form-item>
     </el-form>
   </div>
</template>

<script>
    export default {
      methods:{
        changes(filed,key,value){
           this.$store.commit('changes',{filed,key,value})
        }
      }

    }
</script>

<style>

</style>
