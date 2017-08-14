<template>
    <div id="Topbar">
        <div class="logo">Vue for Resume</div>
        <div class="btn">
          <el-button type="success" v-on:click="isSignUp" v-if="!currentUser.uid">注册</el-button>
          <el-button type="success" v-on:click="isLogIn" v-if="!currentUser.uid">登陆</el-button>
          <el-button type="success" v-on:click="isLogOut" v-if="currentUser.uid">登出</el-button>
          <el-button type="success" v-on:click="isConserve" >保存</el-button>
          <el-button type="info" v-on:click="isPreview">预览</el-button>
        </div>
      <el-dialog title="注册" :visible.sync="readySignUp">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="50px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="ext" v-model="ruleForm2.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                                                          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]">
            <el-input v-model="ruleForm2.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="readySignUp = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="登陆" :visible.sync="readyLogin">
        <el-form v-model="loginUser">
          <el-form-item label="用户名">
            <el-input v-model="loginUser.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginUser.password"></el-input>
          </el-form-item>
          <el-button type="primary" @click="doLogIn">登陆</el-button>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      props:['currentUser'],
      data: function () {

        var validatePass = (rule, value, callback)=>{
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        }
        var validatePass2 = (rule, value, callback)=>{
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        }

        return {
          readyLog: false,
          readySignUp: false,
          readyLogin:false,
          loginUser:{
            name:'',
            password:''
          },
          ruleForm2: {
            username:'',
            pass: '',
            checkPass: '',
            email:''
          },
          rules2: {
            username:[{required:true}],
            pass: [
              {required:true,validator: validatePass, trigger: 'blur'}
            ],
            checkPass: [
              {required:true,validator: validatePass2, trigger: 'blur'}
            ],

          }
        }
      },
      methods: {
        isPreview: function () {
          this.$emit('dopreview')
          console.log(this.currentUser)
        },
        isSignUp:function(){
          this.readySignUp=true;
        },
        isLogOut:function(){
          this.$emit('logOut')
        },
        isLogIn:function(){
         this.readyLogin=true
        },
        submitForm(formName) {
          var that=this
          this.$refs[formName].validate((valid)=> {
              if (valid) {
                alert('submit!');
                that.$emit('signUp',that.ruleForm2)
                that.readySignUp=false
              } else {
                console.log('error submit!!');
                return false;
              }
          });
         },
        resetForm(formName) {
             this.$refs[formName].resetFields();
        },
        doLogIn:function(){
          this.readyLogin=false
          this.$emit('login',this.loginUser)
        },
        isConserve:function(){
          this.$emit('conserve')
        }
      }
    }
</script>

<style lang="scss">

  #Topbar {
      display:flex;
      align-items: center;
      justify-content: space-between;

      .logo {
        margin-left:16px;
      }
      .btn{
        margin-right:16px;
        .el-button  {
          margin-right:26px;
        }
      }
  }

</style>
