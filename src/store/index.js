import axios from 'axios'
import Vue from 'vue'

import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const state = {
  musicUrl: '', //音乐url
  musicinfo: [], //音乐信息
  // isplay: false, //暂停播放
  // audio: null, //audio元素
  musicDuration: 0, // 当前进度条
  totalDuration:0 ,// 总进度条
  // musictable:[]
}
const mutations = {
  setmusicurl(state,paylod) {
    state.musicUrl=paylod
  },
  setmusicinfo(state,paylod) {
    state.musicinfo=paylod
  },
  // setaudio(state, paylod) {
  //   state.audio=paylod
  // },
  // setmusictable(state, paylod) {
  //    //处理时长数据
  //         if (paylod) {
  //           paylod.forEach(item => {
  //             const dt = new Date(item.dt);
  //             const mm = (dt.getMinutes() + "").padStart(2, "0");
  //             const ss = (dt.getSeconds() + "").padStart(2, "0");

  //             item.dt = mm + ":" + ss;
  //           });
  //         }
  //   state.musictable=paylod
  // },
 
  setmusicDuration(state,paylod) {
    state.musicDuration=paylod
  },
   settotalDuration(state,paylod) {
    state.totalDuration=paylod
  }
}    
const actions = {
  getmusicurl(context,id) {
    axios.get(`song/url`, { params: { id: id } }).then(res => {
      // console.log(res)
      context.commit('setmusicurl',res.data.data[0].url)
    })
   
  },
  getmusicinfo(context,id) {
     axios.get(`song/detail`, {params:{ids:id}}).then(res => {
      //  console.log(res)
       context.commit('setmusicinfo',res.data.songs)
    })
  },
  // getmusictable(context,id) {
  //   axios.get(`song/detail`, {
  //         params: { ids: id }
  //       })
  //       .then(res => {
  //         // console.log(res);
  //        context.commit('setmusictable',res.data.songs)
         
  //       });
  // }
  // getallmusicurl(context,ids) {
  //   axios.get(`song/url`, { params: { id: ids } }).then(res => {
  //     console.log(res)
  //     let urls = ''
  //     res.data.data.forEach(element => {
  //       urls+=element.url+','
  //     });
      
  //     context.commit('setmusicurl',urls)
  //   })
  // },
  // getallmusicinfo(context,ids) {
  //    axios.get(`song/detail`, { params: { ids: ids } }).then(res => {
  //     console.log(res)
  //   })
  // }
}
const getters = {
  
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [persistedState ()]
})