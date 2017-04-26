<template>
  <div id="menuCombo">
    <Select
      ref="menuCombo"
      :value="currentValue"
      clearable
      filterable
      :disabled="disabled"
      @on-change="setCurrentValue">
      <Option :value="m.id" :label="m.name" v-for="m in menuList" :key="m.id">
      </Option>
    </Select>
  </div>
</template>
<script>
import sysApis from '../apis';

export default {
  name: 'menuCombo',
  props: {
    value: {
      type: String,
      default: null
    },
    isparent: {
      type: Boolean,
      default: null
    },
    sid: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value,
      menuList: []
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.getMenuList();
    });
  },
  methods: {
    getMenuList () {
      this.menuList = [];
      this.$http.jsonp(sysApis.sys.menu.find, {
        params: {
          pageSize: 50,
          isparent: this.isparent,
          sid: this.sid
        }
      }).then(response => {
        if (response.body.success) {
          this.menuList = response.body.obj.list;
          // if (!this.needAll && this.menuList.length > 0) {
          //   this.setCurrentValue(response.body.obj.list[0].id)
          // }
        } else {
          this.$Modal.error({
            title: '提示',
            content: response.body.msg
          });
        }
      }, response => {
        this.$Modal.error({
          title: '提示',
          content: '网络不通，无法加载系统列表！'
        });
      });
    },
    setCurrentValue (val) {
      this.$emit('input', val);
    }
  },
  watch: {
    sid (val) {
      this.$refs.menuCombo.clearSingleSelect();
      this.getMenuList();
    }
  }
};
</script>
<style>
</style>
