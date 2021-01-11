<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="Topbar">
          <!-- 这是头部左边logo -->
          <div class="left">
            <img src="~@/assets/img/wangyiyun.svg" alt="" />
            <span>网易云音乐</span>
          </div>
          <!-- 这是整个头部右边 -->
          <div class="right">
            <!-- 这是头部右边的左边 -->
            <div class="rigth-left">
              <!-- 两个返回按钮 -->
              <i class="el-icon-arrow-left" @click="back"></i>
              <i class="el-icon-arrow-right" @click="go"></i>

              <!-- 搜索框 -->
              <el-input
                @keyup.enter.native="gosonglist"
                placeholder="请输入"
                v-model="topBarInput"
                class="input-with-select"
              >
              </el-input>
              <i class="el-icon-search" @click="gosonglist"></i>

              <!-- 听歌识曲 -->
              <img src="~@/assets/img/tinggeshiqu.svg" alt="" />
            </div>
            <!-- 这是头部右边的右边 -->
            <div class="right-right">
              <span v-if="userInfo === null" @click="login">
                <img src="~@/assets/img/renxiang.svg" alt="" />未登录
              </span>
              <span v-else>
                <img :src="userInfo.avatarUrl" alt="" />
                {{ userInfo.nickname }}
                <span style="cursor: pointer; margin-left:10px" @click="layout"
                  >退出</span
                >
              </span>
            </div>
          </div>
          <!-- 登陆对话框 -->
          <el-dialog
            title="请输入"
            :visible.sync="islogin"
            width="30%"
            @closed="dialoguserinfo"
          >
            <!-- 账号密码表单 -->
            <el-form
              :model="addFrom"
              :rules="addFromRules"
              ref="addRuleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="手机号码" prop="phone">
                <el-input class="input" v-model="addFrom.phone"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  class="input"
                  type="password"
                  v-model="addFrom.password"
                ></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="info" class="button" @click="islogin = false"
                >取 消</el-button
              >
              <el-button class="button" type="success" @click="dialogVisible"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <div class="side">
            <el-menu
              default-active="/findmusic"
              class="el-menu-vertical-demo"
              router
            >
              <el-menu-item-group>
                <el-menu-item class="item" index="/findmusic"
                  >发现音乐</el-menu-item
                >
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item class="item" index="/mv">视频</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item class="item" index="/friends">朋友</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item class="item" index="/live">直播</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item class="item" index="/FW">私人FW</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">创建的歌单</template>
                <el-menu-item
                  class="pzy"
                  style="color: #fff; "
                  v-for="item in userMusicList"
                  :key="item.id"
                  @click="userMusicListInfo(item.id)"
                >
                  <img :src="item.coverImgUrl" alt="" />
                  {{ item.name }}
                </el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group>
                <template slot="title">收藏的歌单</template>
                <el-menu-item> </el-menu-item>
              </el-menu-item-group>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <!-- 这是主体区域 -->

          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer
        style="height: 90px; position: fixed;bottom: 0;padding: 10px 20px; width: 100%;background-color: rgb(33,33,36);z-index: 9999;"
      >
        <el-image
          :src="musicinfo[0].al.picUrl"
          style="width: 72px;height: 100%;cursor: pointer;"
        ></el-image>
        <div style="position: relative; top:-60px;left: 90px;width: 200px;">
          <span style="position: absolute;bottom: -35px;font-size:13px">{{
            musicinfo[0].al.name
          }}</span>
          <span style="">{{ musicinfo[0].name }}</span>
        </div>

        <div class="bofang">
          <!-- 播放部分 -->
          <div>
            <img src="../../assets/img/playmusic/pre.png" alt="" />
          </div>
          <div @click="nowplay">
            <img v-if="isplay" src="~@/assets/img/playmusic/play2.png" alt="" />
            <img v-else src="~@/assets/img/playmusic/play.png" alt="" />
          </div>
          <div>
            <img src="~@/assets/img/playmusic/next.png" alt="" />
          </div>
        </div>
        <!-- 进度条 -->
        <div class="block">
          <span>{{ musicDuration | minutes }}</span>
          <el-slider
            @change="changemusicDuration"
            v-model="musicDuration"
            :max="totalDuration"
            style="width: 400px;"
            :show-tooltip="false"
          ></el-slider>
          <span style="position: absolute; top:0;left: 315px;">{{
            totalDuration | minutes
          }}</span>
        </div>
        <!-- 音量进度条 -->
        <div style="position: absolute;z-index: 999;top:53px;left: 1200px;">
         

          <el-slider
            v-model="musicVolume"
            :show-tooltip="false"
            style="width: 100px"
            @change="musicVolumeChange"
          >
          </el-slider>
        </div>
        <audio class="audio" :src="musicUrl" autoplay ref="audio"></audio>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "home",
  data() {
    // 手机号码验证规则
    const checkPhone = (rule, value, callback) => {
      const regEmail = /^1[34578]\d{9}$/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("手机号码格式错误"));
    };
    return {
      musicVolume: 20,
      musicDuration: 0, // 当前进度条
      totalDuration: 100, // 总进度条
      isplay: false,
      topBarInput: "",
      islogin: false,
      addFrom: {
        phone: "",
        password: ""
      },
      addFromRules: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ]
      },
      userInfo:
        window.localStorage.getItem("userInfo") === "null"
          ? null
          : JSON.parse(window.localStorage.getItem("userInfo")),
      userMusicList: []
    };
  },
  mounted() {
    // this.audio=this.$refs.audio
    // this.setaudio(this.$refs.audio)
    // this.setmusicDuration(this.$refs.audio.currentTime)
    // this.settotalDuration(this.$refs.audio.duration)
    this.setaudioinfo();
  },
  created() {
    if (this.userInfo !== null) {
      this.getUserMUsicList();
    }
  },
  computed: {
    // 导入state
    ...mapState([
      "musicUrl",
      "musicinfo"
      // "isplay"
      // 'audio',
      // 'musicDuration',
      // 'totalDuration'
    ])
  },

  methods: {
    changemusicDuration() {
      let audio = this.$refs.audio;
      if (this.totalDuration === 0) return;
      audio.currentTime = this.musicDuration;
    },
    gosonglist() {
      if (this.topBarInput.trim() !== "") {
        this.$router.push(`/search` + this.topBarInput);
      }
    },
    nowplay() {
      let audio = this.$refs.audio;
      if (this.musicUrl !== "") {
        if (!audio.paused) {
          audio.pause();
          //  this.isplay=false
        } else {
          audio.play();
          //  this.isplay=true
        }
        this.isplay = !this.isplay;
      }
    },
    // ...mapMutations([
    //   // 'setaudio',
    //   'setmusicDuration',
    //   'settotalDuration'
    // ]),
    musicVolumeChange() {
      this.volumeChange(this.musicVolume / 100);
    },
      volumeChange(sum) {
                    let audio = this.$refs.audio;

                audio.volume = sum
            },
            
          
    setaudioinfo() {
      let audio = this.$refs.audio;
      //监听audio的timeUpdate事件
      audio.addEventListener("timeupdate", () => {
        //获取歌曲的总长度 
        this.totalDuration = audio.duration;
        //获取歌曲时间
        this.musicDuration = audio.currentTime;
      });
      this.isplay = true;
    },
    back() {
      this.$router.go(-1);
    },
    go() {
      this.$router.go(1);
    },
    userMusicListInfo(id) {
      this.$router.push("/musicInfo" + id);
      // location.reload();
      // this.$router.go(0)
    },
    // 清空表单信息
    dialoguserinfo() {
      this.$refs.addRuleForm.resetFields();
    },
    //  获取用户歌单
    getUserMUsicList() {
      this.$http
        .get(`/user/playlist`, { params: { uid: this.userInfo.userId } })
        .then(res => {
          // console.log(res);
          this.userMusicList = res.data.playlist;
        });
    },

    // 退出登录
    layout() {
      this.$http.get(`logout`).then(res => {
        console.log(res);
        this.userInfo = null;
        window.localStorage.setItem("userInfo", null);
        this.userMusicList = [];
      });
    },
    // 验证登录
    dialogVisible() {
      this.$refs.addRuleForm.validate(valid => {
        if (!valid) return this.$message.error("请填写正确的信息");
        this.$http
          .get(`/login/cellphone`, { params: this.addFrom })
          .then(res => {
            // console.log(res);
            if (res.status !== 200) return this.$message.error("登录失败");
            // 保存用户的信息
            window.localStorage.setItem("userCookie", res.data.cookie);
            //保存用户信息,退出时删除
            window.localStorage.setItem(
              "userInfo",
              JSON.stringify(res.data.profile)
            );
            this.userInfo = res.data.profile;
            this.islogin = false;
            this.$message.success("登录成功");
          });
      });
    },
    // 登录对话框
    login() {
      this.islogin = true;
    }
  }
};
</script>

<style lang="less" scoped>
.pzy:hover {
  background-color: rgb(51, 51, 51);
}
.audios {
  width: 100%;
}
/deep/ .el-aside {
  width: 250px !important;
  overflow-x: hidden;
}
.el-header {
  height: 80px !important;
  padding-left: 0;
  padding-right: 0;
}
.el-main {
  padding: 0 !important;
}
.el-footer {
}
// 左边导航栏样式
.el-menu {
  border-right: 1px solid rgb(68, 68, 68);
  .el-menu-item.is-active {
    border-right: 2px solid rgb(236, 65, 65);
    background-color: rgb(43, 43, 43);
    color: rgb(255, 255, 255);
  }
}
/deep/ .el-menu-vertical-demo {
  background-color: rgb(43, 43, 43);
  // overflow-y: hidden;

  .item {
    color: rgb(213, 213, 213);
    font-size: 20px;
  }

  .item:nth-child(1):hover {
    background-color: rgb(51, 51, 51);
    color: rgb(255, 255, 255);
  }
  .item:nth-child(2):hover {
    background-color: rgb(51, 51, 51);
    color: rgb(255, 255, 255);
  }
  .item:nth-child(3):hover {
    background-color: rgb(51, 51, 51);
    color: rgb(255, 255, 255);
  }
  .item:nth-child(4):hover {
    background-color: rgb(51, 51, 51);
    color: rgb(255, 255, 255);
  }
  .item:nth-child(5):hover {
    background-color: rgb(51, 51, 51);
    color: rgb(255, 255, 255);
  }
  .item:nth-child(7):hover {
    background-color: rgb(51, 51, 51);
    color: rgb(255, 255, 255);
  }
  .item:nth-child(9):hover {
    background-color: rgb(51, 51, 51);
    color: rgb(255, 255, 255);
  }
  .item:nth-child(1) {
    cursor: pointer;
  }
  .item:nth-child(2) {
    cursor: pointer;
  }
  .item:nth-child(3) {
    cursor: pointer;
  }
  .item:nth-child(4) {
    cursor: pointer;
  }
  .item:nth-child(5) {
    cursor: pointer;
  }
  .item:nth-child(7) {
    cursor: pointer;
  }
  .item:nth-child(9) {
    cursor: pointer;
  }
  .item:nth-child(6) {
    font-size: 10px;
  }
  .item:nth-child(8) {
    font-size: 10px;
  }
}
//  顶部topbar样式
.Topbar {
  position: relative;
  color: #ffffff;
  display: flex;
  height: 80px;
  background-color: rgb(33, 33, 36);
}
img {
  width: 20px;
  height: 20px;
}
.left {
  margin-left: 15px;
  flex: 1;
  line-height: 80px;

  img {
    width: 40px;
    height: 40px;
    margin-top: 20px;
    margin-right: 6px;
  }
  span {
    position: relative;
    top: -13px;
  }
}
.right {
  flex: 1;
  justify-content: space-between;
  display: flex;
  position: relative;
  left: -350px;
  .rigth-left {
    display: flex;
    i {
      cursor: pointer;
      line-height: 80px;
      margin-right: 20px;
    }
    .el-input {
      position: relative;
      top: 20px;
    }

    img {
      position: relative;
      top: 30px;
      left: 10px;
      cursor: pointer;
    }
  }
}
.right-right {
  position: relative;
  line-height: 80px;
  cursor: pointer;
  width: 500px;
  left: 400px;
  margin-left: 10px;
  img {
    width: 30px;
    height: 30px;
    position: relative;
    top: 8px;
    margin-right: 10px;
  }
}
/deep/ .el-icon-search {
  position: relative !important;
  left: -30px;
  top: 0px;
}
/deep/.el-button {
  width: 20px;
  background-color: none;
}
/deep/ .el-input__inner {
  border: none !important;
  border-radius: 10px !important;
  width: 200px !important;
  background-color: rgb(40, 40, 43);
}
/deep/ .el-input__inner:focus {
  border: none;
  outline: none !important;
  border-radius: 10px;
  box-shadow: none;
  transition-duration: 0.5s;
}
.button {
  width: 100px;
  height: 50px;
}
.home {
  overflow: hidden;
}
/deep/.el-footer {
  span {
    color: #fff;
    cursor: pointer;
  }
}
.bofang {
  position: absolute;
  top: 0;
  left: 620px;
  cursor: pointer;
  display: flex;
  img {
    width: 50px;
    height: 50px;
  }
}
.block {
  position: absolute;
  top: 40px;
  left: 500px;
}
</style>
