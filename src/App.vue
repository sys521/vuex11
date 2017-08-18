<template>
  <div id="app" v-bind:class="{previewModel:ispreview}">
    <Topbar class="topbar"
            v-on:dopreview="preview"
            v-on:signUp="signUp"
            v-on:logOut="logOut"
            v-bind:currentUser="currentUser"
            v-on:login="login"
            v-on:conserve="conserve">
    </Topbar>
    <div class="main">
      <ResumeEditor class="editor" v-bind:resume="resume"></ResumeEditor>
      <ResumePreview class="preview" v-bind:resume="resume"></ResumePreview>
    </div>
    <el-button v-if="ispreview" class="quit" v-on:click="quitpreview">退出预览</el-button>
    <el-button type="danger" v-if="currentUser.username" class="username">Hello:{{currentUser.username}}</el-button>

  </div>
</template>

<script>
  import Topbar from './components/Topbar.vue'
  import ResumeEditor from './components/ResumeEditor.vue'
  import ResumePreview from './components/ResumePreview.vue'
  import AV from 'leancloud-storage'
  var APP_ID = 'FMFz9Pw9WXHnmLAbrYjP5y0t-gzGzoHsz';
  var APP_KEY = 'yyEhrBwgwqifFaqpQJMtLLrM';

  AV.init({
    appId: APP_ID,
    appKey: APP_KEY
  });
  localStorage.setItem('debug', 'leancloud*');
export default {

  components:{Topbar,ResumeEditor,ResumePreview},
  data:function(){
    return {
      ispreview: false,
      currentUser: {
        username: '',
        uid: ''
      },
      resume:{
        personal:{
          name:'',
          city:'',
          age:''
        },
        workexperience:[{duration:'',company:'',job:''}],
        studyexperience:[{duration:'',school:'',degree:''}],
        itemprctice:[{duration:'',project:'', describe:''}],
        evaluation:[{describe:''}],
        contacts:{qq:'',weixin:'',email:'',phone:''}
      }
    }
  },
  created:function(){
    if(AV.User.current()){
      this.currentUser.username=AV.User.current().attributes.username
      this.currentUser.uid=AV.User.current().id
      var query = new AV.Query('Resume')
      var that=this
      query.find().then(function(resume){
        if(!resume==[]){
          that.resume=resume[0].attributes.resume
          that.resume.id=resume[0].id
        }
      },function(error){
        alert(error)
      })
    }
  },
  methods:{
    preview:function(){
      this.ispreview=true
    },
    quitpreview:function(){
      this.ispreview=false
    },
    login:function(userInformation){
      var that=this
      AV.User.logIn(userInformation.name,userInformation.password).then(function (loginedUser) {
        console.log(loginedUser);
        that.currentUser.username = loginedUser.attributes.username
        that.currentUser.uid = loginedUser.id
        alert('登陆成功')
        var query = new AV.Query('Resume')
        query.find().then(function (resume) {
          console.log(111)
          if (!resume == []) {
            console.log(resume[0].id)
            that.$store.state.resume.id = resume[0].id
            that.$store.state.resume = resume[0].attributes.resume
          };
        },function(error){
          alert(error)
        })
      },function(error){
        alert(error)
      })
    },
    signUp:function(userInformation){           //子组件触发的事件，父组件可以通过v-on 设置形参拿到
      var that=this
      console.log(userInformation)
      var user = new AV.User();
      // 设置用户名
      user.setUsername(userInformation.username);
      // 设置密码
      user.setPassword(userInformation.pass);
      // 设置邮箱
      user.setEmail(userInformation.email);
      if(AV.User.current()){
        AV.User.logOut()
      }
      user.signUp().then(function (loginedUser) {
        that.currentUser.username=loginedUser.attributes.username
        that.currentUser.uid=loginedUser.id
        }, function (error) {
          alert(error)
        })
    },
    logOut:function(){
      AV.User.logOut();
      this.currentUser={username:'',uid:''}
      window.location.reload();
    },
    conserve:function(){
      var that=this
      if(!this.currentUser.username){
        alert('请先登录')
      }else{
        this.SaveOrUpdate()
      }
    },
    saveResume:function(){
      var that=this
      // 声明类型
      var Resume = AV.Object.extend('Resume');
      // 新建对象
      var oldResume = new Resume();
      // 设置名称
      oldResume.set('resume',this.$store.state.resume);
      // 设置优先级
      var acl = new AV.ACL()
      acl.setReadAccess(AV.User.current(),true) // 只有这个 user 能读
      acl.setWriteAccess(AV.User.current(),true) // 只有这个 user 能写
      oldResume.setACL(acl)
      oldResume.save().then(function (todo) {
        that.$store.commit('addId',todo.id)     //为这个数据加上id，登陆的时候可以根据id查找已经保存的数据。
        alert('保存成功')
      }, function (error) {
        console.error(error);
      })
    },
    updateResume:function(){
      let avResume = AV.Object.createWithoutData('Resume', this.$store.state.resume.id)
      avResume.set('resume', this.$store.state.resume)
      avResume.save().then(()=>{
        alert('更新成功')
      })
    },
    SaveOrUpdate:function(){
      console.log(this.$store.state.resume.id)
      if(this.$store.state.resume.id){
        this.updateResume()
      }else{
        this.saveResume()
      }
    }

  }


}
</script>

<style lang="scss">
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  html,body{
    height:100%;
  }
 #app{
    display:flex;
    height:100%;
    flex-direction: column;
    margin:0 24px;
    .topbar{
      height:64px;
      border:1px solid #ccc;
      box-shadow:0 0 4px #ccc;
      border-radius:4px;
      margin:16px 0;
    }
    .main{
      display:flex;
      flex:1;
      .editor {
        width:28em;
      }
      .preview{
        flex:1;
        overflow:auto;
      }
    }
    .username {
      position:fixed;
      top:48px;
      left:40px;
      opacity: 0.4;
    }
 }
  #app.previewModel {

    .topbar {
      display:none;
    }
    .main {
      display:block;
      .editor{
        display:none;
      }
      .preview{
        width:960px;
        margin:20px auto;
      }
    }
    .quit {
      position:fixed;
      bottom:24px;
      right:24px;
    }
  }
</style>
