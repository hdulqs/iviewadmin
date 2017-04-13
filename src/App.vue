<template>
  <div class="layout">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <AppMenu :iconSize="iconSize" :spanLeft="spanLeft"></AppMenu>
      </i-col>
      <i-col :span="spanRight">
        <div class="layout-header">
          <i-button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </i-button>
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item v-for="br in breadcrumbList" :key="br.id">
              {{br.name}}
            </Breadcrumb-item>
          </Breadcrumb>
        </div>
        <router-view></router-view>
        <div class="layout-copy">
          2017-2018 &copy;
          <a href="http://my.oschina.net/mobinchao" target="_blank">莫铭</a>
      </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import AppMenu from '@/components/Menu'

export default {
  name: 'app',
  data () {
    return {
      spanLeft: 4,
      spanRight: 20,
      menus: sessionStorage.getItem('system.menus') ? JSON.parse(sessionStorage.getItem('system.menus')) : []
    }
  },
  mounted: function mounted () {
  },
  computed: {
    iconSize () {
      return this.spanLeft === 4 ? 14 : 24
    },
    breadcrumbList () {
      let routerArr = []
      let cpath = this.$route.path
      if (cpath !== '/' && cpath !== undefined) {
        if (cpath === '/dashboard') {
          routerArr.push({
            id: 10000,
            name: '仪表盘'
          })
        } else {
          for (let i = 0; i < this.menus.length; i++) {
            if (this.menus[i].subMenu) {
              for (let j = 0; j < this.menus[i].subMenu.length; j++) {
                if (this.menus[i].subMenu[j].path === cpath) {
                  routerArr.push(this.menus[i])
                  routerArr.push(this.menus[i].subMenu[j])
                }
              }
            }
          }
        }
      }
      return routerArr
    }
  },
  methods: {
    toggleClick () {
      if (this.spanLeft === 4) {
        this.spanLeft = 2
        this.spanRight = 22
      } else {
        this.spanLeft = 4
        this.spanRight = 20
      }
    }
  },
  components: {
    AppMenu
  }
}
</script>

<style>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 568px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #fff;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
  .layout-logo {
    text-align: center;
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #DBDBDB;
    border-radius: 3px;
    margin: 15px auto;
    text-align: center;
    font-size: 1.2em;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
</style>
