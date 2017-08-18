<template>
    <div id="resumeEditor">
        <nav>
          <li v-for="i in items" v-bind:class="{active:item==i}"  @click="item=i">
            <svg class="icon" aria-hidden="true">
              <use  v-bind:xlink:href=" `#icon-${icons[i]}` "></use>
            </svg>
          </li>
        </nav>
        <ol class="information">
          <li v-bind:class="{show:item==0}" class="personal">
            <PersonalInformation ></PersonalInformation>
          </li>
          <li v-bind:class="{show:item==1}" class="work">
            <UsualComponent v-bind:item=" workexperience"
                            v-bind:dict=" {duration:'时间',company:'公司',job:'职位'}"
                            v-bind:title=" '工作经历'">
            </UsualComponent> <!-- v-bind 将 当前的workexperience绑定给items，子组件能读取到items属性，所以子组件的依赖就是items。-->
          </li>
          <li v-bind:class="{show:item==2}">
            <UsualComponent v-bind:item="studyexperience"
                            v-bind:dict=" {duration:'时间',school:'学校',degree:'学位'}"
                            v-bind:title=" '教育背景'">
            </UsualComponent>
          </li>
          <li v-bind:class="{show:item==3}">
            <UsualComponent v-bind:item="itemprctice"
                            v-bind:dict="{duration:'时间',project:'项目名称',describe:'描述'}"
                            v-bind:title=" '项目实践'">
            </UsualComponent>
          </li>

          <li v-bind:class="{show:item==4}">
            <UsualComponent
                            v-bind:item="evaluation"
                            v-bind:dict="{describe:'描述'}"
                            v-bind:title=" '自我评价'">
            </UsualComponent>
          </li>
          <li v-bind:class="{show:item==5}">
            <Contacts ></Contacts>
          </li>
        </ol>
    </div>
</template>

<script>
  import  PersonalInformation from './editor/Personal-information'
  import UsualComponent from './editor/UsualComponent'
  import Contacts from './editor/Contacts.vue'
    export default {

        components:{ PersonalInformation,UsualComponent,Contacts},
        props:['resume'],
        data: function () {
            return {
                items:[0,1,2,3,4,5],
                item:0,
                icons:['zv1','gongwenbao','yuedu','xiangmu','jiangbei','dianhua'],
                workexperience:'workexperience',
                studyexperience:'studyexperience',
                itemprctice:'itemprctice',
                evaluation:'evaluation'
            }
        },

    }
</script>

<style lang="scss">
  $color:#ccc;
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  #resumeEditor{
    display:flex;
    border:1px solid $color;
    margin-left:8px;
    border-radius:4px;
    box-shadow:0 0 4px $color;

    >nav {
      width:6em;
       background:black;
      >li{
        height:48px;
        margin:16px 0 16px 8px;
         text-align:center;
        line-height:48px;
       vertical-align:middle;
       transition:all 0.3s;

        .icon{
          fill:white;
          font-size:32px;
          vertical-align:middle;
        }
      }

      & .active{
          background:white;
        .icon {
          fill:black;
        }
      }

    }

    >.information {
       flex: 1;
        overflow:auto;
      >li{
        display:none;
        margin-left:32px;
        margin-top:32px;

       }
       & .show{
          display:flex;
         }
        h2 {
          margin-bottom:16px;
        }
     }
  }

</style>
