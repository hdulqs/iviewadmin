<template>
  <Menu
    :class="{'layout-hide-text': spanLeft < 4}"
    :active-name="activeMenu"
    theme="light"
    width="auto"
    @on-select="handleSelect"
    accordion>
    <div class="layout-logo-left">
      <router-link to="/">iviewadmin</router-link>
    </div>
    <template v-for="(menu, index) in menuList">

      <Menu-item
        v-if="!menu.subMenu"
        :name="menu.path">
          <Icon :type="menu.icon" :size="iconSize"></Icon>
          <span class="layout-text">{{menu.name}}</span>
      </Menu-item>

      <Submenu :name="index + 1"  v-if="menu.subMenu">
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
export default {
  props: {
    iconSize: {
      required: true,
      type: Number
    },
    spanLeft: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      menuList: []
    }
  },
  name: 'appMenu',
  mounted () {
    this.$nextTick(() => {
      this.getMenus()
    })
  },
  computed: {
    activeMenu () {
      return this.$route.path
    }
  },
  methods: {
    getMenus () {
      this.$http.get('static/data/menutree.json')
        .then(response => {
          this.menuList = response.body
          sessionStorage.setItem('system.menus', JSON.stringify(response.body))
        })
    },
    handleSelect (name) {
      this.$router.push(name)
    }
  }
}
</script>
<style lang="scss" scoped>
.ivu-menu-item-selected {
  background-color: #DBDBDB;
}
</style>
