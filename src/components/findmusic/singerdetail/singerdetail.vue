<template>
  <el-container style="background-color: rgb(43,43,43);height: 4000px;">
    <el-header height="400px" style="margin-top: 20px;">
      <el-row>
        <el-col :span="8">
          <img :src="img1v1Url" alt="" style="width: 350px;height: 350px;" />
        </el-col>

        <el-tag effect="plain" type="danger" style="margin-right: 20px;">
          歌手
        </el-tag>
        <span style="color:#fff;font-size:20px">{{ name }}</span>

        <div style="color:#fff; margin-top: 80px;font-size:18px">
          <div style="margin-bottom: 30px;">
            <i class="el-icon-headset" style="margin-right: 10px;"></i>
            <span>单曲数：{{ musicSize }}</span>
          </div>
          <div style="margin-bottom: 30px;">
            <i class="el-icon-first-aid-kit" style="margin-right: 10px;"></i>
            <span>专辑数：{{ albumSize }}</span>
          </div>
          <div>
            <i class="el-icon-video-play" style="margin-right: 10px;"></i>
            <span>MV数： {{ mvSize }}</span>
          </div>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <el-tabs v-model="activeName">
        <!-- 这是专辑模块 ------------------------------------------>
        <el-tab-pane label="专辑" name="first">
          <img
            src="~@/assets/hotsong.png"
            style="width: 300px;height: 300px;margin-top: 30px;margin-left: 30px;"
            alt=""
          />
          <div style="position: relative;top:-300px;left: 400px;">
            <div style="font-size:20px;color:#fff">热门50首</div>
            <template>
              <el-table
              @row-click="seturl"
                ref="playtable"
                highlight-current-row
                :show-header="false"
                :data="hotsongs50.slice(0, defalut)"
                style="width: 50%;cursor: pointer;margin-top: 25px;"
              >
                <el-table-column class="itemcolor" type="index">
                </el-table-column>

                <el-table-column>
                  <i
                    class="el-icon-star-off"
                    style="font-size: 18px;cursor: pointer"
                  ></i>
                  <i
                    class="el-icon-download"
                    style="margin-left: 20px;font-size: 18px;cursor:pointer;"
                  ></i>
                </el-table-column>

                <el-table-column prop="name"> </el-table-column>
                <el-table-column prop="dt"> </el-table-column>
              </el-table>
              <p
                v-show="defalut === 10"
                @click="allmusic"
                style="color:#fff;position: relative;left: 330px;cursor: pointer;"
              >
                查看全部50首>
              </p>
            </template>
          </div>
          <!-- 专辑 -->
          <div style="position: relative;top: -150px;left: 200px;">
            <el-row v-for="(item, index) in allmusicinfo" :key="index">
              <el-col :span="8">
                <img
                  :src="item.album.picUrl"
                  alt=""
                  style="width: 200px;height: 200px;margin-top: 30px;margin-left: 30px;"
                />
                <div
                  style="color:#fff;margin-left: 100px;position: relative;top:15px"
                >
                  {{ item.album.publishTime | date }}
                </div>
              </el-col>
              <el-col :span="12">
                <el-table
                @row-click="seturl"
                  ref="playtable"
                  highlight-current-row
                  :show-header="false"
                  :data="item.songs"
                  style="width: 50%;cursor: pointer;margin-top: 25px;"
                >
                  <el-table-column class="itemcolor" type="index">
                  </el-table-column>

                  <el-table-column>
                    <i
                      class="el-icon-star-off"
                      style="font-size: 18px;cursor: pointer"
                    ></i>
                    <i
                      class="el-icon-download"
                      style="margin-left: 20px;font-size: 18px;cursor:pointer;"
                    ></i>
                  </el-table-column>

                  <el-table-column prop="name"> </el-table-column>
                  <el-table-column prop="dt"> </el-table-column>
                </el-table>
              </el-col>
              <div style="border-bottom:1px solid #fff"></div>
            </el-row>
            <el-pagination
              background
              layout="prev,next"
              :page-size="queryinfo.limit"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <!-- 这是MV模块------------------------------------------- -->
        <el-tab-pane label="MV" name="second">
          <div style="margin-top: 30px;margin-left: 60px;">
            <el-row style="margin-bottom: 30px;">
              <el-col
                :span="8"
                v-for="(item, index) in allmvlist"
                :key="index"
                style="padding: 20px 0;"
              >
                <img
                @click="gomvdetail(item.id)"
                  :src="item.imgurl"
                  alt=""
                  style="width: 300px;height: 180px;
                  cursor: pointer;
                  box-shadow: 0 0 2px 2px gray;border-radius: 10px;"
                />
                <div
                @click="gomvdetail(item.id)"
                  style="position: relative;top: 20px;cursor: pointer;color:#fff"
                >
                  {{ item.name }}
                </div>
              </el-col>
            </el-row>
            <el-pagination
              background
              layout="prev,next"
              :page-size="queryInfo.limit"
              @current-change="handleCurrentChange1"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <!-- 歌手详情 --------------------------------->
        <el-tab-pane label="歌手详情" name="third">
          <div>
            <div
              style="font-size:25px;color:rgb(208,208,208);margin-bottom: 15px;margin-top: 15px;"
            >
              个人简介
            </div>
            <p
              style="text-indent:2em;font-size:18px;color:rgb(135,135,135);line-height:30px"
            >
              {{ briefDesc }}
            </p>
          </div>
          <div v-for="(item, index) in singerdec" :key="index">
            <div
              style="font-size:25px;color:rgb(208,208,208);margin-bottom: 15px;margin-top: 15px;"
            >
              {{ item.ti }}
            </div>
            <p
              style="text-indent:2em;font-size:18px;color:rgb(135,135,135);line-height:30px"
            >
              {{ item.txt }}
            </p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="相似歌手" name="fourth">
          <el-row style="padding: 20px;margin-left: 50px; cursor: pointer;">
            <el-col :span="5" v-for="(item, index) in simiartist" :key="index">
              <img
                @click="godetail(item.id)"
                :src="item.img1v1Url"
                alt=""
                style="width: 200px;height: 200px;box-shadow: 0 0 2px 2px gray;border-radius: 10px;"
              />
              <div
                @click="godetail(item.id)"
                style="padding: 10px 0;margin-left:50px;color:#fff;font-size:17px"
              >
                {{ item.name }}
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      id: this.$route.params.id,
      singerdetaillist: [],
      activeName: "first",
      img1v1Url: "",
      name: "",
      musicSize: "",
      albumSize: "",
      mvSize: "",
      hotsongs50: [],
      defalut: 10,
      queryinfo: {
        id: this.$route.params.id,
        limit: 4,
        offset: 0
      },
      albumlist: [],
      allmusicinfo: [],
      queryInfo: {
        id: this.$route.params.id,
        limit: 9,
        offset: 0
      },
      allmvlist: [],
      briefDesc: "",
      singerdec: [],
      simiartist: []
    };
  },
  created() {
    this.getalldetail(); //获取歌手详情
    this.getalbumlist(); //获取专辑
    this.getsingermv(); //获取mv
    this.getsingerdec(); //获取详细经历
    this.getsimiartist(); //获取相似歌手
  },
  watch: {
    $route: {
      handler() {
        this.id = this.$route.params.id;

        this.getalldetail(); //获取歌手详情
        this.getalbumlist(); //获取专辑
        this.getsingermv(); //获取mv
        this.getsingerdec(); //获取详细经历
        this.getsimiartist(); //获取相似歌手
        //深度监听，同时也可监听到param参数变化
      },
      deep: true
    }
  },
  methods: {
    gomvdetail(id){
      this.$router.push(`/mvdetail`+id)
      
    },
       ...mapActions(["getmusicurl", "getmusicinfo"]),

    seturl(row) {
      this.getmusicurl(row.id);
      this.getmusicinfo(row.id);
    },
    godetail(id) {
      this.$router.push("/singerdetail" + id);
      this.getalldetail();
    },
    getsimiartist() {
      this.$http.get(`/simi/artist`, { params: { id: this.id } }).then(res => {
        console.log(res);
        this.simiartist = res.data.artists;
      });
    },
    getsingerdec() {
      this.$http.get(`artist/desc`, { params: { id: this.id } }).then(res => {
        console.log(res);
        this.briefDesc = res.data.briefDesc;
        this.singerdec = res.data.introduction;
      });
    },
    handleCurrentChange1(newpage) {
      this.queryInfo.offset = (newpage - 1) * this.queryInfo.limit;
      this.getsingermv();
    },
    getsingermv() {
      this.$http.get(`artist/mv`, { params: this.queryInfo }).then(res => {
        // console.log(res);
        this.allmvlist = res.data.mvs;
      });
    },
    handleCurrentChange(newpage) {
      this.queryinfo.offset = (newpage - 1) * this.queryinfo.limit;
      this.getalbumlist();
    },
    getalbumlist() {
      this.$http.get("artist/album", { params: this.queryinfo }).then(res => {
        // console.log(res);
        this.albumlist = res.data.hotAlbums;
        this.albumlist.forEach(item => {
          this.$http.get(`album`, { params: { id: item.id } }).then(res => {
            // console.log(res);
            res.data.songs.forEach(item => {
              const dt = new Date(item.dt);
              const mm = (dt.getMinutes() + "").padStart(2, "0");
              const ss = (dt.getSeconds() + "").padStart(2, "0");

              item.dt = mm + ":" + ss;
            });
            this.allmusicinfo.push(res.data);
          });
        });
      });
    },
    allmusic() {
      this.defalut = 50;
    },
    getalldetail() {
      this.$http.get(`artists`, { params: { id: this.id } }).then(res => {
        // console.log(res);
        this.singerdetaillist = res.data;
        this.hotsongs50 = res.data.hotSongs;
        //处理时长数据
        this.hotsongs50.forEach(item => {
          const dt = new Date(item.dt);
          const mm = (dt.getMinutes() + "").padStart(2, "0");
          const ss = (dt.getSeconds() + "").padStart(2, "0");

          item.dt = mm + ":" + ss;
        });
        this.img1v1Url = res.data.artist.img1v1Url;
        this.name = res.data.artist.name;
        this.musicSize = res.data.artist.musicSize;
        this.albumSize = res.data.artist.albumSize;
        this.mvSize = res.data.artist.mvSize;
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
  font-size: 20px;
}
/deep/.el-tabs__active-bar {
  background-color: red;
}
/deep/.el-tabs__item:hover {
  color: #fff;
}
/deep/.el-table th,
.el-table tr {
  background-color: rgb(46, 46, 46);
}
/deep/.el-table__row {
  background-color: rgb(43, 43, 43);
}
/deep/.el-table__row:hover {
  background-color: rgb(55, 55, 55);
}
/deep/.el-table td,
.el-table th.is-leaf {
  border-bottom: none;
}

/deep/.el-table__body tr:hover > td {
  background-color: rgb(55, 55, 55) !important;
}
/deep/.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: rgb(43, 43, 43);
}
</style>
