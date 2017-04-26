<template>
  <Modal
    id="sysUserFormDialog"
    v-model="initOption.showModal"
    :mask-closable="false">
    <p slot="header" style="color:#f60;text-align:center;">
      <Icon type="information-circled"></Icon>
      <span>{{initOption.title}}</span>
    </p>
    <Form
      ref="userForm"
      :model="userForm"
      :rules="formRules"
      :label-width="90">
      <Form-item prop="id" v-if="initOption.action === 'edit'">
        <input type="hidden" :model="userForm.id">
      </Form-item>
      <Form-item label="用户名" prop="username">
        <Input type="text" v-model="userForm.username" placeholder="请输入用户名"></Input>
      </Form-item>
      <Form-item label="密码" prop="password" v-if="initOption.action === 'add'">
        <Input type="password" v-model="userForm.password" placeholder="请输入密码"></Input>
      </Form-item>
      <Form-item label="昵称" prop="name">
        <Input type="text" v-model="userForm.name" placeholder="请输入用户昵称"></Input>
      </Form-item>
      <Form-item label="Email" prop="email">
        <Input type="text" v-model="userForm.email" placeholder="请输入email"></Input>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit">保存</Button>
      <Button type="error" @click="reset" v-if="initOption.action === 'add'">重置</Button>
    </div>
  </Modal>
</template>
<script>
import sysApis from '../../../apis';

export default {
  name: 'sysUserFormDialog',
  props: {
    initOption: {
      title: {
        type: String,
        default: '新增用户'
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
        username: [
          {required: true, message: '用户名不能为空！', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空！', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '昵称不能为空！', trigger: 'blur'}
        ],
        email: [
          {type: 'email', message: '邮箱地址格式不正确！', trigger: 'blur'}
        ]
      },
      userForm: {
        id: this.initOption.id,
        username: '',
        password: '',
        name: '',
        email: ''
      }
    };
  },
  methods: {
    getInfo () {
      this.$http.jsonp(sysApis.sys.user.get, {
        params: {
          id: this.initOption.id
        }
      }).then(response => {
        if (response.body.success) {
          this.userForm = response.body.obj;
        } else {
          this.$Modal.error({
            title: '提示',
            content: response.body.msg
          });
        }
      }, response => {
        this.$Modal.error({
          title: '提示',
          content: '网络不通！'
        });
      });
    },
    handleSubmit () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          let url;
          if (this.initOption.action === 'add') {
            url = sysApis.sys.user.save;
          } else if (this.initOption.action === 'edit') {
            url = sysApis.sys.user.update;
          }
          this.$http.jsonp(url, {
            params: this.userForm
          }).then(response => {
            if (response.body.success) {
              this.$Notice.success({
                title: '提示',
                desc: '新用户保存成功！'
              });
              this.$parent.$children[0].query();
              this.$parent.userFormInitOption.showModal = false;
              this.reset();
            } else {
              this.$Notice.error({
                title: '提示',
                desc: response.body.msg
              });
            }
          }, response => {
            this.$Notice.error({
              title: '提示',
              desc: '网络异常，请稍后再试！'
            });
          });
        }
      });
    },
    reset () {
      this.$refs.userForm.resetFields();
    }
  }
};
</script>
<style>
</style>
