<template>
  <el-container style="height: 1500px;">
    <el-header>
      <div style="cursor: pointer;color:#fff;margin-bottom: 20px;">
        <span>语种：</span>
        <span
          style="margin-left: 41px;"
          v-for="(item, index) in singerLanguage"
          :key="index"
          :class="{ isactive: index === currentindex }"
          @click="changelanguage(index, item.id)"
          >{{ item.name }}</span
        >
      </div>
      <div style="cursor: pointer; color:#fff">
        <span>分类：</span>
        <span
          style="margin-left: 41px;"
          v-for="(item1, index1) in singerType"
          :key="index1"
          :class="{ isactive: index1 === currentindex2 }"
          @click="changtype(index1, item1.id)"
          >{{ item1.name }}</span
        >
      </div>
    </el-header>
    <el-main>
      <el-row :gutter="10" style="margin-left: 80px;cursor: pointer;">
        <el-col :span="5" v-for="(item, index) in singListInfo" :key="index">
          <div @click="gosingerdetail(item.id)">
              <img
            :src="item.img1v1Url"
            alt=""
            style="width: 200px;height: 200px;box-shadow: 0 0 2px 2px gray;border-radius: 10px;"
          />
          <div style="padding: 10px 0;margin-left: 75px;color:#fff">
            {{ item.name }}
          </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-pagination
    style="position: absolute;top:1050px;left: 370px;"
      background
      layout="prev,next"
      :page-size="queryInfo.limit"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </el-container>
</template>

<script>
export default {
  name: "singer",
  data() {
    return {
      queryInfo: {
        type: -1,
        area: -1,
        limit: 12,
        offset: 0
      },
      singerType: [
        { id: -1, name: "全部" },
        { id: 1, name: "男歌手" },
        { id: 2, name: "女歌手" },
        { id: 3, name: "乐队" }
      ],
      singerLanguage: [
        { id: -1, name: "全部" },
        { id: 7, name: "华语" },
        { id: 96, name: "欧美" },
        { id: 8, name: "日本" },
        { id: 16, name: "韩国" },
        { id: 0, name: "其他" }
      ],
      currentindex: 0,
      currentindex2: 0,
      singListInfo: []
    };
  },
  created() {
    this.getSingerLIst();
  },
  methods: {
      gosingerdetail(id){
          this.$router.push('/singerdetail'+id)
      },
    handleCurrentChange(newpage) {
      this.queryInfo.offset = (newpage - 1) * this.queryInfo.limit;
      this.getSingerLIst();
    },
    changtype(index, id) {
      this.currentindex2 = index;
      // console.log(id)
      this.queryInfo.type = id;
      this.getSingerLIst();
    },
    changelanguage(index, id) {
      this.currentindex = index;

      this.queryInfo.area = id;
      this.getSingerLIst();
      // console.log(id)
      // console.log(this.singListInfo)
    },
    getSingerLIst() {
      this.$http.get(`artist/list`, { params: this.queryInfo }).then(res => {
        // console.log(res)
        this.singListInfo = res.data.artists;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.isactive {
  color: red;
}
</style>
