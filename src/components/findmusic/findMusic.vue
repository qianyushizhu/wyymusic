<template>
  <el-container class="findMusic">
        <el-header height="150px">
            <el-menu tab-position="top" default-active="/recommendation" router mode="horizontal">
      <el-menu-item  index="/recommendation">个性推荐</el-menu-item>
      <el-menu-item  index="/song_list">歌单</el-menu-item>

      <el-menu-item  index="/ranking_list">排行榜</el-menu-item>
      <el-menu-item  index="/singer">歌手</el-menu-item>
      <el-menu-item  index="/latest_music">最新音乐</el-menu-item>
    </el-menu>
        </el-header>

      <el-main>
            <router-view ></router-view>
        </el-main>
  </el-container>
</template>

<script>
export default {
  name: "findMusic",
  
  data() {
    return {
       
    };
  },
  created() {
    // this.getFindMusicInfo(); //获取发现所有数据
    
  },
  methods: {
    // getFindMusicInfo() {
    //   this.$http.get(`/homepage/block/page`).then(res => {
    //     console.log(res);
    //   });
    // },
 
 
  }
};
</script>

<style lang="less" scoped>
.findMusic{
    
    overflow: hidden;
    background-color:rgb(43,43,43);
    .el-menu{
        position: relative;
        top: 50px;
        border-bottom: none;
        left: 290px;
        background-color:rgb(43,43,43);
        .el-menu-item.is-active{
            border-bottom: 2px solid rgb(236,65,65);
             background-color:rgb(43,43,43);
             color: rgb(255,255,255);
        }
       .el-menu.el-menu--horizontal{
            border-bottom: none;
        }
        .el-menu-item{
            font-size: 20px;
            color: rgb(213,213,213);
           
        }
        .el-menu-item:hover{
            background: rgb(43,43,43);
            color: rgb(255,255,255);
        }
    }
}

// /deep/ .el-tabs{
//      position: relative;
//      left: 300px;
//     top: 30px;
//     width: 510px;
//     .el-tabs__item{
//         font-size: 20px;
//         color: rgb(175,175,155);
//         padding-left: 25px;

//     }
//     .el-tabs__item:hover{
//         color: rgb(255,255,255);
//     }
//     .el-tabs__active-bar{
//         background-color: rgb(236,65,65);
//     }
//     .el-tabs__nav-wrap::after{
//         width: 0px;
//     }
    
    
// }
</style>
