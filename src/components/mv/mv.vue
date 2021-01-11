<template>
  <div class="mv" style="height: 2000px;background-color: rgb(43,43,43);">
    <el-tabs v-model="activeName">
      <el-tab-pane label="视频" name="first">
        <div
          @click="showTagDialog"
          style="width: 80px;height: 30px;border:1px solid rgb(74,74,74);border-radius:12px;margin-top: 20px;margin-left: 20px;line-height:30px;text-align:center;cursor: pointer;color:#fff"
        >
          全部分类
        </div>
        <el-row :gutter="10" style="margin-left: 100px;color:#fff">
          <el-col
            :span="5"
            v-for="(item, index) in videoList"
            style="margin-top: 20px;position:relative;"
            :key="index"
          >
            <!--播放量-->
            <div
              style="background: rgba(128,128,128,0.2);color: white;
                                    width: 96%;position:absolute;z-index: 10;"
            >
              <div style="float:right;">
                <i class="el-icon-headset" style="margin-right: 5px;"></i>
                {{
                  item.data.playTime >= 10000
                    ? (item.data.playTime / 10000).toFixed(0) + "万"
                    : item.data.playTime
                }}
              </div>
            </div>

            <div @click="gomvdetail(item.data.vid)">
              <el-image
                :src="item.data.coverUrl"
                style="box-shadow: 0 0 2px 2px gray;border-radius: 10px;cursor: pointer"
              >
              </el-image>
            </div>

            <h1 style="cursor:pointer;" @click="gomvdetail(item.data.vid)">
              {{ item.data.title }}
            </h1>
          </el-col>
        </el-row>
        <el-pagination
          background
          layout="prev, next"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-tab-pane>
      <!-- mv界面 ---------------------------->
      <el-tab-pane label="MV" name="second">
        <el-container style="height: 2000px;">
          <el-header>
            <div style="margin-top: 30px;color:#fff;">
              <div class="item">
                <span>地区：</span
                ><span
                  v-for="(item, index,) in areas"
                  :key="index"
                  style="margin-left: 20px;cursor: pointer;"
                  @click="itemclick1(index, item.id,item.name)"
                  :class="{ active2: index === currentindex2 }"
                  >{{ item.name }}</span
                >
              </div>
              <div class="item">
                <span>分类：</span
                ><span
                  v-for="(item1, index1) in types"
                  :key="index1"
                  style="margin-left: 20px;cursor: pointer;"
                  @click="itemclick2(index1, item1.id,item1.name)"
                  :class="{ active2: index1 === currentindex3 }"
                  >{{ item1.name }}</span
                >
              </div>
              <div class="item">
                <span>排序：</span
                ><span
                  v-for="(item2, index2) in order"
                  :key="index2"
                  style="margin-left: 20px;cursor: pointer;"
                  @click="itemclick3(index2, item2.id,item2.name)"
                  :class="{ active2: index2 === currentindex4 }"
                  >{{ item2.name }}</span
                >
              </div>
            </div>
          </el-header>
          <el-main>
            <el-row :gutter="10" style="color:#fff;margin-top: 30px;">
              <el-col
                :span="4"
                v-for="(item, index) in mvlist"
                style="margin-top: 20px;position:relative;"
                :key="index"
              >
                <div>
                  <el-image
                  @click="gomvdetail(item.id)"
                    :src="item.cover"
                    
                    style="box-shadow: 0 0 2px 2px gray;border-radius: 10px;cursor: pointer"
                  >
                  </el-image>
                </div>
                <!--播放量-->
                <div
                  style="background: rgba(128,128,128,0.2);color: white;
                                    width: 96%;position:absolute;top:0;z-index: 10;"
                >
                  <div style="float:right;">
                    <i class="el-icon-headset" style="margin-right: 5px;"></i>
                    {{
                      item.playCount >= 10000
                        ? (item.playCount / 10000).toFixed(0) + "万"
                        : item.playCount
                    }}
                  </div>
                </div>

                <h1  style="cursor:pointer;" @click="gomvdetail(item.id)">
                  {{ item.name }}
                </h1>
              </el-col>
            </el-row>
            <!--分页-->
            <el-pagination
            style="margin-top: 10px;"
              background
              layout="prev,next"
              :page-size="queryInfo.limit"
              @current-change="handleCurrentChange1"
            >
            </el-pagination>
          </el-main>
        </el-container>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="tagDialogTableVisible" width="50%">
      <el-tag
        effect="dark"
        @click="tagclick(index, item.id)"
        type="info"
        v-for="(item, index) in tags"
        :key="index"
        style="margin-left: 5px;margin-bottom: 5px;width: 80px;cursor: pointer;"
        :class="{ active: index === currentindex }"
        >{{ item.name }}</el-tag
      >
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "mv",
  data() {
    return {
      currentindex: 0,
      tags: [],
      activeName: "first",
      tagDialogTableVisible: false,
      //查询视频条件
      queryInfo: {
        id: 58100,
        offset: 0
      },
      //视频列表
      videoList: [
        {
          data: {
            title: ""
          }
        }
      ],
      // 这是mv的数据--------------
      queryinfo: {
        type: "全部",
        area: "全部",
        order: "上升最快",
        limit: 12,
        offset: 0
      },
      types: [
        { id: -1, name: "全部" },
        { id: 1, name: "官方版" },
        { id: 2, name: "原生" },
        { id: 3, name: "现场版" },
        { id: 4, name: "网易出品" }
      ],
      areas: [
        { id: -1, name: "全部" },
        { id: 7, name: "内地" },
        { id: 96, name: "港台" },
        { id: 8, name: "欧美" },
        { id: 16, name: "日本" },
        { id: 0, name: "韩国" }
      ],
      order: [
        { id: 1, name: "上升最快" },
        { id: 2, name: "最热" },
        { id: 3, name: "最新" }
      ],
      mvlist: [],
      currentindex2: 0,
      currentindex3: 0,
      currentindex4: 0
    };
  },
  created() {
    //获取视频标签
    this.getVideoTags();
    //获取视频信息
    this.getVideoList();
    this.getmvlist();
  },
  methods: {
    gomvdetail(id){
      this.$router.push(`/mvdetail`+id)
    },
    handleCurrentChange1(newPage){
       this.queryinfo.offset = (newPage - 1) * this.queryinfo.limit
                this.getmvlist();
    },
    itemclick1(index, id,name) {
      this.currentindex2 = index;
      this.queryinfo.area=name
      this.getmvlist()
      // console.log(id);
    },
    itemclick2(index, id,name) {
      this.currentindex3 = index;
      this.queryinfo.type=name
      this.getmvlist()
      // console.log(id);
    },
    itemclick3(index, id,name) {
      this.currentindex4 = index;
      this.queryinfo.order=name
      this.getmvlist()
      // console.log(id);
    },
    getmvlist() {
      this.$http.get("/mv/all", { params: this.queryinfo }).then(res => {
        console.log(res);
        this.mvlist = res.data.data;
      });
    },
    handleCurrentChange() {
      this.queryInfo.offset += 10;
      this.getVideoList();
    },
    tagclick(index, id) {
      this.currentindex = index;
      console.log(id);
    },
    getVideoTags() {
      this.$http.get("video/group/list").then(res => {
        this.tags = res.data.data;
        console.log(this.tags);
      });
    },
    showTagDialog() {
      this.tagDialogTableVisible = true;
    },
    getVideoList() {
      this.$http.get("video/group", { params: this.queryInfo }).then(res => {
        this.videoList = res.data.datas;
        console.log(this.videoList);
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .el-tag {
  width: 60px;
  text-align: center;
  font-size: 13px;
}
/deep/.el-tag--plain.el-tag--danger {
  border: 1px solid red;
  background-color: rgb(43, 43, 43);
}
/deep/ .el-tabs__item.is-active {
  color: rgb(213, 213, 213);
}
/deep/ [data-v-97692f52] .el-tabs__item.is-active {
  color: #ffffff;
}
/deep/.el-tabs__item {
  color: rgb(213, 213, 213);
  font-size: 30px;
}
/deep/.el-tabs__active-bar {
  background-color: red;
}
/deep/.el-tabs__item:hover {
  color: #fff;
}
/deep/.el-tabs__nav-scroll {
  position: relative;
  left: 40%;
}
/deep/.el-tabs__nav-wrap {
  position: relative;
  top: 20px;
}
/deep/.el-tabs__nav-wrap::after {
}
.active {
  color: rgb(33, 33, 36) !important;
}
.item {
  margin-bottom: 10px;
}
.active2 {
  color: red;
}
</style>
