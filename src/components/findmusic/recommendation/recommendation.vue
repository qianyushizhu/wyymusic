<template>
  <el-container>
    <el-header height="300px">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <el-image fit="cover" :src="item.imageUrl" @click="playnow(item.targetId)" style="height:300px">
          </el-image>
          <el-tag
            :type="item.typeTitle === '独家' ? 'danger' : 'primary'"
            effect="dark"
            style="position: absolute; top:89%;left: 88%;border-radius: 14px"
          >
            {{ item.typeTitle }}
          </el-tag>
        </el-carousel-item>
      </el-carousel>
    </el-header>

    <el-main>
      <!-- 歌单推荐 -->
      <div class="nkp" @click="skipRecommendMusicList">
        <span>歌单推荐</span>
        <i class="el-icon-d-arrow-right"></i>
      </div>

      <el-row class="czy">
        <el-col
          :span="4"
          v-for="(item, index) in recommendPlayList"
          :key="index"
          
        >
          <el-image
            style="width: 170px; height: 170px;border-radius:10px"
            :src="item.coverImgUrl"
            @click="tomusiclist(item.id)"
          ></el-image>
          <div style="font-size:10px; padding:10px " @click="tomusiclist(item.id)">{{ item.name }}</div>
        </el-col>
      </el-row>
      <!-- 独家放送 -->
      <div class="nkp">
        <span>独家放送</span>
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <el-row :gutter="40" style="margin-top: 25px;">
        <el-col :span="8" v-for="item in xclusiveList" :key="item.id">
          <i
            class="el-icon-video-play"
            style="color: rgba(255,255,255,0.4);font-size: 45px;position: absolute;top: 10px;z-index: 10"
          ></i>
          <el-image
            :src="item.sPicUrl"
            style="box-shadow: 0 0 2px 2px gray;border-radius: 5px;cursor:pointer;"
          ></el-image>
          <h1 style="cursor: pointer ;padding: 10px; color: #fff;">
            {{ item.name }}
          </h1>
        </el-col>
      </el-row>

      <!-- 最新音乐 -->
      <div class="nkp" @click="newmusicclick">
        <span>最新音乐</span>
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <el-row :gutter="20" style="overflow: hidden;">
        <div class="item">
          <el-col
            :span="50"
            v-for="(item, index) in newMusicLIst"
            :key="index"
            style="width:500px; height: 100px;margin-bottom: 20px;"
          >
           <div @click="playnow(item.id)">
              <el-image
              :src="item.picUrl"
              fit="cover"
              style="width:100px;height: 100px;
             
              display: inline-block;border-radius:8px"
            ></el-image>
            <span>
                <img src="~@/assets/img/SQ.svg"  style="position: relative; top:50px ;left: -140px; cursor: pointer; " alt="">
                <img src="~@/assets/img/bofang.svg" style="position: relative; top:27px ;left: -275px; cursor: pointer;" alt="">
              <div class="songname">{{item.name}}</div>
              <div style="color:rgb(102,102,102); position: relative; left: 25px; top:-7px;cursor: pointer;">{{item.song.artists[0].name}}</div>
            </span>
           </div>
          </el-col>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "recommendation",
  data() {
    return {
      bannerList: [],
      recommendPlayList: [],
      xclusiveList: [],
      newMusicLIst: [],

    };
  },
  created() {
    this.getBanner(); //获取轮播图
    this.getRecommendPlayList(); //获取推荐歌单
    this.geteXclusiveList(); //获取独家放送
    this.getNewMusic(); //获取最新音乐
  },

  methods: {
    ...mapActions(['getmusicurl','getmusicinfo']),
    playnow(id){
      this.getmusicurl(id)
      this.getmusicinfo(id)
    },
    tomusiclist(id){
      
    this.$router.push('/musicInfo'+id)
    location.reload()
    
    },
    newmusicclick(){
      this.$router.push('/latest_music')
    },
    getNewMusic() {
      this.$http.get(`personalized/newsong`).then(res => {
        // console.log(res);
        if (res.status !== 200) return this.$message.error("获取最新音乐失败");
        this.newMusicLIst = res.data.result;
      });
    },
    geteXclusiveList() {
      this.$http.get(`/personalized/privatecontent`).then(res => {
        //   console.log(res)
        if (res.status !== 200) return this.$message.error("获取独家放送失败");
        this.xclusiveList = res.data.result;
      });
    },
    skipRecommendMusicList() {
      this.$router.push("/song_list");
    },
    getBanner() {
      this.$http.get(`banner`).then(res => {
        // console.log(res);
        if (res.status !== 200) return this.$message.error("获取轮播图失败");
        this.bannerList = res.data.banners;
      });
    },
    getRecommendPlayList() {
      //获取随机的12条数据
      this.$http
        .get(`/top/playlist`, {
          params: {
            offset: (Math.random() * 1297).toFixed(0) - 12,
            limit: 12
          }
        })
        .then(res => {
          //   console.log(res);
          if (res.status !== 200)
            return this.$message.error("获取推荐歌单失败");
          this.recommendPlayList = res.data.playlists;
          console.log(res.data.playlists)
        });
    }
  }
};
</script>

<style lang="less" scoped>
.nkp {
  margin-top: 30px;
  margin-bottom: 30px;
  span {
    font-size: 20px;
    color: #fff;
  }
  color: #fff;
  cursor: pointer;
}
.czy {
  font-size: 10px;
  color: #fff;
  cursor: pointer;
}
.item {
  position: relative;
  left: 100px;
  span{
      position: relative;
      left: 150px;
      top: -50px;
      font-size: 20px;
      color: #fff;
  }
  .el-col:hover{
      background-color: rgb(59,59,59);
      border-radius: 10px;
  }
  img{
      width: 50px;
      height: 50px;

  }
  .songname{
      position: relative;
      top: -38px;
      cursor: pointer;
  }
 
}
</style>
