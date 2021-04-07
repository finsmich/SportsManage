<template>
  <div class="results-manage">
    <div class="top">
      <el-input v-model="sporterName" clearable placeholder="请输入运动员姓名"></el-input>
      <el-autocomplete
        class="inline-input"
        clearable
        v-model="sportsName"
        :fetch-suggestions="querySearch" 
        placeholder="请输入体育项目"></el-autocomplete>
      <el-input v-model="results" clearable placeholder="请输入成绩 0-100" ></el-input>
      <el-date-picker
        v-model="times"
        type="date"
        placeholder="请输入比赛时间"
        value-format="yyyy-MM-dd"
        @change="changeTime"></el-date-picker>
      <el-button type="warning" @click="open">提交成绩</el-button>
    </div>
    <div class="bottom">
      <template>
        <el-table
          :data="tableData"
          stripe
          height="560px"
          align="center"
          :header-cell-style="{'text-align':'center'}">
          <el-table-column prop="sporterName" label="运动员" width="200" align="center"></el-table-column>
          <el-table-column prop="sportsName" label="体育项目" width="200" align="center"></el-table-column>
          <el-table-column prop="results" label="项目成绩" width="200" align="center"></el-table-column>
          <el-table-column prop="times" label="比赛时间" width="200" align="center"></el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="update(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="deleteClick(scope.$index)" type="text" size="small">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog title="编辑" :visible.sync="editFormVisible" :modal-append-to-body="false" :close-on-click-modal="true" :close-on-press-escape="true" class="dialogClass">
        <el-form :model="editForm">
          <el-form-item label="运动员" disabled>
            <el-input v-model="editForm.sporterName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="体育项目">
            <el-input v-model="editForm.sportsName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目成绩">
            <el-input v-model="editForm.results" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="比赛时间">
            <el-date-picker
              v-model="editForm.times"
              type="date"
              value-format="yyyy-MM-dd"
              @change="changeFromTime"
              autocomplete="off">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="concel">取 消</el-button>
          <el-button type="primary" @click="handleUpdate">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// 导入网络请求
import {getResults,insertResults,deleteResults,updateResults} from 'network/results.js'
//导入axios
import axios from 'axios'
export default {
  name: 'ResultsManage',
  data() {
    return {
      index: '',
      // 四个插入框
      sporterName: '',
      sportsName: '',
      results: '',
      times: '',
      // 表格
      tableData: [
        { sporterName: [], sportsName: [], results: [], times: [] }
      ],
      editFormVisible: false,
      // 弹出来的表单
      editForm: {
        id: 0,
        sporterName: '',
        sportsName: '',
        results: '',
        times:'',
      },
    }
  },
  methods: {
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "50米跑"},
        { "value": "100米跑"},
        { "value": "200米跑"},
        { "value": "400米跑"},
        { "value": "800米跑"},
        { "value": "1000米跑"},
        { "value": "3000米跑"},
        { "value": "400米接力"},
        { "value": "800米接力"},
        { "value": "立定跳远"},
        { "value": "三级跳远"},
        { "value": "撑杆跳"},
        { "value": "铅球"},
        { "value": "羽毛球"},
        { "value": "棒球"},
        { "value": "篮球"},
        { "value": "足球"},
        { "value": "乒乓球"},
        { "value": "网球"},
        { "value": "排球"},
        { "value": "台球"},
        { "value": "健美操"},
        { "value": "花样滑冰"},
        { "value": "速度滑冰"},
        { "value": "滑板"},
        { "value": "轮滑"},
        { "value": "滑水"},
        { "value": "塞艇"},
        { "value": "皮滑艇"},
        { "value": "赛马"},
        { "value": "举重"},
        { "value": "击剑"},
        { "value": "拳击"},
        { "value": "柔道"},
        { "value": "摔跤"},
        { "value": "武术"},
        { "value": "跆拳道"},
        { "value": "空手道"},
        { "value": "射箭"},
        { "value": "跳水"},
      ]
    },
    open() {
      this.$confirm('是否确定要提交成绩?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.sporterName && this.sportsName && this.results &&this.time && this.results>=0 && this.results<=100) {
          // 更新表格(直接响应式更新，不重新请求数据库)
          this.tableData.push({sporterName: this.sporterName, sportsName: this.sportsName, results: this.results, times: this.times})
          // 编写数据
          let data = {
            sporterName: this.sporterName,
            sportsName: this.sportsName,
            results: this.results,
            times: this.times
          }
          // 发送后端 插入体育成绩数据
          insertResults(data).then(res=>{
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
            // 清空输入框
            this.sporterName = ''
            this.sportsName = ''
            this.results = ''
            this.times = ''
          })
        }else{
          this.$message({
            type: 'info',
            message: '错误，请重新输入'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) { //添加体育项目名称
      return row.name;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    changeTime(time) {
      this.time = time
    },
    changeFromTime(time) {
      this.editForm.times = time
    },
    update(index, row) {
      this.index = index
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    concel() {
      this.editFormVisible = false
      this.$message({
        type: 'info',
        message: '已取消'
      })
    },
    handleUpdate() {
      if (this.editForm.sportsName && this.editForm.sporterName && this.editForm.results && this.editForm.times) {
        this.$confirm('确定要修改该条数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>{
          // 编写数据
          let data = {
            oldSportsName: this.tableData[this.index].sportsName,
            oldSporterName: this.tableData[this.index].sporterName,
            oldResults: this.tableData[this.index].results,
            oldTimes: this.tableData[this.index].times,
            newSportsName: this.editForm.sportsName,
            newSporterName: this.editForm.sporterName,
            newResults: this.editForm.results,
            newTimes: this.editForm.times
          }
          // 发送修改体育成绩数据
          updateResults(data).then(res => {})
          //直接响应式修改tableData里对应的元素
          this.tableData[this.index].sportsName = this.editForm.sportsName
          this.tableData[this.index].sporterName = this.editForm.sporterName
          this.tableData[this.index].results = this.editForm.results
          this.tableData[this.index].times = this.editForm.times
          this.editFormVisible = false;
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '缺失信息'
        })
      }
    },
    deleteClick(index) {
      this.$confirm('确定删除该条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>{
        // 编写数据
        let data = {
          sporterName: this.tableData[index].sporterName,
          sportsName: this.tableData[index].sportsName,
          results: this.tableData[index].results,
          times: this.tableData[index].times
        }
        // 发送数据
        deleteResults(data).then(res => {})
        //直接响应式删除tableData里对应的元素
        this.tableData.splice(index,1)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
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
  },
  mounted() {
    this.restaurants = this.loadAll()
  }
}
</script>
<style scoped>
  @import "~assets/css/results/ResultsManage/manage.css";
  .top >>> .inline-input .el-input__inner:hover {
    border-color: black;
  }
  .top >>> .el-input {
    width: 200px;
    margin-right: 30px;
  }
  .top >>> .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 230px;
  }
  .top >>> .el-input--suffix .el-input__inner {
    padding-right: 0;
  }
  .top >>> .el-input--suffix .el-input__inner:hover {
    border: 1px solid black;
  }
  .dialogClass >>> .el-input {
    width: 220px;
  }
  .dialogClass >>> .el-form-item__label {
    width: 100px;
    text-align: center;
  }
</style>