<template>
  <div class="results">
    <top-bar></top-bar>
    <router-view></router-view>
  </div>
</template>
<script>
// 导入导航栏
import TopBar from 'components/content/TopBar'
// 导入网络请求
import {getResults} from 'network/results.js'
export default {
  name: 'results',
  components: {
    TopBar,
  },
  data() {
    return {
      bodyBgImage: 'url(' + require('assets/img/home/home.jpg') + ')',
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
  .results {
    max-width: 1230px;
    min-width: 750px;
    margin: 0 auto;
  }
</style>