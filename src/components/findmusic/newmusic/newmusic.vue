<template>
  <el-container style="height:1500px">
    <el-header>
      <span class="span1">语种:</span>
      <span
        v-for="(item, index) in musicType"
        :key="index"
        class="span2"
        :class="{ span3: index === curentindex }"
        @click="tagsClick(index, item.type)"
        >{{ item.name }}</span
      >
    </el-header>
    <!-- 下面是歌曲 -->
    <el-main>
      <el-row :gutter="20" style="overflow: hidden;">
        <div class="item">
          <el-col
            :span="50"
            v-for="(item, index) in NewMusicLIst"
            :key="index"
            style="width:500px; height: 100px;margin-bottom: 20px;"
          >
            <div @click="playallmusic(item.id)">
              <el-image
                :src="item.album.picUrl"
                fit="cover"
                style="width:100px;height: 100px;
             
              display: inline-block;border-radius:8px"
              ></el-image>
              <span>
                <img
                  src="~@/assets/img/SQ.svg"
                  style="position: relative; top:50px ;left: -140px; cursor: pointer; "
                  alt=""
                />
                <img
                  src="~@/assets/img/bofang.svg"
                  style="position: relative; top:27px ;left: -275px; cursor: pointer;"
                  alt=""
                />
                <div class="songname">{{ item.name }}</div>
                <div
                  style="color:rgb(102,102,102); position: relative; left: 25px; top:-7px;cursor: pointer;"
                >
                  {{ item.album.name }}
                </div>
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
  name: "newmuisc",
  data() {
    return {
      queryInfo: {
        type: 0
      },
      // 被点击的选项 默认0
      curentindex: 0,
      //标签数据
      musicType: [
        { type: 0, name: "全部" },
        { type: 7, name: "华语" },
        { type: 96, name: "欧美" },
        { type: 16, name: "韩国" },
        { type: 8, name: "日本" }
      ],
      NewMusicLIst: []
    };
  },
  created() {
    this.getNewMusicLIst();
  },
  methods: {
    ...mapActions(["getmusicurl", "getmusicinfo"]),

    playallmusic(id) {
      this.getmusicurl(id);
      this.getmusicinfo(id);
    },
    //这是点击标签换颜色还有更新数据
    tagsClick(index, type) {
      this.curentindex = index;
      this.queryInfo.type = type;
      this.getNewMusicLIst();
    },
    getNewMusicLIst() {
      this.$http.get("top/song", { params: this.queryInfo }).then(res => {
        console.log(res);
        this.NewMusicLIst = res.data.data;
        console.log(res.data.data);
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
.item {
  position: relative;
  left: 100px;
  span {
    position: relative;
    left: 150px;
    top: -50px;
    font-size: 20px;
    color: #fff;
  }
  .el-col:hover {
    background-color: rgb(59, 59, 59);
    border-radius: 10px;
  }
  img {
    width: 50px;
    height: 50px;
  }
  .songname {
    position: relative;
    top: -38px;
    cursor: pointer;
  }
}
</style>
