import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
// const Home = import('../components/home/Home.vue')
import Home from '../components/home/Home.vue'
// const findMusic = import('../components/findmusic/findMusic.vue')
import findMusic from '../components/findmusic/findMusic.vue'
import mv from  '../components/mv/mv.vue'
import FW from  '../components/FW/FW.vue'
import live from  '../components/live/live.vue'
import friends from '../components/friends/friends.vue'
import musicInfo from '../components/musicinfo/musicInfo.vue'
import recommendation from '../components/findmusic/recommendation/recommendation'
import songsList from '../components/findmusic/songslist/songslist'
import Ranking from '../components/findmusic/ranking/Ranking.vue'
import singer from '../components/findmusic/singer/singer'
import newmusic from '../components/findmusic/newmusic/newmusic'
import singerdetail from '../components/findmusic/singerdetail/singerdetail'
import mvdetail from '../components/mv/mvdetail'
import search from '../components/search/search.vue'
const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home,
    redirect:'/findmusic',
    children: [
      {
        path: '/findmusic', redirect:'/recommendation', component: findMusic, children: [
       { path:'/recommendation',component:recommendation},
       { path:'/song_list',component:songsList},
       { path:'/ranking_list',component:Ranking},
       { path:'/singer',component:singer},
       { path:'/latest_music',component:newmusic},
      ]},
      {path: '/mv',component:mv},
      {path: '/FW',component:FW},
      {path: '/live',component:live},
      {path: '/friends',component:friends},
      {path: '/musicInfo:id', component: musicInfo},
      {path: '/singerdetail:id', component: singerdetail},
      {path: '/mvdetail:id', component: mvdetail},
      {path: '/search:data', component: search},
    ]
  },
  
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
