<template>
  <div style="background-color: rgb(43,43,43);height: 2500px;">
      <div style="font-size:30px;color:#fff;margin-left: 430px;padding-top: 70px; margin-bottom: 30px;">共找到{{total}}首单曲</div>
      <div>
         <template>
              <el-table
              ref="playtable"
                
                :data="songlist"
                style="width: 100%;cursor: pointer;"
                @row-click="seturl"
              >
                <el-table-column class="itemcolor" type="index">
                </el-table-column>
                <el-table-column prop="name" label="音乐标题">
                </el-table-column>
                <el-table-column label="歌手">
                    <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.artists" :key="index" style="cursor: pointer" @click="gosingertetail(item.id)">
                    {{
                    index === 0 && scope.row.artists.length > 1 && index !== scope.row.artists.length-1
                    ? item.name +'/' : item.name
                    }}
                </span>
                </template>
                </el-table-column>
                <el-table-column prop="album.name" label="专辑"> </el-table-column>
                <el-table-column prop="duration" label="时长"> </el-table-column>
              </el-table>
            </template>
      </div>
       <el-pagination
                layout="prev, pager, next" :page-size="queryInfo.limit"
                :total="songTotal" @current-change="handleCurrentChange">
        </el-pagination>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      queryInfo: {
        keywords: this.$route.params.data,
        limit: 30,
        offset: 0,
        type: 1
      },
      total: 0,
      songlist: []
    };
  },
  created() {
    this.getsearchsonglist();
  },
  methods: {
     ...mapActions(["getmusicurl", "getmusicinfo"]),

    seturl(row) {
      this.getmusicurl(row.id);
      this.getmusicinfo(row.id);
    },
    gosingertetail(id){
         this.$router.push('/singerdetail'+id)
    },
    handleCurrentChange(newpage){
      this.queryInfo.offset = (newpage - 1) * this.queryInfo.limit
                this.getsearchsonglist();
    },
    getsearchsonglist() {
      this.$http.get("/search", { params: this.queryInfo }).then(res => {
        this.songlist = res.data.result.songs;
        this.total = res.data.result.songCount;
        this.songlist.forEach(item => {
          var time = item.duration / 1000;
          var minute = time / 60;
          var minutes = parseInt(minute);
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          var second = time % 60;
          var seconds = Math.round(second);
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          item.duration = `${minutes}:${seconds}`;
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
