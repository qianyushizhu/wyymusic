<template>
  <div class="musicinfo">
    <el-container style="background-color: rgb(43,43,43); height: 2000px;">
      <el-header style="margin-top: 20px;">
        <el-row :gutter="20">
          <el-col :span="5">
            <img :src="musicInfoList.coverImgUrl" style="width: 200px;height: 200px;">
            
          </el-col>
          <el-col :span="16">
            <el-tag effect="plain" type="danger">
              歌单
            </el-tag>
            <span class="qian" style="margin-left: 20px;">{{
              musicInfoList.name
            }}</span>
            <div class="qianyu">
              <span>
                <img
                  :src="musicInfoList.coverImgUrl"
                  fit="cover"
                  style="width: 60px;height: 60px;"
                >
              </span>
              <span>{{ this.nickname }}</span>
              <span>{{ musicInfoList.createTime | time }}</span>
              <span>创建</span>
              <div style="margin-top: 20px; cursor: pointer;">
                <span
                  class="qianjin"
                  style="width: 120px; height: 40px; border-radius:20px; background-color: red; display: inline-block; color:#fff"
                >
                  <img
                    style="width: 20px; position: relative; left: 10px; top:10px"
                    src="~@/assets/img/bofang1.svg"
                    alt=""
                  />
                  <span style="position: relative; top:5.5px">播放全部</span>
                </span>
                <span
                  class="qianjin"
                  style="width: 150px; height: 30px; border-radius:20px; border:1px solid rgb(85,85,85); display: inline-block; color:#fff;position: relative;top:4.7px ;"
                >
                  <img
                    style="width: 20px; position: relative; left: 10px; top:5px"
                    src="~@/assets/img/shouchang.svg"
                    alt=""
                  />
                  <span style="position: relative; top:2px;left: 15px;"
                    >收藏({{ musicInfoList.subscribedCount }})</span
                  >
                </span>
                <span
                  class="qianjin"
                  style="width: 130px; height: 30px; border-radius:20px; border:1px solid rgb(85,85,85); display: inline-block; color:#fff;position: relative;top:4.7px ;"
                >
                  <img
                    style="width: 20px; position: relative; left: 10px; top:5px"
                    src="~@/assets/img/fenxiang.svg"
                    alt=""
                  />
                  <span style="position: relative; top:2px;left: 18px;"
                    >分享({{ musicInfoList.shareCount }})</span
                  >
                </span>
              </div>
              <div>
                <span
                  style="position: absolute;top: 210px;left: 250px; font-size:15px; color:#fff;"
                >
                  标签:
                  <span
                    style="color: rgb(12,115,194);cursor: pointer;position: relative;top:0;left: 0;font-size:15px"
                    v-for="(item, index) in musicInfoList.tags"
                    :key="index"
                    >{{
                      index + 1 === musicInfoList.tags.length
                        ? item
                        : item + " / "
                    }}</span
                  >
                </span>

                <el-collapse
                  style="position: absolute;top: 180px;left: 540px;border: none; "
                >
                  <el-collapse-item
                    :title="
                      '简介: ' +
                        (musicInfoList.description + '').substr(0, 26) +
                        '...'
                    "
                  >
                    <p>{{ musicInfoList.description }}</p>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </el-col>
          <el-col :span="3">
            <div style="position: relative; left: -30px;bottom: -70px;">
              <div class="zhuruyang">
                <span>歌曲数：</span><span>{{ musicInfoList.trackCount }}</span>
              </div>
              <div class="zhuruyang">
                <span>播放量：</span
                ><span
                  >{{ (musicInfoList.playCount / 10000).toFixed(0) }}万</span
                >
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          style="position: relative;top:170px"
        >
          <!-- 这是歌曲列表 -->
          <el-tab-pane label="歌曲列表" name="first">
            <template>
              <el-table
              ref="playtable"
                
                :data="allmusictable"
                style="width: 100%;cursor: pointer;"
                @row-click="seturl"
              >
                <el-table-column class="itemcolor" type="index">
                </el-table-column>
                <el-table-column prop="name" label="音乐标题">
                </el-table-column>
                <el-table-column prop="ar[0].name" label="歌手">
                   <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.ar" :key="index" style="cursor: pointer" @click="gosingertetail(item.id)">
                    {{
                    index === 0 && scope.row.ar.length > 1 && index !== scope.row.ar.length-1
                    ? item.name +'/' : item.name
                    }}
                </span>
            </template>
                </el-table-column>
                <el-table-column prop="al.name" label="专辑"> </el-table-column>
                <el-table-column prop="dt" label="时长"> </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <!-- 这是评论 -->
          <el-tab-pane
            label="评论"
            name="second"
            style="background-color: rgb(43,43,43)"
          >
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="textarea"
              maxlength="120"
              show-word-limit
            >
            </el-input>
            <div
              style=" margin-left: 1060px;margin-top: 20px;width: 60px;height: 30px;font-size:19px;background-color: rgb(43,43,43);border: 1px solid rgb(74,74,74);border-radius:20px;text-align:center;line-height:30px;cursor: pointer;:hover:color:#fff"
            >
              评论
            </div>
            <div>
              <h4 style="font-weight: 300" v-if="queryinfo.offset === 0">
                精彩评论
              </h4>
              <!--精彩评论的信息-->
              <div
                v-for="(item, index) in hotcommentList"
                :key="index"
                style="position: relative;
                padding: 15px 0;font-size: 15px;"
              >
                <div>
                  <!--用户头像-->
                  <img
                    :src="item.user.avatarUrl"
                    alt=""
                    style="display: inline;width: 50px;
                    margin-bottom: 10px;
                    height: 50px;border-radius: 25px;"
                  />

                  <!--评论信息-->
                  <div style="margin-left: 60px;margin-top: -60px;">
                    <p style="padding:10px">
                      <span style="color:rgb(96,171,230)">{{
                        item.user.nickname
                      }}</span
                      >: {{ item.content }}
                    </p>

                    <br v-if="item.beReplied.length > 0" />
                    <!--子评论-->
                    <div
                      v-if="item.beReplied.length > 0"
                      style="padding: 5px 5px;"
                    >
                      <p v-for="(citem, index) in item.beReplied" :key="index">
                        <span style="color: #4d99de;">{{
                          citem.user.nickname
                        }}</span
                        >: {{ citem.content }}
                      </p>
                    </div>

                    <p
                      style="display:block;font-size: 13px;color: gray;opacity: 0.7"
                    >
                      {{ item.time | time }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- 最新评论 -->
              <div>
                <h4 style="font-weight: 300;margin-top: 25px;">
                  最新评论({{ total }})
                </h4>
                <!--所有评论的信息-->
                <div
                  v-for="(item, index) in commentList"
                  :key="index"
                  style="position: relative;
                 padding: 15px 0;font-size: 15px;"
                >
                  <div>
                    <!--用户头像-->
                    <img
                      :src="item.user.avatarUrl"
                      alt=""
                      style="display: inline;width: 50px;height: 50px;border-radius: 25px;margin-bottom: 10px;"
                    />

                    <!--评论信息-->
                    <div style="margin-left: 60px;margin-top: -60px;">
                      <p>
                        <span style="color: #4d99de;padding:10px">{{
                          item.user.nickname
                        }}</span
                        >: {{ item.content }}
                      </p>

                      <br v-if="item.beReplied.length > 0" />
                      <!--子评论-->
                      <div
                        v-if="item.beReplied.length > 0"
                        style="padding: 5px 5px;"
                      >
                        <p
                          v-for="(citem, index) in item.beReplied"
                          :key="index"
                        >
                          <span style="color: #4d99de;"
                            >@{{ citem.user.nickname }}</span
                          >: {{ citem.content }}
                        </p>
                      </div>

                      <p
                        style="display:block;font-size: 13px;color: gray;opacity: 0.7;padding:10px"
                      >
                        {{ item.time | time }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 分页 -->
              <el-pagination
                layout="prev, pager, next"
                :page-size="queryinfo.limit"
                :total="total"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
          <!-- 这是收藏者 -->
          <el-tab-pane label="收藏者" name="third">
            <div
              class="collect"
              v-for="(item, index) in collectorlist"
              :key="index"
            >
              <span><img :src="item.avatarUrl" alt=""/></span>
              <span>{{ item.nickname }}</span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "musicInfo",

  data() {
    return {
      activeName: "first",
      id: this.$route.params.id,
      //获取所有数据
      musicInfoList: [],
      //所有歌曲
      queryids: [],
      nickname: "",
      ids: "",
      allmusictable: [],
      textarea: "",
      commentList: [],
      hotcommentList: [],
      total: 0,
      queryinfo: {
        id: this.$route.params.id,
        limit: 10,
        offset: 0
      },
      collectorlist: [], //收藏者
      musicids: [],
     
    };
  },
  watch: {
    $route: {
      handler() {
        this.id = this.$route.params.id;
        
        this.getMusicInfo();
        this.getmusictable();
        
        // this.getmusictable(this.ids.substring(0, this.ids.length - 1))
        this.getcommentList();
        //深度监听，同时也可监听到param参数变化
      },
      deep: true
    },
  
  },
  created() {
    // this.id = this.$route.params.id;
    this.getMusicInfo();
    // this.getMusicids()
    setTimeout(() => {
      this.getmusictable();
    }, 500);
    

    // this.getmusictable(this.ids.substring(0, this.ids.length - 1))
    this.getcommentList();
  },
  computed: {
    // ...mapState(['musictable'])
  },
  methods: {
    // playall(){
    //     this.getallmusicurl(this.ids.substring(0, this.ids.length - 1))
    //     this.getallmusicinfo(this.ids.substring(0, this.ids.length - 1))
    // },
    // // 导入actions 请求
    ...mapActions(["getmusicurl", "getmusicinfo"]),

    seturl(row) {
      this.getmusicurl(row.id);
      this.getmusicinfo(row.id);
    },
    handleCurrentChange(newpage) {
      this.queryinfo.offset = (newpage - 1) * this.queryinfo.limit;
      this.getcommentList();
    },
      gosingertetail(id){
         this.$router.push('/singerdetail'+id)
    },
    getcommentList() {
      this.$http
        .get(`comment/playlist`, { params: this.queryinfo })
        .then(res => {
          // console.log(res);
          this.hotcommentList = res.data.hotComments;
          this.commentList = res.data.comments;
          this.total = res.data.total;
        });
    },
    handleClick() {},
    getMusicInfo() {
      this.$http
        .get(`/playlist/detail`, { params: { id: this.id } })
        .then(res => {
          // console.log(res.data.playlist);

          this.musicInfoList = res.data.playlist;
          this.nickname = res.data.playlist.creator.nickname;
          this.collectorlist = res.data.playlist.subscribers;
          this.musicids = res.data.playlist.trackIds;
          // this.$forceUpdate(); //重新渲染组件
          // if (res.data.playlist.trackIds) {
          //   res.data.playlist.trackIds.forEach(item => {
          //     // console.log(item)
          //     this.ids += item.id + ",";
          //   });
          // }

          //  console.log(this.ids)
        });
    },
    // getMusicids(){
    //     let ids=''
    //     for (const idss of this.musicids) {
    //         ids+=idss.id+''
    //      }

    //     console.log(idss)
    //   //
    //   // idss=parseInt(idss)
    //   // console.log(this.idss)

    // },
    getmusictable() {
      if (this.musicids) {
        this.musicids.forEach(item => {
          this.ids += item.id + ",";
        });
      }
      this.$http
        .get(`song/detail`, {
          params: { ids: this.ids.substring(0, this.ids.length - 1) }
        })
        .then(res => {
          // console.log(res);
          this.allmusictable = res.data.songs;
          //处理时长数据
          if (this.allmusictable) {
            this.allmusictable.forEach(item => {
              const dt = new Date(item.dt);
              const mm = (dt.getMinutes() + "").padStart(2, "0");
              const ss = (dt.getSeconds() + "").padStart(2, "0");

              item.dt = mm + ":" + ss;
            });
          }
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
.el-tag--plain.el-tag--danger {
  border: 1px solid red;
  background-color: rgb(43, 43, 43);
}
.qian {
  font-size: 25px;
  color: #fff;
}
/deep/ .qianyu {
  margin-top: 20px;
  span:nth-child(2) {
    color: #fff;
    font-size: 18px;
    //  vertical-align: middle;
    //  display: inline-block;
    position: relative;
    top: -20px;
    left: 13px;
  }
  span:nth-child(3) {
    color: #fff;
    position: relative;
    left: 30px;
    top: -20px;
    font-size: 13px;
  }
  span:nth-child(4) {
    color: #fff;
    position: relative;
    left: 38px;
    top: -20px;
    font-size: 15px;
  }
}
/deep/.el-collapse-item__header {
  background-color: rgb(43, 43, 43);
  border-bottom: none;
  color: #fff;
}
/deep/ .el-collapse-item__content {
  background-color: rgb(43, 43, 43);
  color: #fff;
  border-bottom: 1px solid rgb(43, 43, 43);
}
.zhuruyang {
  color: #fff;
  font-size: 20px;
  margin-bottom: 20px;
}
/deep/ .el-menu {
  position: relative;
  top: 170px;
  border-bottom: none;
  left: 30px;
  background-color: rgb(43, 43, 43);
  .el-menu-item.is-active {
    border-bottom: 2px solid rgb(236, 65, 65);
    background-color: rgb(43, 43, 43);
    color: rgb(255, 255, 255);
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu-item {
    font-size: 20px;
    color: rgb(213, 213, 213);
  }
  .el-menu-item:hover {
    background: rgb(43, 43, 43);
    color: rgb(255, 255, 255);
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-main {
  font-size: 20px;
  color: #fff;
}
.qianyulong {
  border-bottom: 3px solid red;
}
/deep/ .el-textarea__inner {
  background-color: rgb(56, 56, 56) !important;
  height: 150px;
  color: #fff;
}
.collect {
  position: relative;
  left: 100px;
  padding: 10px 0;
  cursor: pointer;

  img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
  span:nth-child(2) {
    position: relative;
    top: -37px;
    left: 20px;
  }
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
/deep/.el-table {
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
</style>
