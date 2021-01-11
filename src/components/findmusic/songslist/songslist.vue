<template>
  <div class="songslist">
    <el-container>
      <!-- 这是热门标签 -->
      <el-header>
        <span class="span1">热门标签:</span>
        <span
          v-for="(item, index) in songsLIstTags"
          :key="index"
          class="span2"
          :class="{ span3: index === curentindex }"
          @click="tagsClick(index,item.name)"
          >{{ item.name }}</span
        >
      </el-header>
      <!-- 这是所有歌单 -->
      <el-main>
        <el-row class="czy">
          <el-col :span="4" v-for="(item, index) in songsLIst" :key="index">
           <div >
              <el-image
              style="width: 170px; height: 170px; border-radius:10px"
              :src="item.coverImgUrl"
              @click="tolist(item.id)"
            ></el-image>
            <div style="font-size:10px; padding:10px " @click="tolist(item.id)">{{ item.name }}</div>
           </div>
          </el-col>
        </el-row>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="queryInfo.limit"
          @current-change="currentpagechange"
        >
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>


export default {
  name: "songslist",
  data() {
    return {
      songsLIst: [], //获取全部歌单
      queryInfo: {
        cat: "全部",
        limit: 32,
        offset: 0
      },
      //获取全部标签
      songsLIstTags: [],
      curentindex: 0,
      total:0
    };
  },
  created() {
    this.getSongsLIst();
    this.getSongsLIstTags();
  },
  methods: {
   
    tolist(id){
      this.$router.push('/musicInfo'+id)
    location.reload()
    },
   
    //   分页
      currentpagechange(newpage){
          this.queryInfo.offset=(newpage-1)*this.queryInfo.limit
          this.getSongsLIst()
      },
    //点击标签的颜色
    tagsClick(index,newCat) {
      this.curentindex = index;
      this.queryInfo.cat=newCat
      this.getSongsLIst()
    },
    //获取全部歌单
    getSongsLIst() {
      this.$http.get(`/top/playlist`, {params: this.queryInfo}).then(res => {
        console.log(res);
        if (res.status !== 200) return this.$message.error("获取失败");
        this.songsLIst = res.data.playlists;
        this.total=res.data.total
      });
    },
    //获取全部标签
    getSongsLIstTags() {
      this.$http.get(`playlist/hot`).then(res => {
        console.log(res);
        if (res.status !== 200) return this.$message.error("获取失败");
        this.songsLIstTags = res.data.tags;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.songslist {
  height: 1000px;
}
.span1 {
  color: #fff;
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
}
.span2 {
  color: rgb(135, 135, 135);
  padding: 0 20px;
  cursor: pointer;
}
.span2:hover {
  color: #fff;
}
.span3 {
  color: red;
}
.czy {
  font-size: 10px;
  color: #fff;
  cursor: pointer;
}

</style>
