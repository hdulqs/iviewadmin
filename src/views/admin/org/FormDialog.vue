<template>
  <Modal
    id="sysOrgFormDialog"
    v-model="initOption.showModal"
    :mask-closable="false">
    <p slot="header" style="color:#f60;text-align:center;">
      <Icon type="information-circled"></Icon>
      <span>{{initOption.title}}</span>
    </p>
    <Form
      ref="orgForm"
      :model="orgForm"
      :rules="formRules"
      :label-width="90">
      <Form-item prop="id" v-if="initOption.action === 'edit'">
        <input type="hidden" :model="orgForm.id">
      </Form-item>
      <Form-item label="组织名称" prop="name">
        <Input type="text" v-model="orgForm.name" placeholder="请输入组织名称"></Input>
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
  name: 'sysOrgFormDialog',
  props: {
    initOption: {
      title: {
        type: String,
        default: '新增组织'
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
          {required: true, message: '组织名称不能为空', trigger: 'blur'}
        ]
      },
      orgForm: {
        id: this.initOption.id,
        name: '',
        type: null,
        sid: null,
        mid: null,
        url: '',
        privilegess: '1',
        description: ''
      }
    }
  },
  methods: {
    getInfo () {
      this.$http.jsonp(sysApis.sys.org.get, {
        params: {
          id: this.initOption.id
        }
      }).then(response => {
        if (response.body.success) {
          this.orgForm = response.body.obj
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
      this.$refs.orgForm.validate((valid) => {
        if (valid) {
          let url
          if (this.initOption.action === 'add') {
            url = sysApis.sys.org.save
          } else if (this.initOption.action === 'edit') {
            url = sysApis.sys.org.update
          }
          this.$http.jsonp(url, {
            params: this.orgForm
          }).then(response => {
            if (response.body.success) {
              this.$Notice.success({
                title: '提示',
                desc: '新菜单保存成功！'
              })
              this.$parent.$children[0].query()
              this.$parent.orgFormInitOption.showModal = false
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
      this.$refs.orgForm.resetFields()
    }
  }
}
</script>
<style>
</style>
