<template>
  <div id="resourceCombo">
    <Select
      :value="currentValue"
      clearable
      filterable
      @on-change="setCurrentValue">
      <Option :value="r.id" :label="r.name" v-for="r in resourceList" :key="r.id">
        <template v-if="showDesc">
          <span>{{r.name}}</span>
          <span style="float:right;color:#ccc">{{r.description}}</span>
        </template>
      </Option>
    </Select>
  </div>
</template>
<script>
export default {
  name: 'resourceCombo',
  props: {
    value: {
      type: String,
      default: null
    },
    showDesc: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getResourceList()
    })
  },
  data () {
    return {
      currentValue: this.value,
      resourceList: []
    }
  },
  methods: {
    getResourceList () {
      this.systemList = []
      this.$http.jsonp(sysApis.sys.resource.find, {
        params: {
          pageSize: 50
        }
      }).then(response => {
        if (response.body.success) {
          this.resourceList = response.body.obj.list
          // if (this.resourceList.length > 0) {
          //   this.setCurrentValue(response.body.obj.list[0].id)
          // }
        } else {
          this.$Modal.error({
            title: '提示',
            content: response.body.msg
          })
        }
      }, response => {
        this.$Modal.error({
          title: '提示',
          content: '网络不通，无法加载系统列表！'
        })
      })
    },
    setCurrentValue (val) {
      this.$emit('input', val)
    }
  },
  watch: {
    value (val) {
      this.currentValue = val;
    }
  }
}
</script>
<style>
</style>
