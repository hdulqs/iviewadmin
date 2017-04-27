<template>
  <Modal
    id="sysResFormDialog"
    v-model="initOption.showModal"
    :mask-closable="false"
    @on-cancel="reset">
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
          <SystemCombo v-model="resForm.sid"></SystemCombo>
        </Form-item>
        <Form-item label="所属模块" prop="mid">
          <ModuleCombo v-model="resForm.mid" :sid="resForm.sid"></ModuleCombo>
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
import SystemCombo from '@/components/SystemCombo';
import ModuleCombo from '@/components/ModuleCombo';
import sysApis from '../../../apis';

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
          {required: true, type: 'string', message: '资源名称不能为空', trigger: 'blur'}
        ],
        type: [
          {required: true, type: 'string', message: '请选择资源类型', trigger: 'change'}
        ],
        sid: [
          {required: true, type: 'string', message: '请选择所属系统', trigger: 'change'}
        ],
        mid: [
          {required: true, type: 'string', message: '请选择所属模块', trigger: 'change'}
        ],
        url: [
          {required: true, type: 'string', message: 'url必填', trigger: 'blur'}
        ]
      },
      resForm: {
        id: this.initOption.id,
        name: '',
        type: '0',
        sid: '',
        mid: '',
        url: '',
        privilegess: '1',
        description: ''
      },
      resourceTypes: [{
        id: '0',
        name: '功能资源'
      }, {
        id: '1',
        name: '菜单资源'
      }],
      loading: false
    };
  },
  methods: {
    getInfo () {
      this.loading = true;
      this.$http.jsonp(sysApis.sys.resource.get, {
        params: {
          id: this.initOption.id
        }
      }).then(response => {
        if (response.body.success) {
          this.resForm = response.body.obj;
        } else {
          this.$Modal.error({
            title: '提示',
            content: response.body.msg
          });
        }
        this.loading = false;
      }, response => {
        this.$Modal.error({
          title: '提示',
          content: '网络不通！'
        });
        this.loading = false;
      });
    },
    handleSubmit () {
      this.$refs.resForm.validate((valid) => {
        if (valid) {
          let url;
          if (this.initOption.action === 'add') {
            url = sysApis.sys.resource.save;
          } else if (this.initOption.action === 'edit') {
            url = sysApis.sys.resource.update;
          }
          this.$http.jsonp(url, {
            params: this.resForm
          }).then(response => {
            if (response.body.success) {
              this.$Notice.success({
                title: '提示',
                desc: response.body.msg
              });
              this.$parent.$children[0].query();
              this.$parent.resFormInitOption.showModal = false;
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
      this.$refs.resForm.resetFields();
    }
  },
  components: {
    SystemCombo,
    ModuleCombo
  }
};
</script>
<style>
</style>
