<template>
  <Modal
    id="sysGroupFormDialog"
    v-model="initOption.showModal"
    :mask-closable="false">
    <p slot="header" style="color:#f60;text-align:center;">
      <Icon type="information-circled"></Icon>
      <span>{{initOption.title}}</span>
    </p>
    <Form
      ref="groupForm"
      :model="groupForm"
      :rules="formRules"
      :label-width="80">
      <Form-item prop="id" v-if="initOption.action === 'edit'">
        <input type="hidden" :model="groupForm.id">
      </Form-item>
      <Form-item label="分组名称" prop="name">
        <Input type="text" v-model="groupForm.name" placeholder="请输入分组名称"></Input>
      </Form-item>
      <Form-item label="描述" prop="description">
        <Input
          type="textarea"
          v-model="groupForm.description"
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
import sysApis from '../../../apis';

export default {
  name: 'sysGroupFormDialog',
  props: {
    initOption: {
      title: {
        type: String,
        default: '新增分组'
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
          {required: true, message: '分组名称不能为空', trigger: 'blur'}
        ]
      },
      groupForm: {
        id: this.initOption.id,
        name: '',
        description: ''
      }
    };
  },
  methods: {
    getInfo () {
      this.$http.jsonp(sysApis.sys.group.get, {
        params: {
          id: this.initOption.id
        }
      }).then(response => {
        if (response.body.success) {
          this.groupForm = response.body.obj;
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
      this.$refs.groupForm.validate((valid) => {
        if (valid) {
          let url;
          if (this.initOption.action === 'add') {
            url = sysApis.sys.group.save;
          } else if (this.initOption.action === 'edit') {
            url = sysApis.sys.group.update;
          }
          this.$http.jsonp(url, {
            params: this.groupForm
          }).then(response => {
            if (response.body.success) {
              this.$Notice.success({
                title: '提示',
                desc: '新分组保存成功！'
              });
              this.$parent.$children[0].query();
              this.$parent.groupFormInitOption.showModal = false;
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
      this.$refs.groupForm.resetFields();
    }
  }
};
</script>
<style>
</style>
