<template>
   <div class="personal-information">
     <h2>个人信息</h2>
     <el-form  label-position="top">
       <el-form-item label="姓名">
         <el-input v-model="personal.name"></el-input>
       </el-form-item>
       <el-form-item label="城市">
         <el-input v-model="personal.city"></el-input>
       </el-form-item>
       <el-form-item label="年龄">
         <el-input v-model="personal.age"></el-input>
       </el-form-item>
     </el-form>
   </div>
</template>

<script>
    export default {
        props:['personal'],

    }
</script>

<style>

</style>
