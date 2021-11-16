// 主布局
<template>
  <div>
    <el-container style="position: absolute;left: 0;top: 0;bottom: 0;right: 0;overflow: hidden;">
      <!-- 头部header -->
      <el-header class="d-flex align-items-center mb-0" style="background-color:#545c64">
        <a class="h5 text-light mr-auto">{{$conf.logo}}</a>
        <!-- :default-active="navBar.active" -->
        <el-menu
          :default-active="0"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item 
           :index="index|numToString" 
           v-for="(item,index) in navBar.list"
           :key="index">{{item.name}}
          </el-menu-item>
          <el-submenu index="100">
            <template slot="title">
              <el-avatar :size="small" 
               src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
              </el-avatar>
              summer
            </template>
            <el-menu-item index="100-1">修改</el-menu-item>
            <el-menu-item index="100-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container style="height: 100%;padding-bottom: 60px;">
        <!-- 侧边布局 -->
        <el-aside width="200px">
          <el-menu style="height: 100%;"
            default-active="0" @select="slideSelect">
            <el-menu-item 
             :index="index|numToString" :key="index"
             v-for="(item,index) in slideMenus">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主布局 -->
        <el-main>
          <!-- 面包屑导航     -->
          <div class="border-bottom" v-if="bran.length > 0"
           style="padding: 20px;margin: -20px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="(item,index) in bran"
                :key="index" :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 主 内容 -->
        </el-main>
      </el-container>
    </el-container>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
  import common from "../common/mixins/common.js"
  export default {
    mixins:[],
    data() {
      return {
        // navBarIndex: '1',
        navBar:[],
        bran:[]
      };
    },
    created() {
      // 初始化菜单
      this.navBar = this.$conf.navBar
      // 获取面包屑导航
      this.getRouteBran()
    },
    watch:{
      '$route'(to,from) {
        this.getRouteBran()
      }
    },
    computed: {
      slideMenuActive: {
        get() {
          return this.navBar.list[this.navBar.active].subActive || '0'
        },
        set(val) {
          return this.navBar.list[this.navBar.active].subActive = val
          console.log(val)
        }
      },
      slideMenus() {
        return this.navBar.list[this.navBar.active].submenu || []
      }
    },
    methods: {
      // 获取面包屑导航
      getRouteBran() {
        let b = this.$route.matched.filter(v => v.name)
        let arr = []
        b.forEach((v,k) => {
          // 过滤layout和index
          if (v.name === 'index' || v.name === 'layout')
          arr.push({
            name:v.name,
            path:v.path,
            title:v.meta.title
          })
        })
        if (arr.length >0) {
          arr.unshift({name:'index',path:'/index',title:'后台首页'})
        }
        this.bran = arr
      },
      handleSelect(key, keyPath) {
        this.navBar.active = key
      },
      slideSelect(key, keyPath) {
        // this.navBar.list[this.navBar.active].subActive = key
        this.slideMenuActive = key
        // 跳转到指定页面
        this.$route.push({
          name: this.slideMenus[key].pathname
        })
      }
    }
}
</script>
<style>

</style>