<template>
  <div class="contacts-information">
    <h2>联系方式</h2>
    <el-form  label-position="top">
      <el-form-item label="QQ">
        <el-input  :value="vaa('qq')" @input="changes('contacts.qq',$event)"></el-input>
      </el-form-item>
      <el-form-item label="微信">
        <el-input :value="vaa('weixin')" @input="changes('contacts.weixin',$event)"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input :value="vaa('email')" @input="changes('contacts.email',$event)"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input :value="vaa('phone')"   @input="changes('contacts.phone',$event)"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    methods:{
      vaa:function(index){
        console.log(index)
        return this.$store.state.resume.contacts[index]
      },
      changes(path,$event){
        console.log(path)
        var playload={
          path:path,
          value:$event
        }
        this.$store.commit('changes',playload)
      }
    }

  }
</script>

<style>

</style>

