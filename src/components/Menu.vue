<template>
  <Menu
    :class="{'layout-hide-text': spanLeft < 4}"
    active-name="1"
    theme="light"
    width="auto"
    on-select="onSelect"
    accordion>
    <div class="layout-logo-left">logo</div>
    <template v-for="(menu, index) in menuList">

      <Menu-item
        v-if="!menu.subMenu"
        :name="index + 1">
        <Icon :type="menu.icon"></Icon>
        {{menu.name}}
      </Menu-item>

      <Submenu :name="index + 1"  v-if="menu.subMenu">
        <template slot="title">
          <Icon :type="menu.icon"></Icon>
          {{menu.name}}
        </template>
        <Menu-item
          :name="(index + 1) + '-' + (subIndex + 1)"
          v-for="(subMenu, subIndex) in menu.subMenu"
          :key="subMenu.id">
          <Icon :type="subMenu.icon"></Icon>
          {{subMenu.name}}
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
  methods: {
    getMenus () {
      this.$http.get('static/data/menutree.json')
        .then(response => {
          this.menuList = response.body
        })
    },
    onSelect (name) {
      console.log(name)
    }
  }
}
</script>
