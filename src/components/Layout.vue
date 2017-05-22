<template>
		<div class="layout">
			<div class="layout-left">
	      <AppMenu :iconSize="iconSize" :spanLeft="spanLeft"></AppMenu>
	    </div>
	    <div class="layout-right">
	      <div class="layout-header">
	        <i-button type="text" @click="toggleClick">
	          <Icon type="navicon" size="32"></Icon>
	        </i-button>
          <Dropdown @on-click="handleDropdown" class="right">
            <a href="javascript:void(0)">
                {{user.username}}
                <Icon type="arrow-down-b"></Icon>
            </a>
            <Dropdown-menu slot="list">
                <Dropdown-item name="logout">注销</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
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
	      <PageFooter></PageFooter>
	   	</div>
		</div>
</template>
<script>
import AppMenu from '@/components/Menu';
import PageFooter from '@/components/Footer';
export default {
  data () {
    return {
      spanLeft: 4,
      spanRight: 20,
      menus: sessionStorage.getItem('system.menus') ? JSON.parse(sessionStorage.getItem('system.menus')) : [],
      user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
    };
  },
  computed: {
    iconSize () {
      return this.spanLeft === 4 ? 14 : 24;
    },
    breadcrumbList () {
      let routerArr = [];
      let cpath = this.$route.path;
      if (cpath !== '/' && cpath !== undefined) {
        if (cpath === '/dashboard') {
          routerArr.push({
            id: 10000,
            name: '仪表盘'
          });
        } else {
          for (let i = 0; i < this.menus.length; i++) {
            if (this.menus[i].subMenu) {
              for (let j = 0; j < this.menus[i].subMenu.length; j++) {
                if (this.menus[i].subMenu[j].path === cpath) {
                  routerArr.push(this.menus[i]);
                  routerArr.push(this.menus[i].subMenu[j]);
                }
              }
            }
          }
        }
      }
      return routerArr;
    }
  },
  methods: {
    toggleClick () {
      if (this.spanLeft === 4) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 4;
        this.spanRight = 20;
      }
    },
    handleDropdown (name) {
      switch (name) {
        case 'logout':
          this.$Modal.confirm({
            title: '注销',
            content: '确定退出系统？',
            onOk: () => {
              sessionStorage.clear();
              this.$router.push('/');
            }
          });
          break;
      }
    }
  },
  components: {
    AppMenu,
    PageFooter
  }
};
</script>
<style lang="scss">
  body {
    height: 100%;
    overflow-y: hidden;
    background-color: #f8f8f8;
  }
  .layout{
    position: relative;
    height: 100vh;
    background: #f5f7f9;

    .layout-left {
      width: 224px;
      position: absolute;
      overflow: visible;
      padding-bottom: 24px;
      height: 100vh;
      transition: all 0.3s ease-out;
      box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.01);
      z-index: 520;
      color: #999;
      border-right: 1px solid #dbdbdb;
      background: #fff;

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
    }
    .layout-right {
      margin-left: 224px;
      overflow: auto;
      height: 100vh;
      transition: all 0.3s ease-out;

      .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);

        .right {
          float: right;
          padding: 20px;
        }
      }
      .layout-breadcrumb{
        padding: 10px 15px 0;
      }
      .layout-content{
        margin: 15px;
        background: #fff;
        border-radius: 4px;
        min-height: calc(100vh - 172px);

        .layout-content-main{
          padding: 10px;
          min-height: 100%;
        }
      }
    }
  },
  .my-combo {
    line-height: 30px;
    height: 30px;
    width: 100%;
    &:disabled {
      background: gray;
      cursor: not-allowed;
    }
  }
</style>
