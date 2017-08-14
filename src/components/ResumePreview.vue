<template>
    <div id="resumePreview">
      <div class="layout">
        <header id="personal">
          <div class="xingshi" v-if="resume.personal.name">{{resume.personal.name[0]}}</div>
          <div class="basic" v-if="resume.personal.age && resume.personal.city">
            <h1 class="name" >{{resume.personal.name}}</h1>
            <span class="age" >{{resume.personal.age}}</span><span>|</span><span class="city">{{resume.personal.city}}</span>
          </div>
          <hr>
        </header>
        <div id="contacts" v-if="resume.contacts.qq || resume.contacts.weixin || resume.contacts.email || resume.contacts.phone">
          <h1>contacts</h1>
          <hr>
          <div>qq:{{resume.contacts.qq}}</div>
          <div>微信:{{resume.contacts.weixin}}</div>
          <div>邮箱:{{resume.contacts.email}}</div>
          <div>手机:{{resume.contacts.phone}}</div>
        </div>
        <div class="work-and-study">
          <div id="work">
            <div v-if="hasValue(resume.workexperience)">
              <h2>工作经历</h2>
              <hr>
            </div>
            <div v-for="(value,index) in resume.workexperience" class="workItem">
              <div v-if="isEmpty(value)">
                <div >{{doTime(value.duration)}}</div>
                <span>{{value.company}}</span>
                <span>{{value.job}}</span>
              </div>
            </div>
          </div>
          <div id="education">
            <div v-if="hasValue(resume.studyexperience)">
              <h2>教育背景</h2>
              <hr>
            </div>
            <div v-for="(value,index) in resume.studyexperience" class="workItem">
              <div v-if="isEmpty(value)">
                <div >{{doTime(value.duration)}}</div>
                <span>{{value.school}}</span>
                <span>{{value.degree}}</span>
              </div>
            </div>
          </div>
        </div>
        <div id="itempractice">
          <div class="item">
            <div v-if="hasValue(resume.itemprctice)">
              <h2>项目实践</h2>
            </div>
            <div v-for="(value,index) in resume.itemprctice" class="project">
              <div v-if="isEmpty(value)">
                <div  class="circle">
                  <h2>{{times[index]}}</h2>
                </div>
                <div class="text-layout">
                  <h3>{{doTime(value.duration)}}</h3>
                  <h4>{{value.project}}</h4>
                  <p>{{value.describe}}</p>
                </div>
              </div>
          </div>
        </div>

        </div>
          <div id="evaluation">
            <div class="item">
              <div v-if="hasValue(resume.evaluation)">
                <h2>自我评价</h2>
                <hr/>
              </div>
              <div v-for="(value,index) in resume.evaluation" >
                <div v-if="isEmpty(value)" class="evaluation-text">{{value.describe}}
                </div>
              </div>
          </div>
        </div>
       </div>
    </div>

</template>

<script>
    export default {
      props: ['resume'],
      data: function () {
        return {
          times:['first','second','third','fouth','fifth','sixth','seventh','eighth','ninth','tenth']
        }
      },
      methods:{
        isEmpty:function(obj){
          for(let i in obj){
            if(!obj[i]){
              return false
            }
          }
          return true;
        },
        doTime:function(time){
          var timeline= time[0].toLocaleDateString()+ ' --- '+time[1].toLocaleDateString()
          return timeline
        },
        hasValue:function(arr){
        for(let i=0;i<arr.length;i++){
            for(let j in arr[i]){
              if(arr[i][j]){
                return true;
              }
            }
          }
          return false
        },

      }
    }

</script>

<style lang="scss">
  #resumePreview{
    border:1px solid #ccc;
    margin:0 16px;
    border-radius:4px;
    box-shadow:0 0 4px #ccc;
  }
  .layout{
    position:relative;
    margin:32px;
  }
  #personal {

    margin:108px 72px 108px 72px;
    display:flex;
    align-items:center;
    >.xingshi {
        width:100px;
        height:100px;
        border:1px solid transparent;
        border-radius:50%;
        background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
        line-height:100px;
        text-align:center;
        font-size:60px;
        color:white;
     }
     >.basic{
         margin-left:24px;
        letter-spacing: 0.5em;
        text-align:center;
        >.name{
          margin-bottom:8px;
         }
      }
  }
  #contacts{
    width:200px;
    position:absolute;
    top:-56px;
    right:0;
    >div {
      margin:16px;
     }
  }
  .work-and-study:after{
    display:block;
    content:'';
    clear:both;
  }
  #work {
    float:left;
    width:40%;
    h2 {
      margin-left:40px;
      margin-bottom:10px;
    }
    .workItem {
      margin:20px 40px;
    }
    .workItem div{
    margin-bottom:10px;
   }
    .workItem span {
      margin-right:40px;
      margin-top:10px;
    }
  }
  #education {
      float:right;
      width:40%;
    h2 {
      margin-left:40px;
      margin-bottom:10px;
    }
    .workItem {
      margin:20px 40px;
    }
    .workItem div{
      margin-bottom:10px;
    }
    .workItem span {
      margin-right:40px;
    }
  }
  .workItem>div:before{
    width:6px;
    height:6px;
    display:block;
    content:'';
    border:6px solid #ccc;
    border-radius:50%;
    float:left;
    margin-left:-32px;
  }
  #itempractice {
    width:100%;
    margin-top:24px;
  >.item h2{
     text-align:center;
   }
    .project {
      width:50%;
      position:relative;
      left:50%;
      margin:40px 0;

        &:after{
          display:block;
          content:'';
          clear:both;
         }
      .circle{
        width:80px;
        height:80px;
        text-align:center;
        line-height:80px;
        border:1px solid green;
        border-radius:50%;
        background:green;
        color:white;
        float:left;
        transform:translate(-50%,0);
      }
      .text-layout{
        position:absolute;
        width:80%;
        margin-left:100px;
        word-break:break-all;
      }
    }
    .item .project:nth-child(odd) .text-layout{

      position:absolute;
      left:-80%;
      margin-left:-100px;
      text-align:right;
    }

  }
  #evaluation {
    margin-top:40px;
    hr {
      margin-top:20px;
    }
    .evaluation-text{
      word-break: break-all;
      margin-top:20px;
    }

  }


</style>
