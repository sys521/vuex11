/**
 * Created by Administrator on 2017/8/17 0017.
 */

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

var store=new Vuex.Store({
  state:{
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
  },
    getters:{
      selected(state,{filed,key}){
        return state.resume[filed][key]
      }
    },
  mutations:{
    changes(state,{filed,key,value}){

      state.resume[filed][key]=value    // 不能用state.resume.filed //这样会
    }
  }
})

export default store
