<template>
  <div class="home-content">
    <div class="newsTitle">
      <div class="newsTitleH2"><h2>{{nowData}}日体育新闻</h2></div>
      <ul>
        <li
          v-for="(item,index) in news"
          :key="index"
          class="newsTitleStyle"
          @click="titleClick(item,index)">
          <el-link
          type="info"
          :underline="false"
          :class="{active:titleIsActive == index}">
            {{item.title}}
          </el-link>
        </li>
      </ul>
    </div>
    <div class="newsContent">
      <h2>{{newsTitleData}}</h2>
      <p v-html="newsContentData">{{newsContentData}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: Array
  },
  data() {
    return {
      newsTitleData: '',
      newsContentData: '',
      titleIsActive: -1,
      nowData: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
    }
  },
  methods: {
    titleClick(item,index) {
      this.newsTitleData = item.title
      this.newsContentData = item.content
      // 点击使标题变色
      if(this.titleIsActive == index) {
        this.titleIsActive = -1
      }else{
        this.titleIsActive = index
      }
    }
  }
}
</script>

<style scoped>
  @import "~assets/css/home/home.css";
</style>