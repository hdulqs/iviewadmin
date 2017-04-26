<template>
  <div id="moduleCombo">
    <Select
      ref="moduleCombo"
      :value="currentValue"
      clearable
      filterable
      @on-change="setCurrentValue">
      <Option value="" label="全部" v-if="needAll"></Option>
      <Option :value="m.id" :label="m.name" v-for="m in moduleList" :key="m.id">
        <template v-if="showDesc">
          <span>{{m.name}}</span>
          <span style="float:right;color:#ccc">{{m.description}}</span>
        </template>
      </Option>
    </Select>
  </div>
</template>
<script>
import sysApis from '../apis';

export default {
  name: 'moduleCombo',
  props: {
    value: {
      type: [String],
      default: ''
    },
    needAll: {
      type: Boolean,
      default: false
    },
    showDesc: {
      type: Boolean,
      default: false
    },
    sid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentValue: this.value,
      moduleList: []
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.getModuleList();
    });
  },
  methods: {
    getModuleList () {
      this.moduleList = [];
      this.$http.jsonp(sysApis.sys.module.find, {
        params: {
          sid: this.sid,
          pageSize: 50
        }
      }).then(response => {
        if (response.body.success) {
          this.moduleList = response.body.obj.list;
          // if (!this.needAll && this.moduleList.length > 0) {
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
          content: '网络不通，无法加载模块列表！'
        });
      });
    },
    setCurrentValue (val) {
      this.$emit('input', val);
    }
  },
  watch: {
    sid (val) {
      this.$refs.moduleCombo.clearSingleSelect();
      this.getModuleList();
    }
  }
};
</script>
<style>
</style>
