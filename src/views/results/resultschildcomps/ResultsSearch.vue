<template>
  <div class="results-search">
    <div class="top">
      <el-input v-model="sporterName" clearable placeholder="请输入您想搜索的运动员"></el-input>
      <el-input v-model="sportsName" clearable placeholder="请输入您想搜索的体育项目"></el-input>
      <el-date-picker
          v-model="times"
          type="date"
          value-format="yyyy-MM-dd"
          @change="changeTime"
          placeholder="请输入您想搜索的比赛时间"></el-date-picker>
          <el-button type="warning" @click="search">搜索</el-button>
          <el-button type="danger" @click="reset">重置</el-button>
    </div>
    <div class="bottom">
      <template>
        <el-table
          :data="tableData"
          stripe
          height="560px"
          align="center"
          :header-cell-style="{'text-align':'center'}">
          <el-table-column
            prop="sporterName"
            label="运动员"
            align="center"
            width="200"></el-table-column>
          <el-table-column
            prop="sportsName"
            label="体育项目"
            align="center"
            width="200"></el-table-column>
          <el-table-column
            prop="results"
            label="项目成绩"
            align="center"
            width="200"></el-table-column>
          <el-table-column
            prop="times"
            label="比赛时间"
            align="center"
            width="200"></el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
// 导入网络请求
import {getResults,selectResults} from 'network/results.js'
export default {
  name: 'ResultsSearch',
  data() {
    return {
      restaurants: [],
      sporterName: '',
      sportsName: '',
      times: '',
      tableData: [
        { sporterName: [], sportsName:[], results: [], times: [] },
      ]
    }
  },
  methods: {
    changeTime(time) {
      this.time = time
    },
    search() { //查询
      if(!this.sporterName && !this.name && !this.time) {
        this.$message({
            type: 'info',
            message: '请填写查询条件'
          })
      }else {
        let data = {
          sporterName: this.sporterName,
          sportsName: this.sportsName,
          times: this.times
        }
        selectResults(data).then(res=> {
          if(res.length != 0) {
            this.tableData = []
            for(let i in res) {
              this.tableData.push({sporterName: res[i].sporterName, sportsName: res[i].sportsName, results: res[i].results, times: res[i].times.slice(0,10)})
            }
          }else {
            this.tableData = []
          }
        })
      }
    },
    reset() { //重置
      this.sporterName = ''
      this.sportsName = ''
      this.times = ''
      getResults('data').then(res => {
      this.tableData = []
        for(let i in res) {
          this.tableData.push({sporterName: res[i].sporterName, sportsName: res[i].sportsName, results: res[i].results, times: res[i].times.slice(0,10)})
        }
      })
    },
  },
  created() {
    // 请求体育成绩数据
    getResults('data').then(res => {
      this.tableData = []
      for(let i in res) {
        this.tableData.push({sporterName: res[i].sporterName, sportsName: res[i].sportsName, results: res[i].results, times: res[i].times.slice(0,10)})
      }
    })
  }
}
</script>
<style scoped>
  @import "~assets/css/results/ResultsSearch/search.css";
  .top >>> .el-input--suffix .el-input__inner {
    padding-right: 0;
  }
  .top >>> .el-input__inner {
    padding: 0;
    text-align: center;
  }
</style>