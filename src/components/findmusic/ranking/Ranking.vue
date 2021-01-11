<template>
  <el-container>
    <el-header>
      <div class="nkp">
        <span>官方榜</span>
        <div style="border-bottom:2px solid rgb(87,87,89); margin-top:20px"></div>
      </div>
    </el-header>
    <el-main>
      <el-row :gutter="10">
        <el-col :span="7" v-for="(item, index) in fiveRankingList" :key="index">
          <el-image :src="item.coverImgUrl" @click="tomusiclist(item.id)"></el-image>
            <div class="qjqj" v-for="(item1,index) in item.tracks" :key="index">
                <span style="margin-right: 10px;">{{index+1}}</span>
                <span>{{item1.first}}</span>
                <span style="float: right;">{{item1.second}}</span>
                
            </div>
        </el-col>
      </el-row>
      <!-- 全球榜 -->
      <div class="nkp">
        <span>全球榜</span>
        <div style="border-bottom:2px solid rgb(87,87,89); margin-top:20px"></div>
        <el-row :gutter="15">
          <el-col :span="5" v-for="(item,index) in RankingList" :key="index">
              <el-image :src='item.coverImgUrl' @click="tomusiclist(item.id)"></el-image>
              <div style="color:#fff; margin-left:50px; padding:7px 0; :hover:#fff" >{{item.name}}</div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Ranking",
  data() {
    return {
      RankingList: [],
      fiveRankingList: []
    };
  },
  created() {
    //获取排行榜的数据
    this.getRankingList();
  },
  methods: {
    tomusiclist(id){
       this.$router.push('/musicInfo'+id)
    location.reload()
    },
    getRankingList() {
      this.$http.get(`toplist/detail`).then(res => {
        console.log(res);
        if (res.status !== 200) return this.$message.error("获取失败");
        this.RankingList = res.data.list;
        //获取前5个数据
        this.fiveRankingList = this.RankingList.splice(0, 4);
        console.log(this.fiveRankingList);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 1500px;
}
.nkp {
  margin-top: 30px;
  margin-bottom: 30px;
 
  span {
    font-size: 25px;
    color: #fff;
  }
}
.el-row {
  cursor: pointer;
  position: relative;
  left: 63px;
  top: 15px;
  .el-image {
    border-radius: 20px;
  }
}
.qjqj{
     color: #fff;
    height: 35px;
    padding-top: 20px;
   
}
.qjqj:hover{
    background-color: rgb(51,51,51);
     border-radius: 15px;
}
</style>
