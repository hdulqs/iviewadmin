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
            <Breadcrumb-item href="#">首页</Breadcrumb-item>
            <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
            <Breadcrumb-item>某应用</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <router-view></router-view>
        <div class="layout-copy">
          2017-2018 &copy; 莫铭
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
      spanRight: 20
    }
  },
  computed: {
    iconSize () {
      return this.spanLeft === 4 ? 14 : 24
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
    min-height: calc(100% - 160px);
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
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #9ea7b4;
    border-radius: 3px;
    margin: 15px auto;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
</style>
