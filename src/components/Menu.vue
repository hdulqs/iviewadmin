<template>
  <Menu
    id="sysMenu"
    :class="{'layout-hide-text': spanLeft < 4}"
    :active-name="activeMenu"
    theme="light"
    width="auto"
    @on-select="handleSelect"
    accordion>
    <div class="layout-logo-left">
      <router-link to="/">
        <span v-if="spanLeft >= 4">IVA后台管理系统</span>
        <span v-if="spanLeft < 4">IVA</span>
      </router-link>
    </div>
    <template v-for="(menu, index) in menuList">

      <Menu-item
        v-if="menu.subMenu === null || menu.subMenu === undefined || menu.subMenu.length === 0"
        :name="menu.path">
          <Icon :type="menu.icon" :size="iconSize"></Icon>
          <span class="layout-text">{{menu.name}}</span>
      </Menu-item>

      <Submenu :name="index + 1"  v-if="menu.subMenu.length > 0">
        <template slot="title">
          <Icon :type="menu.icon" :size="iconSize"></Icon>
          <span class="layout-text">{{menu.name}}</span>
        </template>
        <Menu-item
          :name="subMenu.path"
          v-for="(subMenu, subIndex) in menu.subMenu"
          :key="subMenu.id">
            <Icon :type="subMenu.icon" :size="iconSize"></Icon>
            <span class="layout-text">{{subMenu.name}}</span>
        </Menu-item>
      </Submenu>

    </template>
  </Menu>
</template>
<script>
import sysApis from '../apis';

export default {
  props: {
    iconSize: {
      required: true,
      type: Number
    },
    spanLeft: {
      required: true,
      type: Number
    },
    sid: {
      type: String,
      default: 'f043a1edddc5477bbf82cd3261778cd5'
    }
  },
  data () {
    return {
      menuList: []
    };
  },
  name: 'sysMenu',
  mounted () {
    this.$nextTick(() => {
      this.getMenus();
    });
  },
  computed: {
    activeMenu () {
      return this.$route.path;
    }
  },
  methods: {
    getMenus () {
      this.$http.jsonp(sysApis.sys.menu.tree, {
        params: {
          sid: this.sid
        }
      }).then(response => {
        if (response.body.success) {
          this.menuList = response.body.obj;
          sessionStorage.setItem('system.menus', JSON.stringify(response.body.obj));
        } else {
          this.$Modal.error({
            title: '提示',
            content: response.body.msg
          });
        }
      }, response => {
        this.$Modal.error({
          title: '提示',
          content: '网络不通，请稍后再试！'
        });
      });
    },
    handleSelect (name) {
      this.$router.push(name);
    }
  }
};
</script>
<style lang="scss" scoped>
.ivu-menu-item {
  border-right: none;
}
.ivu-menu-item-selected {
  background-color: #DBDBDB;
}
</style>
