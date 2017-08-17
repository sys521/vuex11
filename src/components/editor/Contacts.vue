<template>
  <div class="contacts-information">
    <h2>联系方式</h2>
    <el-form  label-position="top">
      <el-form-item label="QQ">
        <el-input @input="changes('contacts','qq',$event)"></el-input>
      </el-form-item>
      <el-form-item label="微信">
        <el-input @input="changes('contacts','weixin',$event)"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input @input="changes('contacts','email',$event)"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input @input="changes('contacts','phone',$event)"></el-input>
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

