<template>
  <Modal
    id="sysMenuFormDialog"
    v-model="initOption.showModal"
    :mask-closable="false">
    <p slot="header" style="color:#f60;text-align:center;">
      <Icon type="information-circled"></Icon>
      <span>{{initOption.title}}</span>
    </p>
    <Form
      ref="menuForm"
      :model="menuForm"
      :rules="formRules"
      :label-width="80">
      <Form-item prop="id" v-if="initOption.action === 'edit'">
        <input type="hidden" :model="menuForm.id">
      </Form-item>
      <Form-item label="菜单名称" prop="name">
        <Input type="text" v-model="menuForm.name" placeholder="请输入菜单名称"></Input>
      </Form-item>
      <Form-item label="关联资源">
        <Select v-model="menuForm.rid" clearable filterable>
          <Option
            :value="res.id"
            :label="res.name"
            v-for="res in resourceList" :key="res.id">
            <span>{{res.name}}</span>
            <span style="float:right;color:#ccc">{{res.url}}</span>
          </Option>
        </Select>
      </Form-item>
      <Form-item label="描述" prop="description">
        <Input
          type="textarea"
          v-model="menuForm.description"
          placeholder="请输入描述"></Input>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit">保存</Button>
      <Button type="error" @click="reset">重置</Button>
    </div>
  </Modal>
</template>
<script>
import sysApis from '../../../apis'

export default {
  name: 'sysMenuFormDialog',
  props: {
    initOption: {
      title: {
        type: String,
        default: '新增菜单'
      },
      action: {
        type: String,
        default: 'add'
      },
      showModal: {
        type: Boolean
      },
      id: {
        type: String
      }
    }
  },
  data () {
    return {
      formRules: {
        name: [
          {required: true, message: '菜单名称不能为空', trigger: 'blur'}
        ]
      },
      menuForm: {
        id: this.initOption.id,
        name: '',
        description: ''
      },
      resourceList: [{
        id: 10000,
        name: '首页',
        url: '/'
      }, {
        id: 10001,
        name: '系统仪表盘',
        url: '/sys/dashboard'
      }, {
        id: 10002,
        name: '分组管理首页',
        url: '/sys/group'
      }, {
        id: 10003,
        name: '菜单管理首页',
        url: '/sys/menu'
      }]
    }
  },
  methods: {
    getInfo () {
      this.$http.jsonp(sysApis.sys.menu.get, {
        params: {
          id: this.initOption.id
        }
      }).then(response => {
        if (response.body.success) {
          this.menuForm = response.body.obj
        } else {
          this.$Modal.error({
            title: '提示',
            content: response.body.msg
          })
        }
      }, response => {
        this.$Modal.error({
          title: '提示',
          content: '网络不通！'
        })
      })
    },
    handleSubmit () {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          let url
          if (this.initOption.action === 'add') {
            url = sysApis.sys.menu.save
          } else if (this.initOption.action === 'edit') {
            url = sysApis.sys.menu.update
          }
          this.$http.jsonp(url, {
            params: this.menuForm
          }).then(response => {
            if (response.body.success) {
              this.$Notice.success({
                title: '提示',
                desc: '新菜单保存成功！'
              })
              this.$parent.$children[0].query()
              this.$parent.menuFormInitOption.showModal = false
              this.reset()
            } else {
              this.$Notice.error({
                title: '提示',
                desc: response.body.msg
              })
            }
          }, response => {
            this.$Notice.error({
              title: '提示',
              desc: '网络异常，请稍后再试！'
            })
          })
        }
      })
    },
    reset () {
      this.$refs.menuForm.resetFields()
    }
  }
}
</script>
<style>
</style>
