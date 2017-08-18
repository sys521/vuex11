<template>
   <div class="personal-information">
     <h2>个人信息</h2>
     <el-form  label-position="top">
       <el-form-item label="姓名">
         <el-input  :value="vaa('name')" @input="changes('personal.name',$event)"></el-input>
       </el-form-item>
       <el-form-item label="城市">
         <el-input :value="vaa('city')"  @input="changes('personal.city',$event)" > </el-input>
       </el-form-item>
       <el-form-item label="年龄">
         <el-input :value="vaa('age')" @input="changes('personal.age',$event)"></el-input>
       </el-form-item>
     </el-form>
   </div>
</template>

<script>
    export default {
      methods:{
        vaa(index){
          return this.$store.state.resume.personal[index]
        },
        changes(path,value){
            var playload={
              path:path,
              value:value
            }
           this.$store.commit('changes',playload)
        }
      }

    }
</script>

<style>

</style>
