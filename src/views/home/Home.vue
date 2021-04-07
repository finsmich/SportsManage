<template>
  <div class="home">
    <top-bar></top-bar>
    <home-content :news="sportsNews"></home-content>
  </div>
</template>

<script>
// 导入导航栏
import TopBar from 'components/content/TopBar'
// 导入内容组件
import HomeContent from './homechildcomps/HomeContent'
// 导入网络请求
import {getHomeSportsNews} from 'network/home.js'

export default {
  name: 'home',
  components: {
    TopBar,
    HomeContent,
  },
  data () {
    return {
      bodyBgImage: 'url(' + require('assets/img/home/home.jpg') + ')',
      sportsNews: []
    }
  },
  methods: {
    // 添加body图片
    setBodyBackGround () {
      document.body.style.backgroundSize = '100% 100%'
      document.body.style.backgroundRepeat = 'no-repeat'
      document.body.style.backgroundImage = this.bodyBgImage
    },
      // 清除背景图
      clearBodyBackGround () {
        document.body.style.backgroundImage = ''
    }
  },
  created() {
    // 请求体育新闻数据
    getHomeSportsNews('news').then(res => {
      this.sportsNews = res
    })
  },
  mounted() {
    this.setBodyBackGround()
  },
  beforeDestroy(){
    // 离开页面的时候清除
    this.clearBodyBackGround()
  }
}
</script>
<style scoped>
  .home {
    max-width: 1230px;
    min-width: 750px;
    margin: 0 auto;
  }
</style>