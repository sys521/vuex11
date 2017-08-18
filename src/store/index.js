/**
 * Created by Administrator on 2017/8/17 0017.
 */

import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'

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
    },
    resumeConfig:{
      workexperience:{duration:'',company:'',job:''},
      studyexperience:{duration:'',school:'',degree:''},
      itemprctice:{duration:'',project:'', describe:''},
      evaluation:{describe:''}
    }
  },

  mutations:{
    changes(state,playload){
      objectPath.set(state.resume,playload.path,playload.value)
    },
    remove(state,playload){
      objectPath.del(state.resume,playload.path)
    },
    add(state,playload){
      var value=objectPath.get(state.resumeConfig,playload)
      objectPath.get(state.resume,playload).push(value)
    },
    addId(state,playload){
      state.resume.id=playload
    }
  }
})

export default store
