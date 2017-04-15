<template>
  <Modal
    id="sysResFormDialog"
    v-model="initOption.showModal"
    :mask-closable="false">
    <p slot="header" style="color:#f60;text-align:center;">
      <Icon type="information-circled"></Icon>
      <span>{{initOption.title}}</span>
    </p>
    <Form
      ref="resForm"
      :model="resForm"
      :rules="formRules"
      :label-width="90">
      <Form-item prop="id" v-if="initOption.action === 'edit'">
        <input type="hidden" :model="resForm.id">
      </Form-item>
      <Form-item label="资源名称" prop="name">
        <Input type="text" v-model="resForm.name" placeholder="请输入资源名称"></Input>
      </Form-item>
      <Form-item label="资源类型" prop="type">
        <Select v-model="resForm.type">
          <Option
            :value="t.id"
            :label="t.name"
            v-for="t in resourceTypes" :key="t.id">
          </Option>
        </Select>
      </Form-item>
      <Form-item label="所属系统" prop="sid">
        <Select v-model="resForm.sid" clearable filterable>
          <Option
            :value="sys.id"
            :label="sys.name"
            v-for="sys in systemList" :key="sys.id">
            <span>{{sys.name}}</span>
            <span style="float:right;color:#ccc">{{sys.description}}</span>
          </Option>
        </Select>
      </Form-item>
      <Form-item label="所属模块" prop="mid">
        <Select v-model="resForm.mid" clearable filterable>
          <Option
            :value="m.id"
            :label="m.name"
            v-for="m in moduleList" :key="m.id">
            <span>{{m.name}}</span>
            <span style="float:right;color:#ccc">{{m.description}}</span>
          </Option>
        </Select>
      </Form-item>
      <Form-item label="url" prop="url">
        <Input type="text" v-model="resForm.url" ></Input>
      </Form-item>
      <Form-item label="是否需要授权" prop="privilegess">
        <Select v-model="resForm.privilegess">
          <Option value="0" label="否"></Option>
          <Option value="1" label="是"></Option>
        </Select>
      </Form-item>
      <Form-item label="描述" prop="description">
        <Input
          type="textarea"
          v-model="resForm.description"
          placeholder="请输入描述"></Input>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit">保存</Button>
      <Button type="error" @click="reset" v-if="initOption.action === 'add'">重置</Button>
    </div>
  </Modal>
</template>
<script>
import sysApis from '../../../apis'

export default {
  name: 'sysResFormDialog',
  props: {
    initOption: {
      title: {
        type: String,
        default: '新增资源'
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
          {required: true, message: '资源名称不能为空', trigger: 'blur'}
        ],
        // type: [
        //   {required: true, message: '请选择资源类型', trigger: 'change'}
        // ],
        // sid: [
        //   {required: true, message: '请选择所属系统', trigger: 'change'}
        // ],
        // mid: [
        //   {required: true, message: '请选择所属模块', trigger: 'change'}
        // ],
        url: [
          {required: true, message: 'url必填', trigger: 'blur'}
        ]
      },
      resForm: {
        id: this.initOption.id,
        name: '',
        type: null,
        sid: null,
        mid: null,
        url: '',
        privilegess: '1',
        description: ''
      },
      resourceTypes: [{
        id: 0,
        name: '功能资源'
      }, {
        id: 1,
        name: '菜单资源'
      }],
      systemList: [{
        id: 10000,
        name: '基础系统',
        description: '包含系统基础功能'
      }],
      moduleList: [{
        id: 10000,
        name: '系统管理',
        description: '管理本系统包含的子系统'
      }, {
        id: 10001,
        name: '模块管理',
        description: '管理子系统包含的模块'
      }, {
        id: 10002,
        name: '资源管理',
        description: '管理系统的功能资源'
      }, {
        id: 10003,
        name: '菜单管理',
        description: '管理系统的菜单'
      }, {
        id: 10004,
        name: '用户组管理',
        description: '管理系统的用户组'
      }, {
        id: 10005,
        name: '角色管理',
        description: '管理系统的角色'
      }, {
        id: 10006,
        name: '用户管理',
        description: '管理系统用户'
      }]
    }
  },
  methods: {
    getInfo () {
      this.$http.jsonp(sysApis.sys.resource.get, {
        params: {
          id: this.initOption.id
        }
      }).then(response => {
        if (response.body.success) {
          this.resForm = response.body.obj
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
      this.$refs.resForm.validate((valid) => {
        if (valid) {
          let url
          if (this.initOption.action === 'add') {
            url = sysApis.sys.resource.save
          } else if (this.initOption.action === 'edit') {
            url = sysApis.sys.resource.update
          }
          this.$http.jsonp(url, {
            params: this.resForm
          }).then(response => {
            if (response.body.success) {
              this.$Notice.success({
                title: '提示',
                desc: '新菜单保存成功！'
              })
              this.$parent.$children[0].query()
              this.$parent.resFormInitOption.showModal = false
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
      this.$refs.resForm.resetFields()
    }
  }
}
</script>
<style>
</style>
